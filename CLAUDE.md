# Registrační systém pro veletrh

## O projektu

Webová aplikace pro sbírání registrací na veletrh. Obsahuje veřejný registrační formulář, odesílání potvrzovacích e-mailů a administrátorský panel s přehledem registrací, grafem podle zemí a exportem do Excelu.

## Technologie

- **Next.js** (TypeScript) — framework
- **Vercel** — hosting (zdarma)
- **Neon PostgreSQL** — databáze (zdarma přes Vercel)
- **Prisma** — ORM
- **Resend** — e-maily (zdarma)
- **exceljs** — Excel export
- **recharts** — grafy
- **zod** — validace
- **iron-session** — admin autentizace
- **Tailwind CSS** — styling

## Principy

- Vše zdarma (hosting, DB, e-maily)
- Maximální jednoduchost — vždy nejjednodušší řešení
- Postupné commity s popisnými zprávami

## Env proměnné

- `DATABASE_URL` — Neon PostgreSQL connection string
- `RESEND_API_KEY` — API klíč z resend.com
- `ADMIN_PASSWORD` — heslo pro admin panel
- `SESSION_SECRET` — tajný klíč pro iron-session (min 32 znaků)

## Struktura

- `app/page.tsx` — veřejný registrační formulář
- `app/login/page.tsx` — přihlášení admina
- `app/admin/page.tsx` — admin dashboard
- `app/api/` — API routes (register, admin login/logout, registrations, export)
- `components/` — React komponenty
- `lib/` — sdílený kód (db, email, auth, validace)
- `prisma/` — databázové schéma
