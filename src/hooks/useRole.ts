import React from 'react';
import type { PERMISSIONS } from '@/types';
import useUserStore from '@/store/userStore';

export const useRole = () => {
  const userInfo = useUserStore(state => state.userInfo);
  const userRoles = React.useMemo(
    () => userInfo?.permissions || [],
    [userInfo]
  );

  const userHasAtLeastAllowedRoles = React.useCallback(
    (allowedRoles: PERMISSIONS[]): boolean => {
      return allowedRoles.some(role => userRoles?.includes(role));
    },
    [userRoles]
  );

  const userHasWholeAllowedRoles = React.useCallback(
    (allowedRoles: PERMISSIONS[]): boolean => {
      return allowedRoles.every(role => userRoles?.includes(role));
    },
    [userRoles]
  );

  return { userRoles, userHasAtLeastAllowedRoles, userHasWholeAllowedRoles };
};
