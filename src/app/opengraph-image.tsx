import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — luxury home interiors in Bengaluru`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card: brand typography over a delivered living room. */
export default async function OgImage() {
  const photo = await readFile(join(process.cwd(), "src/assets/og-background.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#1d1815" }}>
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(18,14,12,0.92) 0%, rgba(18,14,12,0.6) 55%, rgba(18,14,12,0.2) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#f7f4ef", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#c2a06b" }}>Home Karigar · Bengaluru</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, lineHeight: 1.05, fontFamily: "serif", maxWidth: 760 }}>Homes crafted with intent. Delivered as promised.</div>
            <div style={{ marginTop: 28, fontSize: 26, color: "#b9b0a6" }}>400+ homes delivered · No advance until 3D designs are approved</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
