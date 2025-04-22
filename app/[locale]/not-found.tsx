/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { useTranslations } from 'next-intl';

export default async function NotFound() {
  const t = useTranslations('NotFound');

  // 获取所有可用分类，作为推荐链接
  const supabase = createClient();
  const { data: categories } = await supabase.from('navigation_category').select().limit(6);

  const recommendedCategories = categories || [];

  return (
    <div className='flex h-[80vh] w-full flex-col items-center justify-center text-center'>
      <h1 className='mb-4 text-6xl font-bold tracking-tight'>{t('title') || 'Page Not Found'}</h1>
      <p className='mb-8 text-xl'>{t('description') || 'The page you are looking for does not exist.'}</p>

      {recommendedCategories.length > 0 && (
        <div className='mb-8'>
          <h2 className='mb-4 text-xl font-semibold'>Popular AI Tool Categories</h2>
          <div className='flex flex-wrap justify-center gap-3'>
            {recommendedCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.name}`}
                className='rounded-md bg-gray-800 px-4 py-2 hover:bg-gray-700'
              >
                AI Tools For {category.name.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link
        href='/'
        className='rounded-md border border-white px-4 py-2 text-white transition-colors hover:bg-white hover:text-black'
      >
        {t('goHome') || 'Back to Home'}
      </Link>
    </div>
  );
}
