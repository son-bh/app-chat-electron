/* eslint-disable @typescript-eslint/no-explicit-any */

import classNames from 'classnames';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Checkbox from '../input/Checkbox';

interface IProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<any>;
  label?: string;
  className?: string;
  disabled?: boolean;
  containerClassName?: string;
  onChange?: (checked: boolean) => void;
}

const CheckboxController = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  className,
  disabled = false,
  containerClassName,
  onChange: customOnChange,
  ...rest
}: IProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value, onChange } }) => (
      <div className={classNames('block', containerClassName)}>
        <Checkbox
          id={name}
          label={label}
          checked={Boolean(value)}
          className={className}
          disabled={disabled}
          {...rest}
          onChange={checked => {
            onChange(checked);
            customOnChange?.(checked);
          }}
        />
      </div>
    )}
  />
);

export default CheckboxController;
