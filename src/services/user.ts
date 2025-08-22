import { useMutation, useQuery } from '@tanstack/react-query';

import { API_URL, API_VERSION } from '../shared/constants/common';
import { request } from '../shared/utils/request';
import {
  CreateUserPayload,
  IChangeInformationMember,
  ITeam,
  IUser,
  IUserDetail,
  UpdateUserPayLoad,
} from '../types/IUser';
import { IPagination, IQueryParams } from '../types';

export const login = (data: {
  username: string;
  password: string;
}): Promise<{ token: string; data: IUser }> =>
  request.post(`${API_VERSION}/user/login`, data);
export const logout = () =>
  request.post(`${API_VERSION}/user/logout`, undefined);
export const resetPasswordUser = (data: { username: string }) =>
  request.post(`${API_VERSION}/user/reset-password`, data);
export const changePassword = (data: {
  password: string;
  newPassword: string;
  passwordConf: string;
}) => request.post(`${API_VERSION}/user/change-pw`, data);
export const createUser = (data: CreateUserPayload) =>
  request.post(`${API_URL}/user/create`, data);
export const updateUser = (data: UpdateUserPayLoad) =>
  request.post(`${API_URL}/user/update`, data);
export const changeStatusUser = (data: { username: string; status: string }) =>
  request.post(`${API_URL}/user/change-status`, data);
export const deleteUser = (data: { username: string }) =>
  request.post(`${API_URL}/user/delete`, data);
export const getUsers = (
  params?: IQueryParams
): Promise<{ data: Array<IUser>; pagination: IPagination }> =>
  request.get(`${API_URL}/user/users`, { params });
export const getTeams = (
  params?: IQueryParams
): Promise<{ data: Array<ITeam>; pagination: IPagination }> =>
  request.get(`${API_URL}/teams`, { params });
export const changeStatusUserType = (data: {
  username: string;
  status: string;
}) => request.post(`${API_URL}/user/offical`, data);
export const getUserDetail = (
  userId?: string
): Promise<{ data: IUserDetail }> => request.get(`${API_URL}/user/${userId}`);
export const assignPermissions = (data: {
  userId: string;
  permissions: string[];
}) => request.post(`${API_URL}/user/assign-permissions`, data);
export const getMe = (): Promise<{ data: IUser }> =>
  request.get(`${API_URL}/user/me`);
export const changeInformation = (data: IChangeInformationMember) =>
  request.post(`${API_VERSION}/user/change-information`, data);
export const useQueryGetUsers = (params = {}, options = {}) =>
  useQuery({
    queryKey: ['GET_USERS', params],
    queryFn: () => getUsers(params),
    ...options,
  });
export const useQueryGetTeams = (params = {}, options = {}) =>
  useQuery({
    queryKey: ['GET_TEAMS', params],
    queryFn: () => getTeams(params),
    ...options,
  });
export const useQueryUserDetail = (userId?: string, options = {}) =>
  useQuery({
    queryKey: ['GET_USER_DETAIL', userId],
    queryFn: () => getUserDetail(userId),
    ...options,
  });
export const useQueryGetMe = () =>
  useQuery({
    queryKey: ['GET_ME'],
    queryFn: () => getMe(),
  });

export const useAssignPermissionsMutation = () =>
  useMutation({ mutationFn: assignPermissions });
export const useLoginMutation = () => useMutation({ mutationFn: login });
export const useLogoutMutation = () => useMutation({ mutationFn: logout });
export const useChangePasswordMutation = () =>
  useMutation({ mutationFn: changePassword });
export const useCreateUserMutation = () =>
  useMutation({ mutationFn: createUser });
export const useUpdateUserMutation = () =>
  useMutation({ mutationFn: updateUser });
export const useChangeStatusUserMutation = () =>
  useMutation({ mutationFn: changeStatusUser });
export const useChangeStatusUserTypeMutation = () =>
  useMutation({ mutationFn: changeStatusUserType });
export const useDeleteUserMutation = () =>
  useMutation({ mutationFn: deleteUser });
export const useResetPasswordUserMutation = () =>
  useMutation({ mutationFn: resetPasswordUser });
export const useGetUsersMutation = () =>
  useMutation({
    mutationFn: (
      params: IQueryParams & { searchKeyword?: string; teams?: string }
    ) => getUsers(params),
  });


export const useChangeInformationMutation = () =>
  useMutation({ mutationFn: changeInformation });