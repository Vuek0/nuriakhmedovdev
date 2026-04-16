import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Muhammad Nuriakhmedov — Full-Stack Developer",
    template: "%s | Muhammad Nuriakhmedov",
  },
  description:
    "Full-Stack Developer specializing in cross-platform development. Building web apps, desktop and mobile applications. Available for freelance projects.",
  keywords: [
    "Muhammad Nuriakhmedov",
    "Nuriakhmedov",
    "Full-Stack Developer",
    "Web Developer",
    "Mobile Developer",
    "Desktop Developer",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "React Native",
    "Tauri",
    "Freelance Developer",
    "Portfolio",
    "Uzbekistan",
    "nuriakhmedov.dev",
  ],
  authors: [{ name: "Muhammad Nuriakhmedov", url: "https://nuriakhmedov.dev" }],
  creator: "Muhammad Nuriakhmedov",
  metadataBase: new URL("https://nuriakhmedov.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammad Nuriakhmedov — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in cross-platform development. Building web, desktop, and mobile applications.",
    url: "https://nuriakhmedov.dev",
    siteName: "Muhammad Nuriakhmedov",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Nuriakhmedov — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in cross-platform development. Building web, desktop, and mobile applications.",
    creator: "@Vuek0",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Nuriakhmedov",
  url: "https://nuriakhmedov.dev",
  jobTitle: "Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in cross-platform development — web, desktop, and mobile applications.",
  email: "vueko.eruko@gmail.com",
  sameAs: [
    "https://github.com/Vuek0",
    "https://www.linkedin.com/in/muhammad-nuriakhmedov-0464b3301/",
    "https://t.me/Vuek0",
  ],
  knowsAbout: [
    "JavaScript", "TypeScript", "React", "Next.js", "Vue",
    "Node.js", "NestJS", "Python", "React Native", "Tauri",
    "PostgreSQL", "MongoDB", "Docker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
