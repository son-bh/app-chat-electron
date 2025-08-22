import { useRef } from 'react';
import classNames from 'classnames';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import DatePicker from '../DatePicker';
import flatpickr from 'flatpickr';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;
import { format } from 'date-fns';

const DEFAULT_TIME = format(
  `${format(new Date(), 'yyyy-MM-dd')} 12:00`,
  'yyyy-MM-dd HH:mm'
);

interface ITimePickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  required?: boolean;
  placeholder?: string;
  defaultDate?: DateOption;
  onChange?: Hook | Hook[];
  disabled?: boolean;
  hint?: string;
  time24hr?: boolean;
  dateFormat?: string;
}

const TimePickerController = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  labelClassName,
  containerClassName,
  required,
  placeholder,
  defaultDate,
  onChange,
  // disabled,
  hint,
  time24hr,
  dateFormat = 'H:i', // 24h format by default
}: ITimePickerProps<TFieldValues>) => {
  const fpInstance = useRef<flatpickr.Instance | null>(null);

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
          <DatePicker
            id={name}
            mode='single'
            placeholder={placeholder || `${label}`}
            dateFormat={dateFormat}
            enableTime={true}
            noCalendar={true}
            time24hr={time24hr}
            defaultDate={
              field.value && typeof field.value === 'string'
                ? new Date(field.value)
                : defaultDate
            }
            onChange={(selectedDates, dateStr, instance) => {
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
            ref={fpInstance}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (fpInstance.current) {
                  const selectedDate = fpInstance.current.selectedDates[0];
                  field.onChange(selectedDate);
                  fpInstance.current.close();
                }
              }
            }}
            onClose={(_, __, instance) => {
              const selectedDate = instance.selectedDates[0];
              field.onChange(selectedDate || DEFAULT_TIME);
            }}
            options={{ static: true }}
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

export default TimePickerController;
