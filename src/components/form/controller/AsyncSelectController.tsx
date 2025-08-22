import classNames from 'classnames';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AsyncSelect } from '../AsyncSelect';
import { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import { IOptionSelect } from '@/types';

interface IAsyncSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  required?: boolean;
  loadOptions?: (
    inputValue: string
  ) => Promise<OptionsOrGroups<IOptionSelect, GroupBase<IOptionSelect>>>;
  options?: IOptionSelect[];
  placeholder?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  disabled?: boolean;
  hint?: string;
  onChange?: (value: Array<IOptionSelect>) => void;
  // Thêm các props mới để support portal và styles
  menuPortalTarget?: HTMLElement | null;
  styles?: StylesConfig<IOptionSelect>;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  maxMenuHeight?: number;
  onMenuScrollToBottom?: () => void;
}

const AsyncSelectController = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  labelClassName,
  containerClassName,
  required,
  loadOptions,
  options,
  placeholder,
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  disabled,
  hint,
  onChange,
  menuPortalTarget,
  styles,
  menuPlacement = 'auto',
  maxMenuHeight = 300,
  onMenuScrollToBottom,
}: IAsyncSelectProps<TFieldValues>) => {
  // Default styles với z-index cao cho modal
  const defaultStyles: StylesConfig<IOptionSelect> = {
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 10001,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 10001,
    }),
    ...styles, // Merge với custom styles
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
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
          <AsyncSelect
            loadOptions={loadOptions}
            options={options}
            value={field.value as Array<IOptionSelect>}
            onChange={newValue => {
              field.onChange(newValue);
              onChange?.(newValue as Array<IOptionSelect>);
            }}
            onMenuScrollToBottom={onMenuScrollToBottom}
            placeholder={placeholder || `Chọn ${label}`}
            isMulti={isMulti}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isDisabled={disabled}
            className={classNames(
              'form-control',
              fieldError && 'border-red-500'
            )}
            error={fieldError?.message}
            // Thêm các props mới
            menuPortalTarget={menuPortalTarget}
            styles={defaultStyles}
            menuPlacement={menuPlacement}
            maxMenuHeight={maxMenuHeight}
          />
          {(fieldError || hint) && (
            <div
              className={classNames(
                'text-xs mt-2',
                fieldError ? 'text-red-600' : 'text-gray-500'
              )}
            >
              {fieldError ? fieldError.message : hint}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default AsyncSelectController;
