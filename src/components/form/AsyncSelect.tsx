import React from 'react';
import RAsyncSelect, { AsyncProps } from 'react-select/async';
import { GroupBase, OptionsOrGroups } from 'react-select';
import classNames from 'classnames';

import { IOptionSelect } from '../../types';

interface CustomAsyncSelectProps {
  error?: string;
  loadOptions?: (
    inputValue: string
  ) => Promise<OptionsOrGroups<IOptionSelect, GroupBase<IOptionSelect>>>;
}

// Extend all react-select AsyncProps and add our custom props
interface AsyncSelectProps
  extends Omit<
      AsyncProps<IOptionSelect, boolean, GroupBase<IOptionSelect>>,
      'loadOptions'
    >,
    CustomAsyncSelectProps {}

export const AsyncSelect: React.FC<AsyncSelectProps> = ({
  error,
  loadOptions,
  ...reactSelectProps
}) => {
  return (
    <div className={reactSelectProps.className}>
      <RAsyncSelect<IOptionSelect, boolean, GroupBase<IOptionSelect>>
        {...reactSelectProps}
        cacheOptions
        defaultOptions={reactSelectProps.options}
        loadOptions={loadOptions || (() => Promise.resolve([]))}
        classNames={{
          control: state =>
            classNames(
              'form-control w-full !min-h-[44px] !rounded-lg border hover:!ring-brand-500/10 focus:!border-brand-300 focus:!ring-3 focus:!ring-brand-500/10 !appearance-none text-sm !shadow-theme-xs placeholder:!text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:!text-white/30',
              state.isFocused &&
                'hover:!border-ring-brand-500/10 !border-ring-brand-500/10',
              !state.isFocused && '!border-[#E6E8EC]',
              error && '!border-error-500'
            ),
          indicatorSeparator: () => classNames('hidden'),
          valueContainer: () => classNames('!px-4'),
          singleValue: () => classNames('!text-neutrals-4 !text-sm'),
          menu: () => classNames('!z-[11] !text-neutrals-4 !text-sm'),
        }}
      />
    </div>
  );
};
