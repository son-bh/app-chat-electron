declare module '@trendmicro/react-paginations' {
  import { ReactNode } from 'react';

  export interface TablePaginationProps {
    type?: 'full' | 'simple';
    page: number;
    pageLength: number;
    totalRecords: number;
    onPageChange?: (event: { page: number; pageLength: number }) => void;
    prevPageRenderer?: () => ReactNode;
    nextPageRenderer?: () => ReactNode;
  }

  export const TablePagination: React.FC<TablePaginationProps>;
}
