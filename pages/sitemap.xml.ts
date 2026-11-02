import type { GetServerSideProps } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

const PAGES = [
  { path: "", priority: "1.0" },
  { path: "/projects", priority: "0.8" },
  { path: "/about", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  ...PROJECTS.map((p) => ({ path: `/projects/${p.slug}`, priority: "0.7" })),
];

// /sitemap.xml, generated from the project list on every request
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastmod = new Date().toISOString();
  const urls = PAGES.map(
    (p) =>
      `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${p.priority}</priority></url>`
  ).join("\n");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
