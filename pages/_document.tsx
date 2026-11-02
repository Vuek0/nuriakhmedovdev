import { Html, Head, Main, NextScript } from "next/document";
import { SITE, SOCIALS } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: "Full-Stack Developer",
  description: SITE.description,
  email: SITE.email,
  worksFor: { "@type": "Organization", name: SITE.studio.name, url: SITE.studio.href },
  address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" },
  sameAs: SOCIALS.map((s) => s.href),
  knowsAbout: [
    "Logistics software", "Operations software", "JavaScript", "TypeScript", "React", "Next.js",
    "Vue", "Node.js", "NestJS", "Python", "React Native", "Tauri", "PostgreSQL", "MongoDB", "Docker",
  ],
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Inter Tight: free stand-in for Suisse Int'l, same as magistral */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#f2ede4" />
        <meta name="author" content={SITE.name} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
