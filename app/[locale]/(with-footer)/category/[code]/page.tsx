/* eslint-disable react/jsx-props-no-spreading */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';

import { InfoPageSize, RevalidateOneHour } from '@/lib/constants';

import Content from './Content';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: categoryList } = await supabase.from('navigation_category').select().eq('name', params.code);

  if (!categoryList || !categoryList[0]) {
    notFound();
  }

  // 格式化分类名称以用于标题
  const formattedCategory = params.code.replace(/-/g, ' ');
  const title = `AI Tools For ${formattedCategory} | aitoolsfor.online`;
  const description = `Find the best AI tools for ${formattedCategory}. Our curated selection helps you maximize productivity and creativity with top-rated tools.`;

  return {
    title,
    description,
    keywords: `ai tools for ${formattedCategory}, ${formattedCategory} ai tools, best ai tools for ${formattedCategory}`,
    openGraph: {
      title,
      description,
      url: `https://aitoolsfor.online/category/${params.code}`,
      siteName: 'AI Tools For Everything',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@aitoolsfor',
    },
    alternates: {
      canonical: `/category/${params.code}`,
    },
  };
}

export default async function Page({ params }: { params: { code: string } }) {
  try {
    const supabase = createClient();

    // 首先验证分类是否存在
    const { data: categoryList, error: categoryError } = await supabase
      .from('navigation_category')
      .select()
      .eq('name', params.code);

    // 如果有错误或没有找到分类，重定向到404
    if (categoryError || !categoryList || categoryList.length === 0) {
      console.error('Category not found:', params.code, categoryError);
      notFound();
    }

    // 获取该分类下的工具列表
    const {
      data: navigationList,
      count,
      error: navigationError,
    } = await supabase
      .from('web_navigation')
      .select('*, tag_name', { count: 'exact' })
      .eq('category_name', params.code)
      .range(0, InfoPageSize - 1);

    // 如果获取工具列表失败，依然显示页面但没有工具项
    if (navigationError) {
      console.error('Error fetching navigation data:', navigationError);
    }

    // 处理数据，为每个导航项添加标签
    const navigationListWithTags = (navigationList || []).map((item) => ({
      ...item,
      tags: item.tag_name ? [item.tag_name] : [],
    }));

    // 格式化分类名称以用于标题显示
    const formattedCategory = params.code.replace(/-/g, ' ');

    return (
      <Content
        headerTitle={`AI Tools For ${formattedCategory}`}
        navigationList={navigationListWithTags}
        currentPage={1}
        total={count || 0}
        pageSize={InfoPageSize}
        route={`/category/${params.code}`}
        categoryDescription={`Discover the best AI tools for ${formattedCategory}. Our curated collection helps you boost productivity and creativity with top-rated tools.`}
      />
    );
  } catch (error) {
    console.error('Unexpected error in category page:', error);
    notFound();
  }
}
