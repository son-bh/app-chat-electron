import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL, ToastType } from '../constants/common';
import { CookiesStorage } from './cookie-storage';
import { toast } from '../../components/toast';
import { ErrorApi } from '../constants/error';
import isString from 'lodash/isString';

const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  //   transformRequest: [
  //     function (data: any) {
  //       return JSON.stringify(humps.decamelizeKeys(data));
  //     },
  //   ],
  //   transformResponse: [
  //     function (data: any) {
  //       return humps.camelizeKeys(parseJSON(data));
  //     },
  //   ],
  //   paramsSerializer: (params: any) =>
  //     qs.stringify(humps.decamelizeKeys(params), { arrayFormat: "brackets" }),
};

export const request = axios.create(axiosConfig);

request.interceptors.request.use(
  function (config) {
    const accessToken = CookiesStorage.getAccessToken();

    if (accessToken && config?.headers) {
      config.headers['xToken'] = accessToken;
    }

    // humps.decamelizeKeys(config.params);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    if (
      typeof response?.data?.success === 'boolean' &&
      !response.data.success
    ) {
      handleError({ response });
      return Promise.reject({ response });
    }
    return response.data;
  },
  function (error) {
    handleError(error);
    return Promise.reject(error);
  }
);

const handleError = (errorResponse: { response: AxiosResponse }) => {
  const { error, errors, msg } = errorResponse?.response?.data || {};

  const message =
    error || errors?.[0]?.msg || msg || isString(errorResponse?.response?.data)
      ? errorResponse?.response?.data
      : '';

  if (errorResponse?.response)
    toast(
      ToastType.Error,
      ErrorApi?.[message as keyof typeof ErrorApi] || isString(message)
        ? message
        : message?.error || message?.msg || ''
    );

  if ([403, 401].includes(errorResponse?.response?.status)) {
    CookiesStorage.clearSession();
    window.location.href = '/login';
  }

  return Promise.reject(error);
};
