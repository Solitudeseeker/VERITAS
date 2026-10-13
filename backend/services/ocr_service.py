"""Screenshot -> text using Pillow + Tesseract."""
import io
import os
import re
import shutil

from PIL import Image, ImageOps, UnidentifiedImageError

from ..config import settings

ALLOWED_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp"}


class OCRError(Exception):
    """Raised with a user-friendly message; the UI offers manual text entry."""


def _clean(text: str) -> str:
    lines = []
    for line in text.splitlines():
        line = re.sub(r"[ \t]+", " ", line).strip()
        if sum(c.isalnum() for c in line) >= 2:  # drop pure-noise lines
            lines.append(line)
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def _configure_tesseract(pytesseract) -> None:
    """Point pytesseract at tesseract.exe when it is installed but not on PATH (common on Windows)."""
    cmd = settings.TESSERACT_CMD
    if not cmd and not shutil.which("tesseract"):
        for candidate in (r"C:\Program Files\Tesseract-OCR\tesseract.exe",
                          r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
                          os.path.expandvars(r"%LOCALAPPDATA%\Programs\Tesseract-OCR\tesseract.exe")):
            if os.path.isfile(candidate):
                cmd = candidate
                break
    if cmd:
        pytesseract.pytesseract.tesseract_cmd = cmd


def extract_text(data: bytes) -> str:
    if len(data) > settings.MAX_UPLOAD_MB * 1024 * 1024:
        raise OCRError(f"Image is larger than {settings.MAX_UPLOAD_MB} MB. Upload a smaller screenshot.")
    try:
        img = Image.open(io.BytesIO(data))
        img.load()
    except (UnidentifiedImageError, OSError):
        raise OCRError("That file could not be read as an image. Upload a PNG, JPG or WebP screenshot.")

    img = ImageOps.exif_transpose(img).convert("L")
    if img.width < 1000:  # small screenshots OCR better when enlarged
        scale = 1000 / img.width
        img = img.resize((1000, int(img.height * scale)), Image.LANCZOS)
    img = ImageOps.autocontrast(img)

    try:
        import pytesseract

        _configure_tesseract(pytesseract)
        raw = pytesseract.image_to_string(img, lang=settings.OCR_LANG)
    except ImportError:
        raise OCRError("pytesseract is not installed on the server.")
    except Exception as exc:  # TesseractNotFoundError and language-data errors
        if "NotFound" in type(exc).__name__:
            raise OCRError("Tesseract OCR was not found on the server. Install it and restart the backend "
                           "(or set TESSERACT_CMD in .env). Meanwhile, paste the message text instead.")
        if "language" in str(exc).lower() or "traineddata" in str(exc).lower():
            raise OCRError(f"Tesseract has no '{settings.OCR_LANG}' language data. Reinstall it with that language "
                           "or change OCR_LANG in .env. Meanwhile, paste the message text instead.")
        raise OCRError("Text extraction failed. Paste the message text instead.")

    text = _clean(raw)
    if len(text) < 10:
        raise OCRError("No readable text was found in that image. Try a sharper screenshot or paste the text.")
    return text[: settings.MAX_TEXT_CHARS]
