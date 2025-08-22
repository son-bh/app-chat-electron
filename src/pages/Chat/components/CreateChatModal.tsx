import React, { useMemo, useState, useCallback } from "react";
import { Modal } from "@/components/ui/modal";
import { CloseIcon, SearchIcon } from "@/icons";
import { FaCamera } from "react-icons/fa";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import { IoCloseOutline } from "react-icons/io5";
import { useQueryGetUsers } from "@/services";
import { ITypeChat, IUser } from "@/types";
import { useDebounce } from "use-debounce";
import useUserStore from "@/store/userStore";
import { AVATAR_COLORS } from "@/shared/constants";
import UserBox from "@/components/chats/UserBox";
import { useChatActions } from "@/hooks/useChatActions";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  type: ITypeChat;
  existingUserIds?: string[];
  conversationId?: string;
  closeDrawer?: () => void;
}

const MAX_GROUP_MEMBERS = 200000;
const STEP = { FIRST: 1, SECOND: 2 } as const;

export default function CreateChatModal({
  isOpen,
  closeModal,
  type,
  existingUserIds = [],
  conversationId,
  closeDrawer,
}: Props) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(STEP.FIRST);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const currentUserId = useUserStore((state) => state.userInfo);
  const {
    createContact,
    createGroup,
    addMembers,
    isCreatingContact,
    isCreatingGroup,
    isAddingMembers,
  } = useChatActions();

  const { data: getUsersResponse } = useQueryGetUsers({
    searchKeyword: debouncedSearchTerm,
    isFull: true,
  });

  // Memoized filtered users
  const users: IUser[] = useMemo(() => {
    const rawUsers = getUsersResponse?.data || [];
    return rawUsers.filter((user) => user._id !== currentUserId?._id);
  }, [getUsersResponse?.data, currentUserId?._id]);

  // Memoized selected users data
  const selectedUsersData = useMemo(() => {
    const allSelectedIds = [...existingUserIds, ...selectedUsers];
    return users.filter((user) => allSelectedIds.includes(user._id));
  }, [users, selectedUsers, existingUserIds]);

  // Memoized avatar utilities
  const avatarUtils = useMemo(
    () => ({
      getBgColor: (user: IUser) => {
        const index = parseInt(user._id.slice(-1), 16) % AVATAR_COLORS.length;
        return AVATAR_COLORS[index];
      },
      getContent: (user: IUser, bgColor: string) => {
        const initials = user.username
          .replace("@", "")
          .slice(0, 2)
          .toUpperCase();
        return (
          <div
            className={`w-full h-full ${bgColor} flex items-center justify-center text-white font-medium`}
          >
            {initials}
          </div>
        );
      },
    }),
    []
  );

  // Reset form state
  const resetForm = useCallback(() => {
    setCurrentStep(STEP.FIRST);
    setGroupName("");
    setSearchTerm("");
    setSelectedUsers([]);
  }, []);

  const handleCloseModal = useCallback(() => {
    resetForm();
    closeModal();
  }, [resetForm, closeModal]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (groupName.trim()) setCurrentStep(STEP.SECOND);
  }, [groupName]);

  const handleBack = useCallback(() => {
    setCurrentStep(STEP.FIRST);
  }, []);

  // Chat actions
  const handleCreateContactChat = useCallback(
    async (receiverId: string) => {
      createContact({
        receiverId,
        onSuccess: handleCloseModal,
        onError: (error) => console.error("Failed to create contact:", error),
      });
    },
    [createContact, handleCloseModal]
  );

  const handleCreateGroup = useCallback(async () => {
    createGroup({
      title: groupName,
      userIds: selectedUsers,
      onSuccess: handleCloseModal,
      onError: (error) => console.error("Failed to create group:", error),
    });
  }, [groupName, selectedUsers, createGroup, handleCloseModal]);

  const handleAddMembers = useCallback(async () => {
    if (!conversationId) return;

    addMembers({
      conversationId,
      userIds: selectedUsers,
      onSuccess: () => {
        handleCloseModal();
        closeDrawer?.();
      },
      onError: (error) => console.error("Error adding members:", error),
    });
  }, [
    conversationId,
    selectedUsers,
    addMembers,
    handleCloseModal,
    closeDrawer,
  ]);

  // User selection handlers
  const handleUserToggle = useCallback(
    (userId: string) => {
      if (type === "new") {
        handleCreateContactChat(userId);
        return;
      }
      setSelectedUsers((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    },
    [type, handleCreateContactChat]
  );

  const handleRemoveUser = useCallback(
    (userId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    },
    []
  );

  const clearSearch = useCallback(() => setSearchTerm(""), []);

  // Memoized components
  const SearchInput = useMemo(
    () => (
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          endAdornment={
            searchTerm && (
              <IoCloseOutline
                onClick={clearSearch}
                className="text-gray-400 w-6 h-6 hover:text-blue-500 cursor-pointer transition-all duration-200"
              />
            )
          }
          type="text"
          placeholder={type === "new" ? "Search" : "Tìm kiếm người dùng..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-2 border-none !shadow-none outline-none border-gray-300"
        />
      </div>
    ),
    [searchTerm, type, clearSearch]
  );

  const SelectedUserChip = useCallback(
    ({ user }: { user: IUser }) => {
      const bgColor = avatarUtils.getBgColor(user);
      return (
        <div key={user._id} className="relative group">
          <div className="flex items-center gap-2 bg-gray-200 rounded-full">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              {avatarUtils.getContent(user, bgColor)}
            </div>
            <div className="pr-4 text-xs font-medium">
              {user.fullname || user.username}
            </div>
          </div>
          <button
            onClick={(e) => handleRemoveUser(user._id, e)}
            className="absolute hidden group-hover:flex inset-0 w-9 h-9 rounded-full items-center justify-center bg-blue-500 bg-opacity-90 transition-all duration-200"
          >
            <CloseIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      );
    },
    [avatarUtils, handleRemoveUser]
  );

  // Render methods
  const renderContactList = useCallback(
    () => (
      <div className="flex flex-col h-[550px]">
        <div className="border-b">{SearchInput}</div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {users.map((user) => (
              <UserBox
                key={user._id}
                user={user}
                onUserToggle={handleUserToggle}
                showOnlineStatus={true}
                showTeamBadge={true}
                disabled={isCreatingContact}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    [SearchInput, users, handleUserToggle, isCreatingContact]
  );

  const renderStep1 = useCallback(() => {
    const isLoading = isCreatingGroup;
    return (
      <div>
        <div className="flex items-center gap-3 mb-4 px-2 pt-4">
          <div className="w-18 h-18 bg-blue-400 rounded-full flex items-center justify-center mr-4">
            <FaCamera className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-blue-500 block">Tên nhóm</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full text-sm font-light outline-none border-b-2 border-blue-500 pb-2 bg-transparent"
              autoFocus
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="none"
            onClick={handleCloseModal}
            className="px-4 py-2 text-blue-500 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            variant="none"
            onClick={handleNext}
            disabled={!groupName.trim() || isLoading}
            className="px-4 py-2 text-blue-500 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    );
  }, [groupName, isCreatingGroup, handleCloseModal, handleNext]);

  const renderStep2 = useCallback(() => {
    const isLoading = isCreatingGroup || isAddingMembers;
    const hasSelectedUsers = selectedUsers.length > 0;

    return (
      <div className="flex flex-col h-[550px]">
        <div className="border-b">
          {hasSelectedUsers && (
            <div className="flex items-center flex-wrap max-h-22 overflow-y-auto custom-scrollbar gap-3 mb-3">
              {selectedUsersData.map((user) => (
                <SelectedUserChip key={user._id} user={user} />
              ))}
            </div>
          )}
          {SearchInput}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {users.map((user) => (
              <UserBox
                key={user._id}
                user={user}
                isSelected={selectedUsers.includes(user._id)}
                onUserToggle={handleUserToggle}
                showOnlineStatus={true}
                showTeamBadge={true}
                disabled={isLoading || existingUserIds.includes(user._id)}
              />
            ))}
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="flex justify-end gap-2">
            <Button
              variant="none"
              onClick={type === "add" ? handleCloseModal : handleBack}
              className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {type === "add" ? "Hủy" : "Trở lại"}
            </Button>
            <Button
              variant="none"
              onClick={type === "add" ? handleAddMembers : handleCreateGroup}
              disabled={!hasSelectedUsers || isLoading}
              isLoading={isLoading}
              className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {type === "add" ? "Thêm" : "Tạo"}
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    selectedUsersData,
    SearchInput,
    users,
    handleUserToggle,
    existingUserIds,
    type,
    handleCloseModal,
    handleBack,
    handleAddMembers,
    handleCreateGroup,
    isCreatingGroup,
    isAddingMembers,
    SelectedUserChip,
    selectedUsers,
  ]);

  const modalContent = useMemo(() => {
    switch (type) {
      case "new":
        return renderContactList();
      case "add":
        return renderStep2();
      default:
        return currentStep === STEP.FIRST ? renderStep1() : renderStep2();
    }
  }, [type, currentStep, renderContactList, renderStep1, renderStep2]);

  const modalTitle = useMemo(() => {
    if (type === "new") {
      return (
        <h4 className="sm:text-lg text-base font-medium text-gray-800">
          Liên hệ
        </h4>
      );
    }

    if (type === "add" || currentStep === STEP.SECOND) {
      const totalMembers = existingUserIds.length + selectedUsers.length;
      return (
        <h4 className="sm:text-lg text-base font-medium text-gray-800">
          Thêm thành viên
          <span className="text-xs pl-2 text-gray-500 font-normal">
            {totalMembers} / {MAX_GROUP_MEMBERS}
          </span>
        </h4>
      );
    }

    return undefined;
  }, [type, currentStep, selectedUsers.length, existingUserIds.length]);

  return (
    <Modal
      title={modalTitle}
      showCloseButton={false}
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="max-w-[380px]"
    >
      {modalContent}
    </Modal>
  );
}
