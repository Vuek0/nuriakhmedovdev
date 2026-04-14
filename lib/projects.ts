export type Category = "Web" | "Desktop" | "Mobile";

export interface Project {
  slug:         string;
  num:          string;
  title:        string;
  shortDesc:    string;
  description:  string;
  category:     Category;
  tags:         string[];
  year:         string;
  github?:      string;
  live?:        string;
  highlights:   string[];
  gradient:     string;
  note?:        string; // e.g. "Backend + Desktop + Mobile"
  logo?:        string;
  images?:      string[];
}

export const PROJECTS: Project[] = [
  {
    slug:      "ordr-uz",
    num:       "001",
    title:     "ordr.uz",
    shortDesc: "QR-menu platform for restaurants — real-time orders, admin panel, multi-tenant.",
    description:
      "ordr.uz is a multi-tenant QR-code digital menu and ordering platform for restaurants. Each restaurant gets its own slug-based URL, a customer-facing menu, and a full admin panel. Customers scan a QR code on their table, browse the menu, configure option groups (size, extras, etc.), and place orders that appear in real time in the kitchen. The platform supports three languages — Russian, Uzbek, and English.",
    category: "Web",
    tags:     ["Vue 3", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Socket.io", "Docker", "Nginx"],
    year:     "2024",
    live:     "https://ordr.uz",
    highlights: [
      "Multi-tenant architecture — each restaurant has its own URL and admin panel",
      "Real-time order updates via Socket.io WebSocket gateway",
      "QR-code table system with unique UUID per table",
      "Full order lifecycle: New → Cooking → Ready → Served → Paid/Cancelled",
      "Multilingual: Russian, Uzbek, English — all content stored in 3 language columns",
      "JWT auth with rate-limited login and cookie-based token storage",
    ],
    gradient: "linear-gradient(135deg, #1a0a00 0%, #5c1a00 40%, #c0392b 100%)",
    logo:     "/ordr/ordr_sideicon.png",
    images: [
      "/ordr/ordr_main.png",
      "/ordr/client_menu.png",
      "/ordr/client_order_new.png",
      "/ordr/client_order_status_changed.png",
      "/ordr/admin_orders.png",
      "/ordr/admin_dishes.png",
      "/ordr/admin_dish-categories.png",
      "/ordr/admin_tables.png",
    ],
  },
  {
    slug:      "yolreftrans-logistics",
    num:       "002",
    title:     "Yo'lreftrans Logistics",
    shortDesc: "Railway wagon management system — backend, desktop and mobile apps.",
    description:
      "A comprehensive logistics platform for Yo'lreftrans, an Uzbek railway operator. The system tracks freight wagons, rental companies, current locations, and return deadlines. It was built as a NestJS backend, a Tauri/React desktop app for managers, and a React Native/Expo mobile app for field workers.",
    category: "Desktop",
    note:     "Backend · Desktop · Mobile",
    tags:     ["NestJS", "PostgreSQL", "Prisma", "Tauri 2", "Rust", "React", "React Native", "Expo", "TanStack Query", "Docker"],
    year:     "2025",
    highlights: [
      "Wagon urgency tracking: Normal / Warning (<30 days) / Critical (<10 days)",
      "Tauri 2 desktop app with encrypted JWT storage (Rust plugin-store)",
      "React Native + Expo mobile app with secure-store auth",
      "Excel export with color-coded urgency rows (desktop & mobile)",
      "Role-based access: Super Admin / Manager / Worker",
    ],
    gradient: "linear-gradient(135deg, #0a0e1a 0%, #1a2744 50%, #243b6e 100%)",
    images: [
      "/yolreftrans/yolreftrans_main.png",
      "/yolreftrans/yolreftrans_wagon_detail.png",
      "/yolreftrans/yolreftrans_wagon_create.png",
      "/yolreftrans/yolreftrans_users.png",
    ],
  },
  {
    slug:      "convertify-uz",
    num:       "003",
    title:     "Convertify",
    shortDesc: "Open-source privacy-first file converter — images, PDFs, and DOCX.",
    description:
      "Convertify is an open-source, privacy-focused file conversion platform. Files are processed ephemerally on Vercel serverless functions — nothing is ever stored. The frontend is a clean multilingual interface (Russian, English, Uzbek) with drag-and-drop uploads, dark/light theme, and animated feedback. The Python/Flask backend handles all conversion logic using battle-tested libraries.",
    category: "Web",
    tags:     ["Python", "Flask", "Pillow", "PyMuPDF", "Vercel", "HTML", "CSS", "JavaScript"],
    year:     "2024",
    github:   "https://github.com/Vuek0/Convertify",
    live:     "https://convertify.uz",
    highlights: [
      "Supports PNG, JPG, PDF, DOCX, WebP, ICO, TIFF conversions",
      "Zero data retention — files deleted immediately after conversion",
      "Serverless deployment on Vercel (ephemeral processing)",
      "Drag-and-drop upload with 16 MB limit and file validation",
      "Dark / light theme toggle",
      "Multilingual: Russian, English, Uzbek",
      "Cyrillic filename encoding support",
      "Fully open-source on GitHub",
    ],
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    images: [
      "/convertify/convertify_main.png",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
