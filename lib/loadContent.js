// lib/loadContent.js
import { headers } from "next/headers";

export async function loadContent(slug = "landing", { revalidate = 60 } = {}) {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("host") ?? "localhost:3000";
  const url = `${proto}://${host}/content/${slug}.json`;

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) throw new Error(`Failed to load JSON: ${url} (${res.status})`);
  return res.json();
}
