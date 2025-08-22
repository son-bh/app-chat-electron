import classNames from 'classnames';
import Select, { GroupBase, Props, StylesConfig } from 'react-select';
import { IObjectLiteral } from '@/types';

interface IRSelectProps {
  selectClassName?: string;
  label?: string;
}

const RSelect = <IsMulti extends boolean = false>({
  selectClassName,
  label,
  onChange,
  ...props
}: Props<IObjectLiteral, IsMulti, GroupBase<IObjectLiteral>> &
  IRSelectProps) => {
  const customStyles: StylesConfig<
    IObjectLiteral,
    IsMulti,
    GroupBase<IObjectLiteral>
  > = {
    menuPortal: base => ({
      ...base,
      zIndex: 10001,
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 10001,
      marginTop: state.placement === 'top' ? -8 : 8,
      marginBottom: state.placement === 'top' ? 8 : -8,
    }),
  };

  return (
    <Select<IObjectLiteral, IsMulti, GroupBase<IObjectLiteral>>
      className={classNames('form-control', selectClassName)}
      classNamePrefix='select'
      placeholder={props.placeholder || `Chọn ${label}`}
      {...props}
      onChange={(newValue, actionMeta) => {
        onChange?.(newValue, actionMeta);
      }}
      noOptionsMessage={() => <div>Không có dữ liệu</div>}
      menuPlacement='auto'
      menuPosition='fixed'
      styles={customStyles}
      classNames={{
        control: state =>
          classNames(
            'form-control w-full !h-11 !rounded-lg border hover:!ring-brand-500/10 focus:!border-brand-300 focus:!ring-3 focus:!ring-brand-500/10 !appearance-none text-sm !shadow-theme-xs placeholder:!text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:!text-white/30',
            state.isFocused &&
              'hover:!border-ring-brand-500/10 !border-ring-brand-500/10',
            !state.isFocused && '!border-[#E6E8EC]'
          ),
        indicatorSeparator: () => classNames('hidden'),
        clearIndicator: () => classNames('cursor-pointer'),
        valueContainer: () => classNames('!px-4'),
        singleValue: () => classNames('text-sm'),
        menu: () => classNames('!z-[11] !text-sm'),
      }}
    />
  );
};

export default RSelect;
