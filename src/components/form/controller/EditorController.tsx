/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from 'classnames';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Editor, { EditorProps } from '../input/Editor';

interface IProps<TFieldValues extends FieldValues>
  extends Omit<EditorProps, 'onChange'> {
  name: Path<TFieldValues>;
  control: Control<any>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  containerClassName?: string;
}

const EditorController = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  labelClassName,
  required,
  containerClassName,
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
        <Editor
          id={name}
          onChange={field.onChange}
          value={field.value as string}
          {...rest}
        />
        {fieldError && (
          <div className='text-xs text-red-600 mt-2'>{fieldError.message}</div>
        )}
      </div>
    )}
  />
);

export default EditorController;
