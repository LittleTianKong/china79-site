# China79 website

A custom Next.js starter site for **China79 — Analysis, dialogue, and perspectives on U.S.-China relations**.

## Pages included

- Home
- Analysis
- Individual analysis articles
- Policy & Outreach
- Interviews
- About
- Contact

## Important launch note

The three sample article bodies and the policy brief are **placeholder content for layout purposes**. Replace them with fully sourced final work before publishing the site publicly.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy on Vercel

1. Put this folder in a GitHub repository.
2. Import the repository at Vercel.
3. Vercel will recognize Next.js automatically.
4. Add `china79.org` under the project's Domains settings.
5. Vercel will give you the DNS records to add in Namecheap.

Do not change your Namecheap email MX records when connecting the website. Only add/change the DNS records Vercel requests for the web domain.

## Editing content

Initial content lives in `lib/content.ts`.

Each article has:

- `slug`
- `section`
- `title`
- `dek`
- `date`
- `readTime`
- `author`
- `body`

For a larger publication, the next upgrade would be Markdown/MDX files or a CMS so articles can be published without editing TypeScript.

## Brand

The selected China79 logo is stored at `public/china79-logo.png`.

Primary colors are defined at the top of `app/globals.css`.
