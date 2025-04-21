import Link from 'next/link';

import { cn } from '@/lib/utils';

export function TagItem({ children, isActive = false }: { children: React.ReactNode; isActive?: boolean }) {
  return (
    <div
      className={cn(
        'flex h-[40px] items-center justify-center gap-[2px] whitespace-nowrap rounded-full',
        'px-4 text-xs font-medium transition-all duration-300 ease-in-out',
        'shadow-sm hover:shadow-md',
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
          : 'bg-[#2C2D36] text-gray-200 hover:bg-[#3C3D46] hover:text-white',
      )}
    >
      {children}
    </div>
  );
}

export function TagLink({ name, href, isActive = false }: { name: string; href: string; isActive?: boolean }) {
  return (
    <Link href={href} title={name}>
      <TagItem isActive={isActive}>{name}</TagItem>
    </Link>
  );
}

export function TagList({
  data,
  activePath,
}: {
  data: { name: string; href: string; id: string }[];
  activePath?: string;
}) {
  return (
    <div className='relative w-full px-2 py-2'>
      <div className='absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-[#121212] to-transparent' />
      <ul className='no-scrollbar mx-auto flex max-w-full flex-1 items-center gap-3 overflow-auto scroll-smooth px-2 py-2'>
        {data.map((item) => (
          <li key={item.href} className='transform transition-transform duration-200 hover:scale-105'>
            <TagLink name={item.name} href={item.href} isActive={activePath === item.href} />
          </li>
        ))}
      </ul>
      <div className='absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-[#121212] to-transparent' />
    </div>
  );
}
