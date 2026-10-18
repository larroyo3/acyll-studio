import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

const pages = ['/', '/mentions-legales/', '/confidentialite/'];

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((page) => `  <url><loc>${new URL(withBase(page), site).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
