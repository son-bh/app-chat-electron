/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from 'classnames';
import { TextareaHTMLAttributes } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import TextArea from '../input/TextArea';

interface IProps<TFieldValues extends FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'defaultValue'> {
  name: Path<TFieldValues>;
  control: Control<any>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  containerClassName?: string;
  hint?: string;
  rows?: number;
}

const TextAreaController = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  labelClassName,
  required,
  containerClassName,
  hint,
  rows = 4,
  ...rest
}: IProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error: fieldError } }) => (
      <div className={classNames('block', containerClassName)}>
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
        <TextArea
          id={name}
          rows={rows}
          error={!!fieldError}
          hint={fieldError ? fieldError.message : hint}
          {...field}
          {...rest}
        />
        {fieldError && (
          <div className='text-xs text-red-600 mt-2'>{fieldError.message}</div>
        )}
      </div>
    )}
  />
);

export default TextAreaController;
