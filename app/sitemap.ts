import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.orionaimedia.com';
    const lastModified = new Date();
    return [
        { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 }
    ];
}
