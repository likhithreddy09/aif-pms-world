# PMS AIF World — Asset Manager Publishing Platform

Demo / proof of concept for Tuesday: an admin dashboard publishes asset-manager information to a modern public website.

## Run locally

```bash
cd pms-aif-world
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is already in use, Next.js will print another local URL (for example `http://localhost:3003`).

### Admin login

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@pmsaifworld.com`
- Password: `DemoAdmin@2026`

## Demo script

1. Open the public homepage and show featured managers.
2. Sign in to `/admin/login`.
3. Open **All Managers**, then **Add Manager**.
4. Upload a logo, complete the form, click **Publish**.
5. Refresh `/asset-managers` — the new manager appears.
6. Open the profile, return to Admin, edit a field, save, refresh the public profile.

All seeded names, SEBI numbers and returns are fictional.

## Stack

- Next.js 14, TypeScript, Tailwind CSS
- Prisma + SQLite (same schema can move to Postgres / Supabase)
- Cookie session auth for admin routes
- Local `public/uploads` for logos and PDFs
