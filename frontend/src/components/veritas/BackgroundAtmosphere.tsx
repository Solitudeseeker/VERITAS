import intelligenceField from "@/assets/intelligence-field.jpg";
import evidenceArchive from "@/assets/evidence-archive.jpg";

export function BackgroundAtmosphere({ variant = "ambient" }: { variant?: "ambient" | "hero" | "archive" }) {
  return (
    <div className={`atmosphere atmosphere-${variant}`} aria-hidden="true">
      <img src={variant === "archive" ? evidenceArchive : intelligenceField} alt="" width={1920} height={1088} loading={variant === "hero" ? "eager" : "lazy"} className="atmosphere-image" />
      <div className="atmosphere-shade" />
      <div className="atmosphere-scan" />
      <div className="atmosphere-traces"><i /><i /><i /></div>
    </div>
  );
}