"""Fetch a public URL and reduce it to readable text."""
import ipaddress
import socket
from html.parser import HTMLParser
from urllib.parse import urlparse
from urllib.request import HTTPRedirectHandler, Request, build_opener

from ..config import settings


class FetchError(Exception):
    pass


class _TextExtractor(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "nav", "footer", "header", "form"}

    def __init__(self):
        super().__init__()
        self.parts: list[str] = []
        self.title = ""
        self._skip = 0
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self._skip += 1
        if tag == "title":
            self._in_title = True

    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip:
            self._skip -= 1
        if tag == "title":
            self._in_title = False
        if tag in {"p", "div", "br", "li", "h1", "h2", "h3", "tr"}:
            self.parts.append("\n")

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        elif not self._skip and data.strip():
            self.parts.append(data.strip() + " ")


def _check_public_host(url: str) -> None:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise FetchError("Enter a full http(s) link, for example https://example.com/notice.")
    try:
        infos = socket.getaddrinfo(parsed.hostname, None)
    except socket.gaierror:
        raise FetchError("That address could not be found. Check the link and try again.")
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if (ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved
                or ip.is_multicast or ip.is_unspecified):
            raise FetchError("Only public web pages can be checked.")


class _SafeRedirect(HTTPRedirectHandler):
    """Re-check every redirect hop so a public URL cannot bounce to a private address."""
    max_redirections = 5

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        _check_public_host(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


_opener = build_opener(_SafeRedirect)


def fetch_page(url: str, max_chars: int | None = None, timeout: int = 10) -> tuple[str, str, str]:
    """Fetch a public page -> (text, final_url_after_redirects, page_title)."""
    _check_public_host(url)
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 (VERITAS verifier)"})
    try:
        with _opener.open(req, timeout=timeout) as resp:
            ctype = resp.headers.get("Content-Type", "")
            if "html" not in ctype and "text" not in ctype:
                raise FetchError("That link is not a web page. Upload a screenshot or paste the text instead.")
            raw = resp.read(1_500_000)
            charset = resp.headers.get_content_charset() or "utf-8"
            final_url = resp.geturl() or url
    except FetchError:
        raise
    except Exception:
        raise FetchError("The page could not be opened. Paste its text instead.")

    try:
        "".encode(charset)  # unknown charset names raise LookupError
    except LookupError:
        charset = "utf-8"
    parser = _TextExtractor()
    parser.feed(raw.decode(charset, errors="replace"))
    body = "".join(parser.parts)
    title = " ".join(parser.title.split())
    text = (title + "\n" + body).strip() if title else body.strip()
    text = "\n".join(line.strip() for line in text.splitlines() if line.strip())
    if len(text) < 30:
        raise FetchError("Not enough readable text on that page. Paste the text instead.")
    return text[: max_chars or settings.MAX_TEXT_CHARS], final_url, title


def fetch_page_text(url: str, max_chars: int | None = None, timeout: int = 10) -> str:
    return fetch_page(url, max_chars, timeout)[0]
