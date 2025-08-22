/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

interface Option {
  value: any;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  isSetSelectedValue?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
  className = '',
  defaultValue = '',
  disabled,
  isSetSelectedValue = true,
  // value,
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (isSetSelectedValue) {
      setSelectedValue(value);
    }
    onChange(value); // Trigger parent handler
  };

  return (
    <select
      disabled={disabled}
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        selectedValue
          ? 'text-gray-800 dark:text-white/90'
          : 'text-gray-400 dark:text-gray-400'
      } ${className}`}
      style={{ textAlignLast: 'center' }}
      value={selectedValue}
      onChange={handleChange}
    >
      {/* Placeholder option */}
      <option
        value=''
        disabled
        className='text-gray-700 dark:bg-gray-900 dark:text-gray-400 text-center'
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
          disabled={option?.disabled}
          className='text-gray-700 dark:bg-gray-900 dark:text-gray-400 text-center'
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
