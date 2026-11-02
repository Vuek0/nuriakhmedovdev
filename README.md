# nuriakhmedov.dev

My personal portfolio — who I am, what I build, and the projects I've shipped.

**Live:** [nuriakhmedov.dev](https://nuriakhmedov.dev)

---

## About

I'm Muhammad. I build logistics and operations software for CIS businesses through [AlmaCode](https://almacode.uz), my development studio in Tashkent — web, desktop and mobile on one shared system.

## Built With

- **Next.js 16** — Pages Router (the page transitions need it: App Router can't keep the old page mounted)
- **TypeScript**
- **Framer Motion** — page transitions, menu, lightbox
- **Lenis** — smooth scroll, paused during transitions
- **Plain CSS** — design tokens in `styles/globals.css`
- **Resend** — contact form email delivery (`RESEND_API_KEY`)
- **Vercel** — deployment and hosting

The layout and transitions follow the same system as my `magistral` project: a full-width wordmark, an Inter Tight type scale, a menu pill, and pages that slide up over the previous one.

## Where things are

- `lib/projects.ts` — project data; the first image of each project is its cover
- `lib/site.ts` — contacts, navigation, socials
- `components/PageTransition.tsx`, `pages/_app.tsx`, `lib/transition.ts` — the transition
- `pages/sitemap.xml.ts`, `public/robots.txt`, `components/Seo.tsx` — SEO

```bash
npm install
npm run dev   # http://localhost:3001
```

## Contact

- **Email:** vueko.eruko@gmail.com
- **Telegram:** [@vuek0](https://t.me/vuek0)
- **LinkedIn:** [muhammad-nuriakhmedov](https://www.linkedin.com/in/muhammad-nuriakhmedov-0464b3301/)
- **GitHub:** [Vuek0](https://github.com/Vuek0)
