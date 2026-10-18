# China79 website

A Next.js website for **China79 Initiative — Better Data. Better Dialogue.**

Independent data and analysis on U.S.–China relations, with a commitment to pragmatic cooperation and findings grounded in historical evidence.

## Pages included

- Home
- Data & Transparency
- Analysis
- Individual analysis articles
- Cooperation & Dialogue (retains the `/policy-outreach` URL)
- Interviews
- About
- Contact

## Important launch note

The historical engagement project is a **Flagship Series of eight planned datasets**. The first is **U.S.–China Official Contacts: Trump’s First Administration (2017–2021)**. Its source workbook contains 745 retained records, with 719 included in the default count and 26 excluded records retained for transparency. The first public release is forthcoming; no data files are available to download on this site yet. Series citations and individual dataset citations are separate.

Existing article bodies in `lib/content.ts` include **placeholder content for layout purposes**. Replace them with fully sourced final work before treating them as published research. The homepage directs visitors to the data collection instead of featuring those drafts.

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

Shared English and Chinese identity, mission, vision, pillars, collection descriptions, research questions, and publishing commitments live in `lib/initiative.ts`.

Page-specific copy lives in `app/page.tsx` and the corresponding client components in `components/`. The English/Chinese switch applies to all updated pages, and the language preference is retained between visits.

When datasets are ready, replace the in-development notice with the actual release information, source documentation, methodology, and download links. Update both languages together.

Existing research content lives in `lib/content.ts`.

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
