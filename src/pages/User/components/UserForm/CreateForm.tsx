/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DatePickerController,
  InputController,
  SelectController,
} from '@/components/form/controller';
import { isOfficialOption, RoleOptions } from '@/shared/constants';
import { IOptionSelect } from '@/types';
import { Control } from 'react-hook-form';

export default function CreateForm({
  control,
  teamOptions,
}: {
  control: Control<any>;
  teamOptions: Array<IOptionSelect>;
}) {
  return (
    <>
      <InputController control={control} name='email' label='Email' required />
      <InputController
        control={control}
        name='username'
        label='Username'
        required
      />
      <InputController
        control={control}
        name='password'
        label='Mật khẩu'
        placeholder='Human2025@'
        disabled
      />
      <DatePickerController
        containerClassName='birthday-picker'
        control={control}
        name='birthday'
        label='Ngày sinh'
        required
        options={{
          static: true,
          monthSelectorType: 'dropdown',
          onReady: (_, __, instance) => {
            const yearInput = instance.yearElements[0];
            if (!yearInput) return;

            const select = document.createElement('select');
            select.style.height = '30px';
            select.style.padding = '2px 4px';
            select.style.border = '1px solid #ccc';
            select.style.borderRadius = '4px';
            select.style.margin = '0 4px';
            select.style.background = '#fff';
            select.style.cursor = 'pointer';
            select.style.maxHeight = '150px'; // control height
            select.style.overflowY = 'auto';

            const currentYear = new Date().getFullYear();
            for (let y = currentYear; y >= currentYear - 100; y--) {
              const opt = document.createElement('option');
              opt.value = y.toString();
              opt.text = y.toString();
              if (y === instance.currentYear) opt.selected = true;
              select.appendChild(opt);
            }

            select.addEventListener('change', () => {
              instance.changeYear(parseInt(select.value));
            });

            yearInput.parentNode?.replaceChild(select, yearInput);
          },
        }}
      />
      <DatePickerController
        control={control}
        name='onboardAt'
        label='Ngày nhận việc'
      />
      <SelectController
        control={control}
        name='role'
        label='Chức vụ'
        options={RoleOptions}
        required
        containerClassName='z-[1000]'
      />
      <SelectController
        control={control}
        name='teamId'
        label='Bộ phận'
        options={teamOptions}
        required
        containerClassName='z-[1000]'
      />
      <SelectController
        control={control}
        name='isOfficial'
        label='Trạng thái nhân viên'
        options={isOfficialOption}
        required
        containerClassName='z-[1000]'
      />
    </>
  );
}
