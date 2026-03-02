# Registrační systém pro veletrh

## O projektu

Webová aplikace pro sbírání registrací na veletrh. Obsahuje veřejný registrační formulář, odesílání potvrzovacích e-mailů a administrátorský panel s přehledem registrací, grafem podle zemí a exportem do Excelu.

## Technologie

- **Next.js 15** (TypeScript, App Router) — framework
- **Vercel** — hosting (zdarma)
- **Neon PostgreSQL** — databáze (zdarma přes Vercel)
- **Prisma 6** — ORM
- **Resend** — e-maily (zdarma, 100/den)
- **exceljs** — Excel export (v `serverExternalPackages` v next.config.ts)
- **recharts** — koláčový graf
- **zod** — validace (sdílená klient + server)
- **iron-session 8** — admin autentizace (cookie session)
- **Tailwind CSS 3** — styling (v4 nefunguje kvůli native bindings na Windows)

## Principy

- Vše zdarma (hosting, DB, e-maily)
- Maximální jednoduchost — vždy nejjednodušší řešení
- Postupné commity s popisnými zprávami
- Jazyk UI: čeština

## Důležité poznatky

- **Tailwind v4 nefunguje** na tomto systému — `@tailwindcss/oxide` a `lightningcss` mají problémy s native bindings. Používáme v3.
- **Resend klient** se musí inicializovat lazy (uvnitř funkce, ne na top-level), jinak build padá na chybějící `RESEND_API_KEY`.
- **exceljs** musí být v `serverExternalPackages` v `next.config.ts`.
- **`create-next-app`** nefunguje interaktivně v tomto prostředí — projekt byl založen manuálně.
- E-mail po registraci je fire-and-forget — selhání neblokuje odpověď.
- E-mail musí být unikátní (409 při duplikátu).

## Env proměnné

- `DATABASE_URL` — Neon PostgreSQL connection string (automaticky z Vercel Storage)
- `RESEND_API_KEY` — API klíč z resend.com (**aktuálně placeholder, nutno vyměnit**)
- `ADMIN_PASSWORD` — heslo pro admin panel (`veletrh2026admin`)
- `SESSION_SECRET` — tajný klíč pro iron-session (min 32 znaků)

## Struktura

```
app/
  layout.tsx              ← Kořenový layout (metadata, fonty, globals.css)
  page.tsx                ← Veřejná stránka s registračním formulářem
  globals.css             ← Tailwind direktivy (@tailwind base/components/utilities)
  login/page.tsx          ← Přihlášení admina (heslo)
  admin/
    layout.tsx            ← Server component — kontrola session, redirect na /login
    page.tsx              ← Client component — dashboard (počet, graf, tabulka, export)
  api/
    register/route.ts     ← POST: validace → uložení → e-mail (fire-and-forget)
    admin/
      login/route.ts      ← POST: ověření hesla, vytvoření iron-session
      logout/route.ts     ← POST: zničení session
      registrations/route.ts ← GET: registrace + countryStats (auth required)
      export/route.ts     ← GET: .xlsx download (auth required)
components/
  RegistrationForm.tsx    ← Client component, Zod validace, dropdown země (CZ/SK/jiná)
  CountryChart.tsx        ← Recharts PieChart
  RegistrationTable.tsx   ← Tabulka registrací
  LogoutButton.tsx        ← Odhlášení
lib/
  db.ts                   ← Prisma singleton (globalThis pattern)
  email.ts                ← Resend — lazy init, fire-and-forget
  auth.ts                 ← iron-session config, getSession(), isAuthenticated()
  validations.ts          ← Zod schema (firstName, lastName, email, country)
prisma/
  schema.prisma           ← Model Registration (id, firstName, lastName, email, country, createdAt)
```

## Deploy na Vercel

1. Push na GitHub, import do Vercel
2. Přidat Neon DB (Vercel Storage tab — automaticky nastaví `DATABASE_URL`)
3. Nastavit zbylé env: `RESEND_API_KEY`, `ADMIN_PASSWORD`, `SESSION_SECRET`
4. Deploy — `prisma db push` běží automaticky jako součást build scriptu
