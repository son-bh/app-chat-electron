import Cookies from 'universal-cookie';
import { addMonths } from 'date-fns';

import { StorageKeys } from '../constants/storage-keys';

const cookies = new Cookies();

export const CookiesStorage = {
  getCookieData(key: string) {
    return cookies.get(key);
  },
  setCookieData(key: string, data: string) {
    const expires = addMonths(new Date(), 1);
    return cookies.set(key, data, { expires, path: '/' });
  },
  clearCookieData(key: string) {
    return cookies.remove(key, { path: '/' });
  },
  getAccessToken() {
    return cookies.get(StorageKeys.AccessToken);
  },
  isAuthenticated() {
    const isAuthenticated = cookies.get(StorageKeys.IsAuthenticated);
    return !!isAuthenticated;
  },
  clearSession() {
    this.clearCookieData(StorageKeys.AccessToken);
    this.clearCookieData(StorageKeys.UserInfo);
    this.clearCookieData(StorageKeys.IsAuthenticated);
  },
};
