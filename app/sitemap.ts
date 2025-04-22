import { type MetadataRoute } from 'next';
import { createClient } from '@/db/supabase/client';
import { locales } from '@/i18n';

import { BASE_URL } from '@/lib/env';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 从数据库获取分类列表
  const supabase = createClient();
  const { data: categories } = await supabase.from('navigation_category').select('name');

  // 获取所有分类名称
  const aiToolsCategories = categories?.map((category) => category.name) || [
    // 备用分类列表，仅在数据库查询失败时使用
    'text-writing',
    'image',
    'video',
    'business',
    'education',
    'prompt',
    'teachers',
    'studying',
    'students',
    'song-lyrics',
    'ppt',
  ];

  // 基本路由
  const sitemapRoutes: MetadataRoute.Sitemap = [
    {
      url: '', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'explore',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'submit',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'startup',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 添加分类页面
  const categoryRoutes = aiToolsCategories.map((category) => ({
    url: `category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 合并所有路由
  const allRoutes = [...sitemapRoutes, ...categoryRoutes];

  // 为每个语言生成URL
  const sitemapData = allRoutes.flatMap((route) =>
    locales.map((locale) => {
      const lang = locale === 'en' ? '' : `/${locale}`;
      const routeUrl = route.url === '' ? '' : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}`,
      };
    }),
  );

  return sitemapData;
}
