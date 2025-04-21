import React from 'react';
import { WebNavigation } from '@/db/supabase/types';

import WebNavCard from './WebNavCard';

export default function WebNavCardList({ dataList }: { dataList: (WebNavigation & { tags?: string[] })[] }) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {dataList.map((item) => (
        <WebNavCard
          key={item.id}
          name={item.name}
          thumbnail_url={item.thumbnail_url}
          title={item.title}
          url={item.url}
          content={item.content}
          tags={item.tags}
          id={item.id}
          detail={item.detail}
          collection_time={item.collection_time}
          // Using collection_time as created_at since created_at doesn't exist in WebNavigation type
          created_at={item.collection_time}
          category_name={item.category_name}
          tag_name={item.tag_name}
          // Add missing properties with default values
          image_url={item.image_url}
          star_rating={item.star_rating}
          website_data={item.website_data}
        />
      ))}
    </div>
  );
}
