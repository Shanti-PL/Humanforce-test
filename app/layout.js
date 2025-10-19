import "./globals.css";
export const runtime = "edge";

import { loadContent } from "@/lib/loadContent";

export default async function RootLayout({ children }) {
  const { meta = {} } = await loadContent("landing");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title || "",
    description: meta.description || "",
    publisher: { "@type": "Organization", name: "Humanforce" },
  };

  return (
    <html lang="en">
      <head>
        <title>{meta.title || "Landing"}</title>
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
