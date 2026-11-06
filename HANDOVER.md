# Handover guide

Everything needed to run, change and fully own krishnabalaji.dev.

## What runs where

| Piece | Service | Account |
|---|---|---|
| Code | GitHub: `krishna31102004/krishna-balaji-dev` | Krishna |
| Hosting | Vercel project `krishna-balaji-dev` | Krishna (`krishna31102004`) |
| Domain and DNS | IONOS | Krishna |
| Live cursors, visitor globe | Supabase project `pjxqapyavqontrnspipg` | Check, see the transfer list |
| Contact form | FormSubmit, delivers to krishna311004@gmail.com | Krishna's Gmail |

## Run it locally

```bash
git clone https://github.com/krishna31102004/krishna-balaji-dev.git
cd krishna-balaji-dev
npm install
cp .env.example .env.local   # then fill in the two Supabase values
npm run dev
```

Without `.env.local` the site still runs, but live cursors and the globe stay off.

`/api/*` routes and `middleware.ts` only run on Vercel, so OG images and visitor location don't work under `npm run dev`.

## Change something

Most content is in `src/config/site.ts`: bio, projects, experience, links, playlist.

| To change | Edit |
|---|---|
| Photos | `public/profile.webp` (default), `public/profile2.webp` |
| Resume | `public/resume.pdf` |
| Songs | `public/assets/music/`, then `playlist` in `site.ts` |
| Themes | `src/components/theme-provider.tsx`, `src/index.css` |
| Festive effects | `src/components/festive-scenes.ts`, `festive-layer.tsx` |
| Terminal commands | `src/components/terminal.tsx` |
| ⌘K menu | `src/components/command-palette.tsx` |
| GitHub profile cards | `scripts/gh-cards.py`, output in `public/gh/` |

## Deploy

Push to `main`. Vercel builds and publishes in about a minute. Pushing to any other branch creates a preview link instead.

To undo a bad release: Vercel → Deployments → pick the last good one → **Promote to Production**.

## Vercel settings

Project → Settings:

- **Environment Variables:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. After changing either, redeploy, because they are baked in at build time.
- **Domains:** `krishnabalaji.dev` and `www.krishnabalaji.dev`.
- **Git:** connected to this repo, production branch `main`.

## DNS at IONOS

| Type | Host | Value |
|---|---|---|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

Leave the MX, SPF, DKIM and DMARC records alone. They run email on the domain.

## GitHub profile README

It lives in the repo `krishna31102004/krishna31102004`. Its project cards load from `krishnabalaji.dev/gh/t/`, so keep `public/gh/` in this repo.

## Full transfer checklist

- [ ] **Supabase:** log in at supabase.com and check whether `pjxqapyavqontrnspipg` is under Krishna's account. If it isn't, the owner moves it with Project Settings → General → Transfer project, or Krishna creates a new project, runs `supabase-setup.sql`, and updates the two Vercel variables.
- [ ] **GitHub:** once setup is finished, remove `aditya160509` under Settings → Collaborators.
- [ ] **Vercel:** log out the CLI on Aditya's Mac (`vercel logout`), and revoke unused tokens under Account Settings → Tokens.
- [ ] **IONOS:** change the password if it was shared, and make sure domain auto-renew is on.
- [ ] **Old host:** cancel the Lovable project. The domain no longer points to it.
- [ ] **Music:** the repo is public and includes copyrighted songs. Consider making the repo private or swapping them out.
