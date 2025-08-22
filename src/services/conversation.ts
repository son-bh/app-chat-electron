import { API_URL } from "@/shared/constants";
import { request } from "@/shared/utils/request";
import { IAddMemberForConvarsationPayLoad, IConvarsationPayLoad, IRemoveMemberForConvarsationPayLoad } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";


export const getConversation = () =>
  request.get(`${API_URL}/messages`);

export const getDetailConversation = (params: { conversationId: string }) =>
  request.get(`${API_URL}/conversation/detail?conversationId/${params.conversationId}`);
export const createConversation = (data: IConvarsationPayLoad) =>
  request.post(`${API_URL}/conversation/create`, data);

export const createContact = (data: { receiverId: string }) =>
  request.post(`${API_URL}/messages/create-direct`, data);

export const addMemberForConversation = (data: IAddMemberForConvarsationPayLoad) =>
  request.post(`${API_URL}/conversation/add-user`, data);

export const removeMemberForConversation = (data: IRemoveMemberForConvarsationPayLoad) =>
  request.post(`${API_URL}/conversation/remove-user`, data);

export const deleteConversation = (data: { conversationId: string }) =>
  request.post(`${API_URL}/conversation/delete`, data);

export const useQueryGetConversation = () =>
  useQuery({
    queryKey: ["GET_CONVERSATION"],
    queryFn: () => getConversation(),
  });

export const useQueryGetDetailConversation = (params: { conversationId: string }) =>
  useQuery({
    queryKey: ['GET_DETAIL_CONVERSATION', params],
    queryFn: () => getDetailConversation(params),
  });
export const useCreateConversationMutation = () =>
  useMutation({ mutationFn: createConversation });

export const useCreateContactMutation = () =>
  useMutation({ mutationFn: createContact });


export const useAddMembersMutation = () =>
  useMutation({ mutationFn: addMemberForConversation });

export const useRemoveMembersMutation = () =>
  useMutation({ mutationFn: removeMemberForConversation });

export const useDeleteConversationMutation = () =>
  useMutation({ mutationFn: deleteConversation });
export const useGetConversationMutation = () =>
  useMutation({ mutationFn: getConversation });
