/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DatePickerController,
  InputController,
  SelectController,
  RadioController,
} from '@/components/form/controller';
import { RoleOptions } from '@/shared/constants';
import { IOptionSelect } from '@/types';
import { Control } from 'react-hook-form';

export default function UpdateForm({
  control,
  teamOptions,
}: {
  control: Control<any>;
  teamOptions: Array<IOptionSelect>;
}) {
  return (
    <>
      <InputController
        control={control}
        name='username'
        label='Username'
        required
        disabled
      />
      <InputController control={control} name='email' label='Email' required />
      <InputController
        control={control}
        name='fullname'
        label='Tên đầy đủ'
        required
      />
      <InputController
        control={control}
        name='phone'
        label='Số điện thoại'
        required
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
      <InputController
        control={control}
        name='facebook'
        label='Tài khoản Facebook'
        placeholder='Tài khoản Facebook'
      />
      <InputController
        control={control}
        name='zalo'
        label='Tài khoản Zalo'
        placeholder='Tài khoản Zalo'
      />
      <InputController
        control={control}
        name='telegram'
        label='Tài khoản Telegram'
        placeholder='Tài khoản Telegram'
      />
      <InputController
        control={control}
        name='discord'
        label='Tài khoản Discord'
        placeholder='Tài khoản discord'
      />
      <div className='flex items-center gap-4'>
        <label className='text-sm md:text-base form-label !text-neutral-700 dark:text-neutral-100'>
          Giới tính
        </label>
        <RadioController
          control={control}
          name='gender'
          idPrefix='plan'
          direction='row'
          rules={{ required: 'Please choose a plan' }}
          options={[
            { label: 'Nam', value: 'MALE' },
            { label: 'Nữ', value: 'FEMALE' },
          ]}
        />
      </div>
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
      <DatePickerController
        control={control}
        name='onboardAt'
        label='Ngày nhận việc'
        options={{ static: true }}
        containerClassName='date-picker-above'
      />
      <DatePickerController
        control={control}
        name='officialAt'
        label='Ngày chuyển chính'
        options={{ static: true }}
        containerClassName='date-picker-above'
      />
    </>
  );
}
