import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateContactMutation,
  useCreateConversationMutation,
  useDeleteConversationMutation,
  useAddMembersMutation,
  useRemoveMembersMutation,
} from "@/services";
import { useChatNavigation } from "@/hooks/useChatNavigation";

interface CreateContactParams {
  receiverId: string;
  onSuccess?: (conversationId: string) => void;
  onError?: (error: any) => void;
}

interface CreateGroupParams {
  title: string;
  userIds: string[];
  onSuccess?: (conversationId: string) => void;
  onError?: (error: any) => void;
}

interface DeleteConversationParams {
  conversationId: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface AddMembersParams {
  conversationId: string;
  userIds: string[];
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface RemoveMembersParams {
  conversationId: string;
  userId: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useChatActions = () => {
  const { navigateToChat } = useChatNavigation();
  const createContactMutation = useCreateContactMutation();
  const createConversationMutation = useCreateConversationMutation();
  const deleteConversationMutation = useDeleteConversationMutation();
  const addMembersMutation = useAddMembersMutation();
  const removeMembersMutation = useRemoveMembersMutation();
  const queryClient = useQueryClient();

  const refreshConversations = useCallback(
    (params: { conversationId?: string }) => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CONVERSATION_DETAIL", params],
      });
    },
    [queryClient]
  );

  const createContact = useCallback(
    async ({ receiverId, onSuccess, onError }: CreateContactParams) => {
      try {
        createContactMutation.mutate(
          { receiverId },
          {
            onSuccess: (res) => {
              const conversationId = res.data._id;
              navigateToChat(conversationId);
              onSuccess?.(conversationId);
            },
            onError,
          }
        );
      } catch (error) {
        onError?.(error);
      }
    },
    [createContactMutation, navigateToChat]
  );

  const createGroup = useCallback(
    async ({ title, userIds, onSuccess, onError }: CreateGroupParams) => {
      try {
        createConversationMutation.mutate(
          { title, userIds },
          {
            onSuccess: (res) => {
              const conversationId = res.data._id;
              navigateToChat(conversationId);
              onSuccess?.(conversationId);
            },
            onError,
          }
        );
      } catch (error) {
        onError?.(error);
      }
    },
    [createConversationMutation, navigateToChat]
  );

  const addMembers = useCallback(
    async ({ conversationId, userIds, onSuccess, onError }: AddMembersParams) => {
      try {
        addMembersMutation.mutate(
          { conversationId, userIds },
          {
            onSuccess: () => {
              refreshConversations({ conversationId });
              onSuccess?.();
            },
            onError,
          }
        );
      } catch (error) {
        onError?.(error);
      }
    },
    [addMembersMutation, refreshConversations]
  );

  const removeMembers = useCallback(
    async ({ conversationId, userId, onSuccess, onError }: RemoveMembersParams) => {
      try {
        removeMembersMutation.mutate(
          { conversationId, userId },
          {
            onSuccess: () => {
              refreshConversations({ conversationId });
              onSuccess?.();
            },
            onError,
          }
        );
      } catch (error) {
        onError?.(error);
      }
    },
    [removeMembersMutation, refreshConversations]
  );

  const deleteConversation = useCallback(
    async ({ conversationId, onSuccess, onError }: DeleteConversationParams) => {
      try {
        await deleteConversationMutation.mutateAsync(
          { conversationId },
          {
            onSuccess: () => {
              onSuccess?.();
            },
            onError,
          }
        );
      } catch (error) {
        onError?.(error);
      }
    },
    [deleteConversationMutation]
  );

  return {
    createContact,
    createGroup,
    addMembers,
    removeMembers,
    deleteConversation,
    isCreatingContact: createContactMutation.isPending,
    isCreatingGroup: createConversationMutation.isPending,
    isAddingMembers: addMembersMutation.isPending,
    isRemovingMembers: removeMembersMutation.isPending,
    isDeletingConversation: deleteConversationMutation.isPending,
    contactError: createContactMutation.error,
    groupError: createConversationMutation.error,
    addMembersError: addMembersMutation.error,
    removeMembersError: removeMembersMutation.error,
    deleteError: deleteConversationMutation.error,
  };
};
