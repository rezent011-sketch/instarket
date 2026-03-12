import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://instarket.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://instarket.vercel.app/skills', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://instarket.vercel.app/agents', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://instarket.vercel.app/moltbook', lastModified: new Date(), changeFrequency: 'hourly', priority: 0.7 },
    { url: 'https://instarket.vercel.app/sell', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
