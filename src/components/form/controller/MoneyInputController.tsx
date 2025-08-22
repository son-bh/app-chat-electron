import classNames from 'classnames';
import { InputHTMLAttributes, useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
interface IProps<TFieldValues extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'min' | 'max' | 'step'
  > {
  name: Path<TFieldValues>;
  control: Control<any>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  suffix?: string;
  containerClassName?: string;
  success?: boolean;
  vndBefore?: boolean;
  hint?: string;
}

const MoneyInput = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  className,
  labelClassName,
  required,
  vndBefore = false,
  disabled = false,
  success = false,
  ...rest
}: IProps<TFieldValues>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

  // Add styles for the different states
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (success) {
    inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <div className='flex flex-col'>
          <label
            htmlFor={name}
            className={classNames(
              'form-label text-neutral-700 dark:text-neutral-100',
              labelClassName
            )}
          >
            {label}
            {required && <sup className='text-red-600 ml-1'>*</sup>}
          </label>
          <input
            ref={inputRef}
            type='text'
            value={
              field.value
                ? vndBefore
                  ? `VND ${Number(field.value).toLocaleString('vi-VN')}`
                  : `${Number(field.value).toLocaleString('vi-VN')} VND`
                : ''
            }
            onChange={e => {
              const raw = e.target.value.replace(/\D/g, ''); // chỉ giữ số
              const oldCursor = e.target.selectionStart || 0;
              const oldLength = e.target.value.length;

              if (!raw) {
                field.onChange(0);
                return;
              }

              field.onChange(Number(raw)); // lưu giá trị số nguyên vào RHF

              requestAnimationFrame(() => {
                if (inputRef.current) {
                  const newLength = (
                    vndBefore
                      ? `VND ${Number(raw).toLocaleString('vi-VN')}`
                      : `${Number(raw).toLocaleString('vi-VN')} VND`
                  ).length;
                  const diff = newLength - oldLength;
                  inputRef.current.selectionStart =
                    inputRef.current.selectionEnd = oldCursor + diff;
                }
              });
            }}
            placeholder={rest.placeholder || `${label}`}
            className={`${inputClasses} ${fieldError && 'text-error-800 !border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500'}`}
            {...rest}
          />
          {!!fieldError && (
            <p
              className={`mt-1.5 text-xs ${
                fieldError
                  ? 'text-error-500'
                  : success
                    ? 'text-success-500'
                    : 'text-gray-500'
              }`}
            >
              {fieldError.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
export default MoneyInput;
