/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, forwardRef } from 'react';
import flatpickr from 'flatpickr';
import * as monthSelectPluginNS from 'flatpickr/dist/plugins/monthSelect/index.js';
const monthSelectPlugin =
  (monthSelectPluginNS as any).default || monthSelectPluginNS;

import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import Label from './Label';
import { CalenderIcon } from '../../icons';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;
import { Options } from 'flatpickr/dist/types/options';
import classNames from 'classnames';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';

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
  options?: Options;
  error?: string;
};

const MonthPicker = forwardRef<flatpickr.Instance | null, PropsType>(
  function MonthPicker(
    {
      id,
      mode,
      onChange,
      label,
      defaultDate,
      placeholder,
      dateFormat = 'Y-m-d',
      options,
      error,
      onClose,
      onKeyDown,
    },
    _
  ) {
    useEffect(() => {
      const basePlugins = [
        monthSelectPlugin({
          shorthand: true,
          dateFormat: 'm-Y',
          altFormat: 'F Y',
        }),
      ];
      const userPlugins = options?.plugins ?? [];

      const config: Options = {
        ...options,
        mode: mode ?? options?.mode ?? 'single',
        static: true,
        defaultDate,
        disableMobile: true,
        locale: Vietnamese,

        plugins: [...basePlugins, ...userPlugins],
      };

      if (onChange) {
        config.onChange = Array.isArray(onChange) ? onChange : [onChange];
      }
      if (onClose) {
        config.onClose = Array.isArray(onClose) ? onClose : [onClose];
      }

      const instance = flatpickr(`#${id}`, config);

      return () => {
        if (!Array.isArray(instance)) {
          instance.destroy();
        }
      };
    }, [id, mode, defaultDate, dateFormat, onChange, onClose, options]);

    return (
      <div>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className='relative'>
          <input
            id={id}
            placeholder={placeholder}
            className={classNames(
              'h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-white text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800',
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

export default MonthPicker;
