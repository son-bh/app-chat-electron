'use client';

import React, { useState } from 'react';
// import { useTranslations } from "next-intl";
import classNames from 'classnames';

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  className?: string;
  onChange?: (key: string) => void;
}

export default function Tabs({
  items,
  defaultActiveKey,
  className,
  onChange,
}: Readonly<TabsProps>) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey ?? items[0]?.key);
  // const t = useTranslations();

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  return (
    <div className={className}>
      <div>
        <nav className='flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600'>
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => handleTabChange(item.key)}
              className={classNames(
                'text-sm md:text-base inline-flex items-center border-b-2 px-2.5 py-2 font-medium transition-colors duration-200 ease-in-out whitespace-nowrap',
                activeKey === item.key
                  ? 'text-brand-500 dark:text-brand-400 border-brand-500 dark:border-brand-400'
                  : 'bg-transparent text-[#4A4A4A] border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className='pt-4'>
        {items.find(item => item.key === activeKey)?.content}
      </div>
    </div>
  );
}
