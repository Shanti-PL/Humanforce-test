import "./globals.css";
export const runtime = "edge";

import { loadContent } from "@/lib/loadContent";

export default async function RootLayout({ children }) {
  const { meta = {} } = await loadContent("landing");

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title || "",
    description: meta.description || "",
    publisher: { "@type": "Organization", name: "Humanforce" },
    url: "https://humanforce-test.vercel.app/",
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://humanforce-test.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Workforce Management",
        item: "https://humanforce-test.vercel.app/",
      },
    ],
  };

  const jsonLdList = [jsonLdWebPage, jsonLdBreadcrumb];

  return (
    <html lang="en">
      <head>
        <title>{meta.title || "Landing"}</title>
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        {jsonLdList.map((obj, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
