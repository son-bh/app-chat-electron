import classNames from 'classnames';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import RSelect, { GroupBase, Props } from 'react-select';
import { IObjectLiteral } from '@/types';

interface ISelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  className?: string;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  required?: boolean;
}

const SelectController = <
  TFieldValues extends Record<string, unknown>,
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  control,
  label,
  containerClassName,
  labelClassName,
  options,
  selectClassName,
  required,
  onChange,
  ...props
}: Props<Option, IsMulti, Group> & ISelectProps<TFieldValues>) => (
  <Controller
    name={name as Path<TFieldValues>}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <div className={classNames('block', containerClassName)}>
        {!!label && (
          <label
            htmlFor={name}
            className={classNames(
              'text-sm md:text-base form-label text-neutral-700 dark:text-neutral-100',
              labelClassName
            )}
          >
            {label}
            {required && <sup className='text-red-600 ml-1'>*</sup>}
          </label>
        )}
        <RSelect
          className={classNames('form-control', selectClassName)}
          classNamePrefix='select'
          placeholder={props.placeholder || `Chọn ${label}`}
          options={options}
          {...(field as IObjectLiteral)}
          {...props}
          menuPortalTarget={document.body}
          menuPlacement='auto'
          menuPosition='fixed'
          styles={{
            menuPortal: (base: any) => ({
              ...base,
              zIndex: 10001,
            }),
            menu: (provided: any, state: any) => ({
              ...provided,
              zIndex: 10001,
              marginTop: state.placement === 'top' ? -8 : 8,
              marginBottom: state.placement === 'top' ? 8 : -8,
            }),
          }}
          onChange={(newValue, actionMeta) => {
            onChange?.(newValue, actionMeta);
            field.onChange(newValue);
          }}
          classNames={{
            control: state =>
              classNames(
                'form-control w-full !h-11 !rounded-lg border hover:!ring-brand-500/10 focus:!border-brand-300 focus:!ring-3 focus:!ring-brand-500/10 !appearance-none text-sm !shadow-theme-xs placeholder:!text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:!text-white/30',
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
        {error && (
          <div className='text-[#f04438] text-xs mt-2'>{error.message}</div>
        )}
      </div>
    )}
  />
);

export default SelectController;
