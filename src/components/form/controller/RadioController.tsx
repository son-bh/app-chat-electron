// RadioController.tsx
import * as React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';
import Radio from '../input/Radio';

type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
  id?: string; // optional custom id per option
};

type RadioControllerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: RadioOption[];
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  className?: string; // container classes
  direction?: 'row' | 'column'; // layout
  disabled?: boolean; // disable whole group
  idPrefix?: string; // prefix for generated input ids
  renderError?: (message?: string) => React.ReactNode;
};

function RadioController<TFieldValues extends FieldValues>({
  control,
  name,
  options,
  rules,
  className,
  direction = 'column',
  disabled = false,
  idPrefix,
  renderError,
}: RadioControllerProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        const currentValue = field.value ?? '';

        return (
          <div className={className}>
            <div
              role='radiogroup'
              aria-invalid={!!error}
              className={
                direction === 'row'
                  ? 'flex flex-wrap items-start gap-4'
                  : 'flex flex-col gap-2'
              }
            >
              {options.map((opt, idx) => {
                const id = opt.id ?? `${idPrefix ?? name}-${idx}`;
                return (
                  <Radio
                    key={opt.value}
                    id={id}
                    name={name}
                    value={opt.value}
                    label={opt.label}
                    checked={currentValue === opt.value}
                    onChange={val => {
                      // propagate to RHF
                      field.onChange(val);
                    }}
                    className={
                      error ? 'outline-1 outline-red-500 rounded-md p-1' : ''
                    }
                    disabled={disabled || opt.disabled}
                  />
                );
              })}
            </div>

            {renderError
              ? renderError(error)
              : error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
          </div>
        );
      }}
    />
  );
}

export default RadioController;
