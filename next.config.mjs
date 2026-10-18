/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        // Baseline restrictions compatible with static Next.js pages and their
        // inline bootstrap scripts. This is not a nonce-based script policy.
        { key: 'Content-Security-Policy', value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'" },
      ],
    }];
  },
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: 'china79-site\\.vercel\\.app' }],
      destination: 'https://china79.org/:path*',
      permanent: true,
    }];
  },
};

export default nextConfig;
