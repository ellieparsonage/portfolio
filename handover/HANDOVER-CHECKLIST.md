# Handover checklist (Gabriel)

The order to set everything up so Ellie ends up owning all of it. Rough time: ~1 hour together.

## A. Accounts (in Ellie's name: do these together so she owns the passwords)

- [ ] **GitHub account**: her email, her password.
  - [ ] Turn on **2FA** and **save the backup codes** somewhere safe.
- [ ] **Vercel account**: use **"Continue with GitHub"** (no separate password).
- [ ] Confirm the **Namecheap** login (domain), hers already.

## B. Get the code into her GitHub

- [ ] Create a repo under **her** GitHub (e.g. `portfolio`), public or private.
- [ ] Push this project to it.
- [ ] Add **Gabriel** as a **collaborator** (so you can help; she stays owner).

## C. Deploy to Vercel

- [ ] In her Vercel: **Add New → Project → import the repo**. Framework auto-detects Next.js.
- [ ] Add env var **`NEXT_PUBLIC_SITE_URL`** = the final `https://…` domain
      (needed for correct share-preview image + sitemap).
- [ ] Deploy. Confirm the `*.vercel.app` URL works.

## D. Turn on the live editor (Keystatic GitHub mode)

`keystatic.config.ts` now switches automatically: local file storage on a dev
machine, GitHub on the deployed site. **No code edit is needed** — just set the
environment variables (all listed in `.env.example`).

- [ ] Create a **GitHub App** for Keystatic (GitHub → Settings → Developer
      settings → GitHub Apps → New). Give it **Contents: read & write** on the
      repo; set the callback URL to
      `https://ellieparsonagedesign.com/api/keystatic/github/oauth/callback`.
- [ ] In Vercel → Project → Settings → Environment Variables, add:
  - `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` = `HER-USERNAME/portfolio`
  - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` = the app's slug
  - `KEYSTATIC_GITHUB_CLIENT_ID` and `KEYSTATIC_GITHUB_CLIENT_SECRET` = from the app
  - `KEYSTATIC_SECRET` = a random string (`openssl rand -base64 32`)
- [ ] Redeploy. Visit `ellieparsonagedesign.com/ellieadmin`, sign in with GitHub,
      confirm she can edit and that a save triggers a rebuild.
- [ ] Check the gate: open `/help` in a private window — it should bounce to the
      GitHub sign-in, then work once signed in.

_Alternative to the GitHub App: **Keystatic Cloud** (free, less setup). Create a
project at keystatic.cloud, link the repo, and add `cloud: { project: "team/project" }`
to the config. The login gate works with either option._

## E. Point the domain (Namecheap → Vercel)

- [ ] In Vercel project → **Settings → Domains** → add `ellieparsonagedesign.com`.
      Vercel shows the exact records to create.
- [ ] In **Namecheap → Domain List → Manage → Advanced DNS**, set **Nameservers**
      to **Custom DNS** = Vercel's, *or* (simpler, keeps Namecheap DNS) leave
      nameservers as **Namecheap BasicDNS** and add the records Vercel shows:
  - [ ] **A record**, Host `@`, Value `76.76.21.21` (Vercel's apex IP — confirm
        against what Vercel displays, it can change).
  - [ ] **CNAME**, Host `www`, Value `cname.vercel-dns.com.`
  - [ ] Delete any leftover Namecheap **parking / URL-redirect records** for `@`
        and `www`, or they'll clash.
- [ ] Wait for it to go live (minutes-hours). Vercel auto-issues HTTPS.
- [ ] Update `NEXT_PUBLIC_SITE_URL` if it wasn't final before; redeploy.

## F. Swap in the real content (see WHAT-WE-NEED-FROM-ELLIE.md)

- [ ] Real fonts (replace the Archivo/JetBrains Mono placeholders in `layout.tsx`).
- [ ] Real logo SVGs where useful.
- [ ] Real contact email + about/availability copy (Site settings in the editor).
- [ ] Confirm every project's title/category/description.

## G. Money & safety

- [ ] Confirm **no card on file** on GitHub or Vercel (no surprise bills).
- [ ] Namecheap: decide **auto-renew** on/off; note the renewal date in Guide 04.

## H. Hand over

- [ ] Walk her through **Guide 01** live in the editor (do one real edit together).
- [ ] Make sure she has the handover pack and her logins saved in a password manager.

---

### Notes / decisions still open
- Domain: **settled** — `ellieparsonagedesign.com`, registered at Namecheap in Ellie's name.
- Contact: **email link** (current) vs **real contact form** (needs a free service like Formspree + her email).
- Keystatic auth: **Keystatic Cloud** (easiest) vs **self-managed GitHub App**.
