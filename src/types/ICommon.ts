import { ReactNode } from 'react';
import { ITeam } from './IUser';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IQueryParams {
  pageSize?: number;
  pageIndex?: number;
}

export interface IPagination {
  count: number;
  page: number;
  pageSize: number;
  totalPage: number;
}

export interface IOptionSelect {
  label: string;
  value: string;
}

export interface IOptionSelectEmployeeBenefit extends IOptionSelect {
  role: string;
  teamId: ITeam;
}

export interface IOptionSelectValueBoolean {
  label: string;
  value: boolean;
}

export interface IObjectLiteral {
  [key: string]: any;
}

export interface UserAgentInfo {
  browserName: string;
  browserVersion: string;
  os: string;
  device: 'Desktop' | 'Mobile';
}


export type ITypeChat = "group" | "new" | "add";


export interface ContextMenu {
  title: string;
  icon: ReactNode;
  action?: () => void;
}