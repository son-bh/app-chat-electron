import { create } from 'zustand';
import { IUser as IUserType } from '../types';
import { CookiesStorage } from '@/shared/utils/cookie-storage';
import { StorageKeys } from '@/shared/constants';

interface IUser {
  userInfo: IUserType;
  setUserInfo: (userInfo: IUserType) => void;
}

const userInfo: IUserType = CookiesStorage.getCookieData(StorageKeys.UserInfo);

const useUserStore = create<IUser>()(set => ({
  userInfo: userInfo,
  setUserInfo: (userInfo: IUserType) => set(() => ({ userInfo: userInfo })),
}));

export default useUserStore;
