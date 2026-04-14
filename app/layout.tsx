import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Nuriakhmedov — Developer",
  description:
    "Full-stack developer specializing in web, desktop, and mobile applications. Building high-quality digital products.",
  keywords: ["developer", "web", "mobile", "desktop", "portfolio", "Muhammad Nuriakhmedov"],
  openGraph: {
    title: "Muhammad Nuriakhmedov — Developer",
    description:
      "Full-stack developer specializing in web, desktop, and mobile applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
