import { ReactNode } from 'react';
import useUserStore from '@/store/userStore';

interface Props {
  children: ReactNode;
  allowedRoles: string;
}
function AuthorizationWrapper(props: Props) {
  const { children, allowedRoles } = props;
  const userInfo = useUserStore(state => state.userInfo);
  const userRoles = userInfo?.permissions || [];
  const hasPermission =
    userInfo?.role === 'SUPER_ADMIN' || userRoles.includes(allowedRoles);
  //   const hasPermission = (allowedRoles || []).every(role =>
  //     userRoles.includes(role),
  //   );

  return hasPermission ? children : null;
}
export default AuthorizationWrapper;
