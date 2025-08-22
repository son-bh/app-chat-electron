/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuPencil } from 'react-icons/lu';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IUser, PERMISSIONS, UserStatus } from '@/types';
import { EmployeeTypeOption, ModalType } from '@/shared/constants';
import Select from '@/components/form/Select';
import classNames from 'classnames';
import { format } from 'date-fns';
import { USER_ROLE } from '@/configs';
import useUserStore from '@/store/userStore';
import AuthorizationWrapper from '@/components/common/AuthorizationWrapper';
import { checkIsDisableSelectByPermission } from '@/shared/utils/helpers';

interface IUserListProps {
  users: Array<IUser>;
  handleEditUser: (data: IUser, modalType: string) => void;
}

export default function UserTable({ users, handleEditUser }: IUserListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<IUser>();
  const userInfo = useUserStore(state => state.userInfo);

  const columns = useMemo<ColumnDef<IUser, any>[]>(
    () => [
      // columnHelper.accessor('username', {
      //   header: () => 'Tài khoản',
      //   cell: info => <div>{info.getValue()}</div>,
      // }),
      columnHelper.accessor('username', {
        header: 'Tài khoản',
        cell: info => (
          <div className='flex items-center gap-2'>
            <button
              className={`rounded text-gray-500 hover:text-blue-400 underline`}
              onClick={() => {
                if (
                  !checkIsDisableSelectByPermission(
                    userInfo,
                    PERMISSIONS.VIEW_DETAIL_EMPLOYEE
                  )
                )
                  handleEditUser(info?.row.original, ModalType.Detail);
              }}
            >
              {info.getValue()}
            </button>
          </div>
        ),
      }),
      columnHelper.accessor('fullname', {
        header: () => 'Tên thật',
        cell: info => <div>{info.getValue() || '--'}</div>,
      }),
      columnHelper.accessor('online', {
        header: () => 'Trạng thái hoạt động',
        cell: info => (
          <div className='flex flex-row items-center'>
            <div
              className={`w-2 h-2 rounded-full ${info.getValue() === true ? 'bg-green-600' : 'bg-red-800'}`}
            ></div>
            <p className='ml-2'>
              {info.getValue() === true ? 'Đang hoạt động' : 'Không hoạt động'}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor('birthday', {
        header: () => 'Ngày sinh',
        cell: info => (
          <div className='min-w-[120px]'>
            {info.getValue() ? format(info.getValue(), 'dd/MM/yyyy') : '--'}
          </div>
        ),
      }),
      columnHelper.accessor('onboardAt', {
        header: () => 'Ngày nhận việc',
        cell: info => (
          <div className='min-w-[120px]'>
            {info.getValue() ? format(info.getValue(), 'dd/MM/yyyy') : '--'}
          </div>
        ),
      }),
      columnHelper.accessor('officialAt', {
        header: () => 'Ngày chuyển chính',
        cell: info => (
          <div className='min-w-[120px]'>
            {info.getValue() ? format(info.getValue(), 'dd/MM/yyyy') : '--'}
          </div>
        ),
      }),
      columnHelper.accessor('role', {
        header: () => 'Chức vụ',
        cell: info => (
          <div>{USER_ROLE[info.getValue() as keyof typeof USER_ROLE]}</div>
        ),
      }),
      columnHelper.accessor('teamId', {
        header: () => 'Bộ phận',
        cell: info => (
          <div>{info.getValue()?.name || info.row.original?.team}</div>
        ),
      }),
      columnHelper.accessor('isOfficial', {
        header: () => 'Trạng thái nhân viên',
        cell: info => (
          <Select
            defaultValue={info.getValue()}
            disabled={checkIsDisableSelectByPermission(
              userInfo,
              PERMISSIONS.CHANGE_STATUS_EMPLOYEE
            )}
            options={EmployeeTypeOption}
            placeholder='--Chọn--'
            isSetSelectedValue={false}
            className={classNames(
              '!w-[120px] !p-0 !text-center cursor-pointer',
              { '!text-success-500 !border-success-500': info.getValue() }
            )}
            onChange={(e: string) => {
              handleEditUser(
                { ...info?.row.original, status: e as UserStatus },
                ModalType.ChangeStatus
              );
            }}
          />
        ),
      }),
      columnHelper.accessor('_id', {
        header: 'Thao tác',
        cell: info => (
          <div className='flex items-center gap-2'>
            <AuthorizationWrapper
              allowedRoles={PERMISSIONS.VIEW_DETAIL_EMPLOYEE}
            >
              <button
                className='rounded text-gray-500 hover:text-blue-400'
                onClick={() => {
                  handleEditUser(info?.row.original, ModalType.Detail);
                }}
              >
                <MdOutlineRemoveRedEye className='w-4 h-4' />
              </button>
            </AuthorizationWrapper>
            <AuthorizationWrapper allowedRoles={PERMISSIONS.UPDATE_EMPLOYEE}>
              <button
                className='rounded text-gray-500 hover:text-blue-400'
                onClick={() => {
                  handleEditUser(info?.row.original, ModalType.Upsert);
                }}
              >
                <LuPencil className='w-4 h-4' />
              </button>
            </AuthorizationWrapper>
            <AuthorizationWrapper allowedRoles={PERMISSIONS.DELETE_EMPLOYEE}>
              <button
                className='rounded text-gray-500 hover:text-red-500'
                onClick={() => {
                  handleEditUser(info?.row.original, ModalType.Delete);
                }}
              >
                <FaTrash />
              </button>
            </AuthorizationWrapper>
            {userInfo?.role === 'SUPER_ADMIN' &&
            info?.row.original?.role !== 'STAFF' ? (
              <button
                className='rounded text-gray-500 hover:text-blue-400'
                onClick={() => {
                  handleEditUser(info?.row.original, ModalType.Permission);
                }}
              >
                <IoSettingsOutline className='w-4 h-4' />
              </button>
            ) : null}
          </div>
        ),
      }),
    ],
    [userInfo, handleEditUser]
  );

  const data = useMemo(() => users || [], [users]);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='overflow-x-auto max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
      <Table className='min-w-[1000px]'>
        <TableHeader className='border-b border-gray-100 dark:border-white/[0.05]'>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell
                  key={header.id}
                  isHeader
                  className={classNames(
                    'truncate px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400',
                    header.column.id === 'username' &&
                      'sticky left-0 z-20 bg-white dark:bg-gray-900'
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    className={classNames(
                      'truncate px-5 py-3 text-gray-700 text-theme-sm dark:text-gray-300',
                      cell.column.id === 'username' &&
                        'sticky left-0 z-10 bg-white dark:bg-gray-900'
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td
                className='text-sm px-5 py-3 text-center text-gray-500 dark:text-gray-400'
                colSpan={10}
              >
                Không có dữ liệu
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
