"use client";

/** Last-resort boundary when the root layout itself fails. Must render its own <html>. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#ffffff", color: "#1f1a17", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ maxWidth: 480, padding: 24, textAlign: "center" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 36, margin: 0 }}>Something went wrong</h1>
          <p style={{ color: "#6b625a", lineHeight: 1.6 }}>Please try again. If the problem continues, call us on +91 86605 22278.</p>
          <button onClick={reset} style={{ marginTop: 16, height: 44, padding: "0 20px", borderRadius: 999, border: 0, background: "#6e5038", color: "#ffffff", cursor: "pointer" }}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
