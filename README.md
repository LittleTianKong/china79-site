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

Page-specific copy lives in `components/HomePageClient.tsx` and the corresponding client components in `components/`. The English/Chinese switch applies to all updated pages, and the language preference is retained between visits.

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

## Search and dataset discovery

`lib/seo.ts` defines the public base URL, page metadata, indexable paths, and structured data. `/sitemap.xml` lists finalized core pages and only articles explicitly marked `published`. Draft article pages and the retained legacy `/policy-outreach` page use `noindex, follow`. `/robots.txt` permits public search crawling and excludes `/api/`.

The data catalog and flagship series use `DataCatalog` structured data. The full `Dataset` description appears on the Trump dataset’s canonical landing page with its creator, publisher, coverage, and Version 1. Public release is still forthcoming: download distributions, a license, and a publication date must be added only when confirmed and reflected on the page. Social previews use the generated `/opengraph-image` route, without external fonts or services.

The canonical public origin is `https://china79.org`. `next.config.mjs` redirects the old `china79-site.vercel.app` hostname to the same path on the custom domain; preview and local hosts are unaffected. If the public domain changes again, update `SITE_URL` in `lib/seo.ts`, the landing-page URLs in `lib/datasets.ts`, and the redirect destination together. Submit the current sitemap in Google Search Console and Bing Webmaster Tools. Search indexing and AI citations depend on each service; metadata does not guarantee inclusion or ranking.

Run discovery checks with `node --test tests/search-discovery.test.cjs`.

## Browser security

Vercel provides HTTPS certificates and HSTS. Keep its automatic certificate handling enabled; the app does not override the platform's HSTS policy.

`next.config.mjs` adds MIME-sniffing and framing protections, a strict cross-origin referrer policy, and disables camera, microphone, and geolocation access. Clipboard access remains available for citations and email drafts. The baseline Content Security Policy restricts document bases, embedded objects, framing, and form destinations; it deliberately does not claim a strict nonce- or hash-based script policy, so static Next.js pages continue to work.

Account security still depends on the owner: use two-factor authentication for the registrar, GitHub, Vercel, and email. Keep service secrets in Vercel's server-side environment variables. Before enabling direct contact delivery, use the setup in `CONTACT_FORM_SETUP.md`; its per-instance abuse limit is not a distributed firewall limit.

Run browser security configuration checks with `node --test tests/site-security.test.cjs`.
