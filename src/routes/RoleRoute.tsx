import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUserStore from '../store/userStore';
import { PATH_NAME } from '../configs';

type IProps = {
  children: ReactNode;
  requireRoles?: string;
};

const RoleRoute: FC<IProps> = ({ children, requireRoles = '' }) => {
  const navigate = useNavigate();
  const userInfo = useUserStore(state => state.userInfo);

  useEffect(() => {
    const roles = userInfo?.permissions || [];
    if (roles?.length === 0 || !requireRoles) return;

    const checkRole =
      userInfo?.role === 'SUPER_ADMIN' || roles.includes(requireRoles);

    if (!checkRole) {
      navigate(PATH_NAME.HOME);
    }
  }, [navigate, requireRoles, userInfo]);

  return <>{children}</>;
};

export default RoleRoute;
