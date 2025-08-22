declare module '@trendmicro/react-paginations';

import { TablePagination } from '@trendmicro/react-paginations';

import '@trendmicro/react-paginations/dist/react-paginations.css';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';

interface IPaginationProps {
  type?: 'full' | 'simple';
  page: number;
  pageLength: number;
  totalRecords: number;
  onPageChange?: (page: number, pageLength: number) => void;
}

const Pagination = ({
  type = 'full',
  page,
  pageLength,
  totalRecords,
  onPageChange,
}: IPaginationProps) => {
  return (
    <div className='text-sm pagination'>
      <TablePagination
        type={type}
        page={page}
        pageLength={pageLength}
        totalRecords={totalRecords}
        onPageChange={({ page, pageLength }) => {
          onPageChange?.(page, pageLength);
        }}
        prevPageRenderer={() => <ChevronLeftIcon />}
        nextPageRenderer={() => <ChevronRightIcon />}
      />
    </div>
  );
};

export default Pagination;
