# Contact form email delivery

All four inquiry buttons and **Write a message** open the same bilingual form with the appropriate topic selected. Submissions are delivered only to **contact@china79.org**.

## Connect delivery on Vercel

1. Verify a sending domain in [Resend](https://resend.com/domains). A subdomain such as `mail.china79.org` can be used. Add the sending records Resend supplies; keep the existing mailbox MX records for `china79.org`.
2. Create a Resend API key with sending access for that domain.
3. In the existing Vercel project's **Settings → Environment Variables**, add:
   - `RESEND_API_KEY`: the API key, as a server-only secret.
   - `CONTACT_FROM_EMAIL`: a sender on the verified domain, for example `China79 Website <forms@mail.china79.org>`.
4. Apply the variables to Production and redeploy. Add them to Preview separately if previews should send email too.
5. Submit a test through the live Contact page, confirm it arrives at `contact@china79.org`, and reply to verify that replies go to the visitor's email.

Do not put the API key in GitHub, chat, or a `NEXT_PUBLIC_` variable. No recipient setting is needed: the recipient is fixed in `app/api/contact/route.ts`.

## Before delivery is connected

The form prepares a complete email draft instead. Visitors can review it, open it in their mail app, or copy it into their email service. It explicitly says nothing has been sent. Adding both variables and redeploying enables direct submission automatically.

## Behavior and checks

- The server validates input, blocks cross-origin JSON submissions, limits request size, and checks a honeypot.
- The sender is the verified website address; the visitor's address is the reply-to.
- Only provider acceptance produces a submitted confirmation. Failure preserves the text and offers the email draft option. Provider acceptance does not guarantee final inbox delivery.
- Identical message retries use a Resend idempotency key. No automatic email is sent to the visitor.
- A basic five-attempt, five-minute limit is per server instance. For a distributed limit, configure a Vercel Firewall rule on `/api/contact`.
- This app does not save messages to a database or log their contents. Email processing and retention follow the mailbox and Resend settings.

Run `node --test tests/contact-route.test.cjs` for mocked delivery, validation, failure, and rate-limit checks. These tests do not send real email.

Provider reference: [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).
