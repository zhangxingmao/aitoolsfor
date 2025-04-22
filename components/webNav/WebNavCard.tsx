/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unused-prop-types */

import Link from 'next/link';
import { CircleArrowRight, SquareArrowOutUpRight, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { TagItem } from '@/app/[locale]/(with-footer)/(home)/Tag';

// Create a customized version of WebNavigation with all properties as optional
interface WebNavCardProps {
  name: string;
  thumbnail_url?: string;
  title?: string;
  url?: string;
  content?: string;
  tags?: string[];
  id?: number;
  detail?: string;
  collection_time?: string;
  created_at?: string;
  category_name?: string;
  tag_name?: string;
  // The following are required in WebNavigation but not used in this component
  image_url?: string;
  star_rating?: number;
  website_data?: string;
}

export default function WebNavCard({
  name,
  thumbnail_url,
  title,
  url,
  content,
  tags,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  detail,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collection_time,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created_at,
  category_name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tag_name,
}: WebNavCardProps) {
  const t = useTranslations('Home');

  return (
    <div className='flex h-[210px] flex-col gap-3 rounded-xl bg-[#2C2D36] p-1 lg:h-[343px]'>
      <Link href={`/ai/${name}`} title={title} className='group relative'>
        <img
          src={thumbnail_url || ''}
          alt={title || ''}
          title={title || ''}
          width={310}
          height={174}
          className='aspect-[310/174] w-full rounded-xl bg-white/40 hover:opacity-70'
        />
        <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-xl bg-black bg-opacity-50 text-xl text-white transition-all duration-200 group-hover:flex'>
          {t('checkDetail')} <CircleArrowRight className='size-4' />
        </div>
      </Link>
      <div className='flex items-center justify-between px-[6px]'>
        <a href={url || '#'} title={title || ''} target='_blank' rel='nofollow' className='hover:opacity-70'>
          <h3 className='line-clamp-1 flex-1 text-sm font-bold lg:text-base'>{title}</h3>
        </a>
        <a href={url || '#'} title={title || ''} target='_blank' rel='nofollow' className='hover:opacity-70'>
          <SquareArrowOutUpRight className='size-5' />
          <span className='sr-only'>{title}</span>
        </a>
      </div>
      <p className='line-clamp-3 px-[6px] text-xs text-white/70 lg:line-clamp-5 lg:text-sm'>{content}</p>

      <div className='mt-auto flex flex-wrap gap-2 px-[6px]'>
        {category_name && (
          <Link
            href={`/category/${category_name}`}
            className='flex items-center gap-1 rounded-md bg-gray-700 px-2 py-1 text-xs hover:bg-gray-600'
            title={`AI Tools For ${category_name.replace(/-/g, ' ')}`}
          >
            <Tag className='size-3' />
            {category_name.replace(/-/g, ' ')}
          </Link>
        )}

        {tags && tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {tags.slice(0, 2).map((tag) => (
              <TagItem key={tag}>{tag}</TagItem>
            ))}
            {tags.length > 2 && <span className='text-xs text-white/70'>+{tags.length - 2}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
