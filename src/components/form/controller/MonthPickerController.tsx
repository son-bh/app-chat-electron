import classNames from 'classnames';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import flatpickr from 'flatpickr';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;
import { Options } from 'flatpickr/dist/types/options';
import MonthPicker from '../MonthPicker';

interface IMonthPickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  required?: boolean;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  placeholder?: string;
  defaultDate?: DateOption;
  onChange?: Hook | Hook[];
  disabled?: boolean;
  hint?: string;
  dateFormat?: string;
  options?: Options;
}

const MonthPickerController = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  labelClassName,
  containerClassName,
  required,
  mode = 'single',
  placeholder,
  defaultDate,
  onChange,
  // disabled,
  hint,
  dateFormat = 'd/m/Y',
  options,
}: IMonthPickerProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error: fieldError } }) => {
      return (
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
          <MonthPicker
            id={name}
            mode={mode}
            placeholder={placeholder || `${label}`}
            dateFormat={dateFormat}
            defaultDate={
              field.value && typeof field.value === 'string'
                ? new Date(field.value)
                : defaultDate
            }
            error={fieldError?.message}
            options={options}
            onChange={(selectedDates, dateStr, instance) => {
              field.onChange(selectedDates[0]);

              if (onChange) {
                if (Array.isArray(onChange)) {
                  onChange.forEach(hook =>
                    hook(selectedDates, dateStr, instance)
                  );
                } else {
                  onChange(selectedDates, dateStr, instance);
                }
              }
            }}
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
      );
    }}
  />
);

export default MonthPickerController;
