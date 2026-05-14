import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://rg-tech.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://rg-tech.vercel.app/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // You can dynamically map over projects here in the future to generate URLs for /projects/[id]
  ];
}
