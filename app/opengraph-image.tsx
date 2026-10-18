import { ImageResponse } from "next/og";

export const alt = "China79 Initiative — Better Data. Better Dialogue.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 72px", background: "#17324d", color: "#fff", borderTop: "14px solid #cf1422" }}>
      <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>CHINA79 INITIATIVE</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 700, lineHeight: 1.08, letterSpacing: -3 }}>
        <span>Better Data.</span>
        <span style={{ color: "#ffb9bc" }}>Better Dialogue.</span>
      </div>
      <div style={{ display: "flex", fontSize: 29, lineHeight: 1.35, maxWidth: 900 }}>Independent data and analysis on U.S.–China relations.</div>
    </div>,
    size,
  );
}
