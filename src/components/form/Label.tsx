import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        twMerge(
          'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400',
          className
        )
      )}
    >
      {children}
    </label>
  );
};

export default Label;
