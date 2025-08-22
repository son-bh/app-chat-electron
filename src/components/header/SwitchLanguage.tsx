import { useState } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { useTranslation } from 'react-i18next';
import { DropdownItem } from '../ui/dropdown/DropdownItem';

export default function SwitchLanguage() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown(lang?: string) {
    if (lang) {
      i18n.changeLanguage(lang);
    }
    setIsOpen(false);
  }

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className='flex items-center text-gray-700 dropdown-toggle dark:text-gray-400'
      >
        <span className='mr-2 overflow-hidden h-11 w-11 flex items-center'>
          <img
            src={
              i18n.resolvedLanguage === 'en'
                ? '/images/flag/en.jpg'
                : '/images/flag/vn.png'
            }
            alt='User'
          />
        </span>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className='absolute right-0 flex flex-col rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark'
      >
        <div>
          {/* <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {userInfo?.username}
          </span> */}
          {/* <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            randomuser@pimjo.com
          </span> */}
        </div>

        <ul className='flex flex-col gap-1'>
          <li>
            <DropdownItem
              onItemClick={() => closeDropdown('vi')}
              tag='a'
              className='text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
            >
              <img
                src={'/images/flag/vn.png'}
                alt='User'
                className='h-6 w-8 object-cover'
              />
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={() => closeDropdown('en')}
              tag='a'
              className='text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
            >
              <img
                src={'/images/flag/en.jpg'}
                alt='User'
                className='h-4 w-8 object-cover'
              />
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
