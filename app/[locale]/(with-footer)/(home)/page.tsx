import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import Faq from '@/components/Faq';
import SearchForm from '@/components/home/SearchForm';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from './Tag';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata(): Promise<Metadata> {
  const title = 'AI Tools For Everything | Best AI Tools Directory';
  const description =
    'Discover the best AI tools for all your needs. Our curated directory features top AI tools for text, images, videos, business, education and more.';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title,
    description,
    keywords:
      'ai tools for, ai tools for text-writing, ai tools for image, ai tools for video, ai tools for business, ai tools for education, ai tools for prompt, ai tools for teachers, ai tools for studying, ai tools for students, ai tools for song-lyrics, ai tools for ppt',
    alternates: {
      canonical: './',
    },
    openGraph: {
      title,
      description,
      url: 'https://aitoolsfor.online',
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
  };
}

export const revalidate = RevalidateOneHour;

export default async function Page() {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase.from('web_navigation').select('*, tag_name').order('collection_time', { ascending: false }).limit(12),
  ]);

  // 处理数据，为每个导航项添加标签
  const navigationListWithTags = navigationList?.map((item) => ({
    ...item,
    tags: item.tag_name ? [item.tag_name] : [],
  }));

  // 获取主要分类（最多显示8个）
  const mainCategories = categoryList?.slice(0, 8) || [];

  // 定义分类描述
  const categoryDescriptions: Record<string, string> = {
    'text-writing': 'Create content, essays, articles and more',
    image: 'Generate, edit, and enhance images',
    video: 'Create and edit videos effortlessly',
    business: 'Boost productivity and streamline workflows',
    education: 'Enhance learning and teaching experiences',
    prompt: 'Create effective prompts for AI models',
    teachers: 'Tools for education professionals',
    students: 'Study aids and learning assistants',
    studying: 'Improve learning efficiency and retention',
    'song-lyrics': 'Create and edit music compositions',
    ppt: 'Design professional presentations quickly',
  };

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-5 flex flex-col text-center lg:mx-auto lg:my-10 lg:gap-1'>
          <h1 className='text-2xl font-bold text-white lg:text-5xl'>Find the Perfect AI Tools For Your Needs</h1>
          <h2 className='text-balance text-xs font-bold text-white lg:text-sm'>{t('subTitle')}</h2>
        </div>
        <div className='flex w-full items-center justify-center'>
          <SearchForm />
        </div>
        <div className='mb-8 mt-5'>
          <TagList
            data={categoryList!.map((item) => ({
              id: String(item.id),
              name: item.name,
              href: `/category/${item.name}`,
            }))}
            activePath='/'
          />
        </div>
        <div className='flex flex-col gap-5'>
          <h2 className='text-center text-[18px] font-bold lg:text-[32px]'>Explore AI Tools For Various Purposes</h2>
          <WebNavCardList dataList={navigationListWithTags!} />
          <Link
            href='/explore'
            className='mx-auto mb-5 flex w-fit items-center justify-center gap-5 rounded-[9px] border border-white p-[10px] text-sm leading-4 transition-colors duration-300 hover:bg-white hover:text-black'
          >
            {t('exploreMore')}
            <CircleChevronRight className='mt-[0.5] h-[20px] w-[20px]' />
          </Link>
        </div>
        <div className='mt-8'>
          <h2 className='mb-5 text-center text-[18px] font-bold lg:text-[28px]'>Popular AI Tool Categories</h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {mainCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.name}`}
                className='rounded-lg bg-gray-800 p-4 transition-all hover:bg-gray-700'
              >
                <h3 className='font-semibold'>AI Tools For {category.name.replace(/-/g, ' ')}</h3>
                <p className='mt-2 text-sm text-gray-300'>
                  {categoryDescriptions[category.name] || 'Discover the best AI tools in this category'}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <Faq />
        <ScrollToTop />
      </div>
    </div>
  );
}
