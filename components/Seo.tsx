import Head from "next/head";
import { SITE } from "@/lib/site";

type Props = {
  title?: string;       // page name; the site name is appended
  description?: string;
  path?: string;        // canonical path, e.g. "/about"
  image?: string;       // path inside /public
};

export default function Seo({ title, description = SITE.description, path, image }: Props) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title;
  const url = path !== undefined ? SITE.url + (path === "/" ? "" : path) : undefined;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta key="description" name="description" content={description} />
      {url && <link key="canonical" rel="canonical" href={url} />}
      {url && <meta key="og:url" property="og:url" content={url} />}
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={SITE.name} />
      <meta key="og:locale" property="og:locale" content="en_US" />
      {image && <meta key="og:image" property="og:image" content={SITE.url + image} />}
      <meta key="twitter:card" name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta key="twitter:creator" name="twitter:creator" content="@Vuek0" />
    </Head>
  );
}
