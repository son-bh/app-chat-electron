import React, { useEffect, forwardRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Label from './Label';
import { CalenderIcon } from '../../icons';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;
import { Options } from 'flatpickr/dist/types/options';
import classNames from 'classnames';

type PropsType = {
  id: string;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  onChange?: Hook | Hook[];
  onClose?: Hook;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
  dateFormat?: string;
  enableTime?: boolean;
  noCalendar?: boolean;
  time24hr?: boolean;
  options?: Options;
  error?: string;
  disabled?: boolean;
};

const DatePicker = forwardRef<flatpickr.Instance | null, PropsType>(
  function DatePicker(
    {
      id,
      mode,
      onChange,
      label,
      defaultDate,
      placeholder,
      dateFormat = 'Y-m-d',
      enableTime,
      noCalendar,
      time24hr,
      options,
      error,
      onClose,
      onKeyDown,
      disabled,
    },
    ref
  ) {
    useEffect(() => {
      const flatPickr = flatpickr(`#${id}`, {
        mode: mode || 'single',
        static: false,
        monthSelectorType: 'static',
        dateFormat,
        defaultDate,
        onChange,
        enableTime,
        noCalendar,
        time_24hr: time24hr,
        disableMobile: true,
        ...options,
        onClose,
      });

      // Expose the flatPickr instance to the parent via ref (only if not array)
      if (!Array.isArray(flatPickr) && ref) {
        if (typeof ref === 'function') {
          ref(flatPickr);
        } else {
          (ref as React.RefObject<flatpickr.Instance | null>).current =
            flatPickr;
        }
      }

      return () => {
        if (!Array.isArray(flatPickr)) {
          flatPickr.destroy();
        }
        // Clean up ref
        if (ref) {
          if (typeof ref === 'function') {
            ref(null);
          } else {
            (ref as React.RefObject<flatpickr.Instance | null>).current = null;
          }
        }
      };
    }, [
      mode,
      onChange,
      id,
      defaultDate,
      dateFormat,
      enableTime,
      noCalendar,
      time24hr,
      ref,
      options,
      onClose,
    ]);

    return (
      <div>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className='relative'>
          <input
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={
              defaultDate
                ? flatpickr.formatDate(
                    defaultDate instanceof Date
                      ? defaultDate
                      : new Date(defaultDate),
                    dateFormat
                  )
                : ''
            }
            className={classNames(
              'h-11 w-full rounded-lg bg-white border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800',
              {
                '!border-error-500': error,
              }
            )}
            onKeyDown={onKeyDown}
          />
          <span className='absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400'>
            <CalenderIcon className='size-6' />
          </span>
        </div>
      </div>
    );
  }
);

export default DatePicker;
