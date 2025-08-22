/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type ICommon = {
  path?: string;
  guard?: React.FunctionComponent;
  layout?: React.FunctionComponent;
  element?: any;
  requireRoles?: string;
};

type IRoutes = ICommon & {
  routes?: ICommon[];
};

type IParams = {
  id?: string;
};

export type { IParams, IRoutes };
