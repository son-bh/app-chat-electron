import { useMutation, useQuery } from "@tanstack/react-query";
import { API_VERSION } from "../shared/constants/common";
import { request } from "../shared/utils/request";
import {
  IConversationDetail,
  IMessage,
  ISendMessageGroupPayload,
  ISendMessagePayload,
} from "@/types";
import { AxiosRequestConfig } from "axios";

export const getMessagesUser = (params?: {
  conversationId?: string;
}): Promise<{ data: Array<IMessage> }> =>
  request.get(`${API_VERSION}/messages/list-detail`, { params });
export const getPinMessages = (params?: {
  conversationId?: string;
}): Promise<{ data: Array<IMessage> }> =>
  request.get(`${API_VERSION}/messages/list-pin`, { params });
export const getConversationDetail = (params?: {
  conversationId?: string;
}): Promise<{ data: IConversationDetail }> =>
  request.get(`${API_VERSION}/conversation/detail`, { params });
export const sendMessage = (
  data: ISendMessagePayload
): Promise<{ data: IMessage }> =>
  request.post(`${API_VERSION}/messages/send`, data);
export const sendMessageGroup = (
  data: ISendMessageGroupPayload
): Promise<{ data: IMessage }> =>
  request.post(`${API_VERSION}/messages/send-group`, data);
export const pinMessage = (data: {
  messageId: string;
  conversationId: string;
}): Promise<{ data: IMessage }> =>
  request.post(`${API_VERSION}/messages/pin`, data);
export const removePinMessage = (data: {
  messageId: string;
  conversationId: string;
}): Promise<{ data: IMessage }> =>
  request.post(`${API_VERSION}/messages/remove-pin`, data);
export const readMessage = (params?: { conversationId?: string }) =>
  request.get(`${API_VERSION}/messages/read`, { params });

export const importFile = (data: FormData, config?: AxiosRequestConfig) =>
  request.post("/api/v1/categories/import", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });
export const uploadImageMessage = (
  data: FormData,
  config?: AxiosRequestConfig
): Promise<{ data: string }> =>
  request.post(`${API_VERSION}/messages/upload-image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });
export const uploadFileMessage = (
  data: FormData,
  config?: AxiosRequestConfig
): Promise<{ data: string }> =>
  request.post(`${API_VERSION}/messages/upload-file`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });
export const uploadVideoMessage = (
  data: FormData,
  config?: AxiosRequestConfig
): Promise<{ data: string }> =>
  request.post(`${API_VERSION}/messages/upload-video`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });

export const useSendMessageMutation = () =>
  useMutation({ mutationFn: sendMessage });
export const useSendMessageGroupMutation = () =>
  useMutation({ mutationFn: sendMessageGroup });
export const usePinMessageMutation = () =>
  useMutation({ mutationFn: pinMessage });
export const useRemovePinMessageMutation = () =>
  useMutation({ mutationFn: removePinMessage });
export const useReadMessageMutation = () =>
  useMutation({
    mutationFn: (params: { conversationId?: string }) => readMessage(params),
  });

export const useQueryGetMessagesUser = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_MESSAGES_USER", params],
    queryFn: () => getMessagesUser(params),
    ...options,
  });
export const useQueryGetPinMessages = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_PIN_MESSAGES", params],
    queryFn: () => getPinMessages(params),
    ...options,
  });
export const useQueryGetConversationDetail = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_CONVERSATION_DETAIL", params],
    queryFn: () => getConversationDetail(params),
    ...options,
  });

// https://hr-api-3005.go9.me/api/v1/conversation/detail?conversationId=68a575d071aeb61f537d5023
