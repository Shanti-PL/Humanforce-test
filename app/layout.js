import "./globals.css";
export const runtime = "edge";

import { loadContent } from "@/lib/loadContent";

export default async function RootLayout({ children }) {
  const { meta = {} } = await loadContent("landing");
  const general = await loadContent("general");

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
        item: general.brand.pageUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Workforce Management",
        item: general.brand.pageUrl,
      },
    ],
  };

  const jsonLdList = [jsonLdWebPage, jsonLdBreadcrumb];

  const canonicalUrl = general.brand.pageUrl;

  return (
    <html lang="en">
      <head>
        <title>{meta.title || "Landing"}</title>
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        <link rel="canonical" href={canonicalUrl} />
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
