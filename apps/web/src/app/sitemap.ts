import { MetadataRoute } from 'next';
import { APP_URL } from '@/lib/structured-data';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add other routes here as the app grows
  ];
}
