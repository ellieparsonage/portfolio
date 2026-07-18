import "./keystatic-theme.css";
import KeystaticApp from "./keystatic";
import { KeystaticTooltips } from "./KeystaticTooltips";
import { KeystaticGalleryThumbs } from "./KeystaticGalleryThumbs";

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "9px 14px",
  background: "#0000ff",
  color: "#fff",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  textDecoration: "none",
  boxShadow: "0 6px 20px rgba(0,0,255,0.3)",
};

export default function KeystaticLayout() {
  return (
    <>
      <KeystaticApp />
      <KeystaticTooltips />
      <KeystaticGalleryThumbs />
      <div
        style={{
          position: "fixed",
          right: "16px",
          bottom: "16px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        <a href="/" style={pillStyle}>
          ← Back to website
        </a>
        <a href="/help" target="_blank" rel="noopener noreferrer" style={pillStyle}>
          📖 Guides
        </a>
      </div>
    </>
  );
}
