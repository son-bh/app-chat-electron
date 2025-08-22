import { useState } from 'react';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import RSelect from '@/components/form/form-elements/RSelect';
import { IObjectLiteral, IOptionSelect, IQueryParams } from '@/types';
import { EmployeeTypeOption, RoleOptions } from '@/shared/constants';
import Button from '@/components/ui/button/Button';

type FilterQueryParams = IQueryParams & {
  searchKeyword?: string;
  roles?: Array<IOptionSelect>;
  teams?: Array<IOptionSelect>;
  status?: IOptionSelect;
  isOfficial?: IObjectLiteral | null;
};

interface IFilterProps {
  teamOptions: Array<IOptionSelect>;
  handleFilterChange: (
    newFilter: IQueryParams & {
      searchKeyword?: string;
      roles?: string;
      teams?: string;
      status?: string;
      isOfficial?: string;
    }
  ) => void;
}

const defaultFilter = {
  pageIndex: 0,
  pageSize: 50,
  roles: [],
  teams: [],
  isOfficial: null,
};

export default function Filter({
  teamOptions,
  handleFilterChange,
}: IFilterProps) {
  const [filter, setFilter] = useState<FilterQueryParams>(defaultFilter);

  return (
    <div className='mb-6 xl:flex items-end gap-2 flex-wrap'>
      <div className='mb-2 xl:mb-0'>
        <Label>Từ khoá</Label>
        <Input
          name='searchKeyword'
          placeholder='Nhập từ khoá'
          value={filter.searchKeyword || ''}
          className='!bg-white'
          onChange={e => {
            setFilter(prev => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
        />
      </div>
      <div className='mb-2 xl:mb-0'>
        <Label>Chức vụ</Label>
        <RSelect
          isMulti
          value={filter.roles}
          options={RoleOptions}
          placeholder='--Chọn chức vụ--'
          onChange={newValue => {
            setFilter(prev => ({
              ...prev,
              roles: newValue as Array<IOptionSelect>,
            }));
          }}
          selectClassName='min-w-[190px]'
        />
      </div>
      <div className='mb-2 xl:mb-0'>
        <Label>Bộ phận</Label>
        <RSelect
          isMulti
          value={filter.teams}
          options={teamOptions}
          placeholder='--Chọn phòng ban--'
          onChange={newValue => {
            setFilter(prev => ({
              ...prev,
              teams: newValue as Array<IOptionSelect>,
            }));
          }}
          selectClassName='min-w-[190px]'
        />
      </div>
      <div className='mb-6 xl:mb-0'>
        <Label>Trạng thái nhân viên</Label>
        <RSelect
          value={filter.isOfficial}
          options={EmployeeTypeOption}
          placeholder='--Chọn trạng thái--'
          onChange={newValue => {
            setFilter(prev => ({
              ...prev,
              isOfficial: newValue as IObjectLiteral,
            }));
          }}
          selectClassName='min-w-[190px]'
        />
      </div>
      <div className='flex gap-5 xl:gap-3'>
        <Button
          size='sm'
          onClick={() => {
            setFilter(defaultFilter);
            handleFilterChange({ pageIndex: 0, pageSize: 50 });
          }}
        >
          Cài lại
        </Button>
        <Button
          size='sm'
          onClick={() => {
            handleFilterChange({
              ...filter,
              roles: filter?.roles?.map(item => item.value).join(','),
              teams: filter.teams?.map(item => item.value).join(','),
              status: filter.status?.value,
              isOfficial: filter.isOfficial?.value,
            });
          }}
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
