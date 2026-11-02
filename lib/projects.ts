export type Category = "Web" | "Desktop" | "Mobile";

export interface Project {
  slug:        string;
  num:         string;
  title:       string;
  shortDesc:   string;
  description: string;
  category:    Category;
  tags:        string[];
  github?:     string;
  live?:       string;
  status?:     string; // e.g. "Live"
  highlights:  string[]; // what the business gets, not how it's built
  note?:       string; // e.g. "Backend · Desktop · Mobile"
  metrics?:    { value: string; label: string }[];
  images:      string[]; // the first one is the cover
}

export const PROJECTS: Project[] = [
  {
    slug:      "yolreftrans-logistics",
    num:       "001",
    title:     "Yo'lreftrans Logistics",
    shortDesc: "Wagon-management platform for railway freight across Uzbekistan and Kazakhstan.",
    description:
      "A wagon-management platform for railway freight across Uzbekistan and Kazakhstan. It replaces fragmented Excel sheets and manual industry-system lookups with a single auditable system shared by the logistics, finance and technical departments. Logistics tracks every wagon and its return deadline, finance sees revenue by firm and by wagon, and managers get analytics — on desktop in the office and on mobile in the field.",
    category: "Desktop",
    note:     "Backend · Desktop · Mobile",
    status:   "Live",
    tags:     ["NestJS", "PostgreSQL", "Prisma", "Tauri 2", "Rust", "React", "React Native", "Expo", "TanStack Query", "Docker"],
    metrics: [
      { value: "1,425", label: "wagons" },
      { value: "50",    label: "employees" },
      { value: "5+",    label: "partner carriers" },
    ],
    highlights: [
      "Every return deadline (MGSP) in one table, colour-coded: green with 30+ days left, yellow at 10–30, red under 10 — overdue wagons stop slipping through",
      "Location, waybill, route and dispatch date for every wagon in one row — “where is wagon X right now” takes seconds instead of manual lookups",
      "Wagons split by status — rental, technical run, local, depot, idle, return — so each team opens exactly the list it works with",
      "Analytics at a glance: wagons per status, how many are critical, where they are right now and which firms hold them",
      "Monthly finance report by firm and by wagon, trips still missing a rate, totals in tenge at the National Bank rate — downloadable as Excel",
      "Permissions per employee down to individual fields: who can add or delete wagons, change dates or locations, export data, or only view",
      "Import wagons from Excel and export any filtered list back to Excel",
      "Desktop app for the office and mobile app for field staff, working from the same data",
    ],
    images: [
      "/yolreftrans/yolreftrans_wagons.png",
      "/yolreftrans/yolreftrans_analytics.png",
      "/yolreftrans/yolreftrans_finance_analytics.png",
      "/yolreftrans/yolreftrans_finance.png",
      "/yolreftrans/yolreftrans_users.png",
    ],
  },
  {
    slug:      "ordr-uz",
    num:       "002",
    title:     "ordr.uz",
    shortDesc: "QR menu and ordering for restaurants — guests order from the table, the kitchen sees it instantly.",
    description:
      "ordr.uz is a QR-code menu and ordering platform for restaurants. Each restaurant gets its own link, a customer-facing menu and a full admin panel. Guests scan the QR code on their table, browse the menu, choose options like size and extras, and place orders that appear in the kitchen in real time. The menu works in Russian, Uzbek and English.",
    category: "Web",
    tags:     ["Vue 3", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Socket.io", "Docker", "Nginx"],
    live:     "https://ordr.uz",
    highlights: [
      "Guests order straight from their phone by scanning the table’s QR code — no app to install, no waiting for a waiter",
      "Orders reach the kitchen the moment they’re placed, and guests see when theirs is cooking, ready or served",
      "Each table has its own QR code, so staff always know where an order goes",
      "Menu in Russian, Uzbek and English — tourists order as easily as locals",
      "Staff manage dishes, categories, options and tables themselves from the admin panel",
      "Every order tracked from placement to payment or cancellation",
      "One platform for many venues: each restaurant gets its own link and admin panel",
    ],
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
    slug:      "convertify-uz",
    num:       "003",
    title:     "Convertify",
    shortDesc: "Open-source privacy-first file converter — images, PDFs, and DOCX.",
    description:
      "Convertify is an open-source, privacy-focused file conversion platform. Files are processed ephemerally on Vercel serverless functions — nothing is ever stored. The frontend is a clean multilingual interface (Russian, English, Uzbek) with drag-and-drop uploads, dark/light theme, and animated feedback. The Python/Flask backend handles all conversion logic using battle-tested libraries.",
    category: "Web",
    tags:     ["Python", "Flask", "Pillow", "PyMuPDF", "Vercel", "HTML", "CSS", "JavaScript"],
    github:   "https://github.com/Vuek0/Convertify",
    live:     "https://convertify.uz",
    highlights: [
      "Converts PNG, JPG, WebP, TIFF, ICO, PDF and DOCX online — nothing to install",
      "Free and without sign-up",
      "Files are deleted immediately after conversion, so private documents never stay on a server",
      "Drag and drop a file up to 16 MB and get the result in seconds",
      "Interface in Russian, English and Uzbek; Cyrillic file names come through intact",
      "Open source — anyone can check exactly what happens to their files",
    ],
    images: [
      "/convertify/convertify_main.png",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

export const projectType = (p: Project) => p.note ?? p.category;
