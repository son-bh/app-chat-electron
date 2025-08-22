import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Drawer from "../ui/drawer";
import { BellIcon, ImageIcon, InfoWhiteIcon, UserIcon } from "@/icons";
import Switch from "../form/switch/Switch";
import { IoArrowBackSharp, IoRemove } from "react-icons/io5";
import { useNavigate } from "react-router";
import { AVATAR_COLORS } from "@/shared/constants";
import { MdDelete, MdGroup, MdGroupAdd } from "react-icons/md";
import UserBox from "./UserBox";
import { useChatActions } from "@/hooks/useChatActions";
import { useModal } from "@/hooks/useModal";
import { FaLink } from "react-icons/fa6";
import { ConfirmDeleteChatModal } from "@/pages/Chat/components/ConfirmDeleteChatModal";
import CreateChatModal from "@/pages/Chat/components/CreateChatModal";
import { PinMessages } from "./PinMessages";
import { ContextMenu, IUser } from "@/types";
import { createPortal } from "react-dom";
import ConfirmRemoveModal from "../ui/modal/ConfirmRemoveUser";

interface ChatBoxHeaderProps {
  currentChat: any;
  conversationId: string;
}

interface ChatInfo {
  type: "GROUP" | "DIRECT";
  title: string;
  subtitle: string;
  avatar: string;
  avatarColor: string;
  isOnline: boolean;
  phone: string | null;
  username: string | null;
  users: any;
  fullname: string;
  totalFile: number;
  totalImage: number;
  totalVideo: number;
}

type TabType = "PROFILE" | "PIN_MESSAGE";

const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = ({
  currentChat,
  conversationId,
}) => {
  const {
    isOpen: isConfirmDelete,
    openModal: openModalConfirmDelete,
    closeModal: closeModalConfirmDelete,
  } = useModal();
  const {
    isOpen: isConfirmRemove,
    openModal: openModalConfirmRemove,
    closeModal: closeModalConfirmRemove,
  } = useModal();
  const {
    isOpen: isOpenCreate,
    closeModal: closeModalCreate,
    openModal: openModalCreate,
  } = useModal();

  const navigate = useNavigate();
  const {
    createContact,
    deleteConversation,
    isDeletingConversation,
    removeMembers,
  } = useChatActions();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const userMenus = useMemo<Array<ContextMenu>>(
    () => [
      { title: "Xem hồ sơ", icon: <UserIcon className="size-4 mr-2" /> },
      {
        title: "Xóa khỏi nhóm",
        icon: <IoRemove className="size-4 mr-2" />,
        action: openModalConfirmRemove,
      },
    ],
    [openModalConfirmRemove]
  );

  const handleRemoveMembers = useCallback(async () => {
    if (!currentChat || !conversationId || !selectedUser) return;

    try {
      await removeMembers({
        conversationId,
        userId: selectedUser._id,
        onSuccess: () => {
          closeModalConfirmRemove();
          setSelectedUser(null);
        },
        onError: (error: any) => {
          console.error("Error removing members:", error);
        },
      });
    } catch (error) {
      console.error("Error removing members:", error);
    }
  }, [
    currentChat,
    conversationId,
    selectedUser,
    removeMembers,
    closeModalConfirmRemove,
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleContextMenu = useCallback((e: React.MouseEvent, user: IUser) => {
    e.preventDefault();
    setSelectedUser(user);
    setPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  }, []);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [tab, setTab] = useState<TabType>("PROFILE");

  const chatInfo = useMemo((): ChatInfo | null => {
    if (!currentChat) return null;

    const avatarBgColor =
      AVATAR_COLORS[
        parseInt(conversationId.slice(-1), 16) % AVATAR_COLORS.length
      ];

    const isGroupChat = currentChat.conversation?.type === "GROUP";
    const { totalFile = 0, totalImage = 0, totalVideo = 0 } = currentChat;

    if (isGroupChat) {
      const title = currentChat.conversation?.title || "Group Chat";
      return {
        type: "GROUP",
        title,
        subtitle: `${currentChat.users?.length || 0} thành viên`,
        avatar: title.slice(0, 2).toUpperCase() || "GR",
        avatarColor: avatarBgColor,
        isOnline: false,
        phone: null,
        username: null,
        users: currentChat.users,
        fullname: title,
        totalFile,
        totalImage,
        totalVideo,
      };
    }

    if (!currentChat.users) return null;

    const user = currentChat.users;
    const title = user.fullname || user.username;

    return {
      type: "DIRECT",
      title,
      subtitle: user.online ? "Đang hoạt động" : "Offline",
      avatar:
        user.username?.slice(1, 3).toUpperCase() ||
        user.username?.slice(0, 2).toUpperCase() ||
        "UN",
      isOnline: user.online,
      avatarColor: avatarBgColor,
      phone: user.phone,
      username: user.username,
      users: user,
      fullname: user.fullname,
      totalFile,
      totalImage,
      totalVideo,
    };
  }, [currentChat, conversationId]);

  const handleConfirmDelete = useCallback(async () => {
    if (!conversationId) return;

    try {
      await deleteConversation({
        conversationId,
        onSuccess: () => {
          setOpenDrawer(false);
          closeModalConfirmDelete();
          navigate("/");
        },
        onError: (error: any) => {
          console.error("Error deleting conversation:", error);
        },
      });
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  }, [conversationId, deleteConversation, closeModalConfirmDelete, navigate]);

  const handleCreateContactChat = useCallback(
    (receiverId: string) => {
      createContact({ receiverId });
    },
    [createContact]
  );

  const handleUserToggle = useCallback(
    (userId: string) => {
      setOpenDrawer(false);
      handleCreateContactChat(userId);
    },
    [handleCreateContactChat]
  );

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleOpenProfileDrawer = useCallback(() => {
    setOpenDrawer(true);
    setTab("PROFILE");
  }, []);

  const handleOpenPinMessageDrawer = useCallback(() => {
    setOpenDrawer(true);
    setTab("PIN_MESSAGE");
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    closeModalCreate();
    setOpenDrawer(false);
  }, [closeModalCreate]);

  const existingUserIds = useMemo(() => {
    if (chatInfo?.type === "GROUP" && chatInfo.users) {
      return chatInfo.users.map((u: any) => u.userId._id);
    }
    return [];
  }, [chatInfo]);

  const renderAvatar = useCallback(
    (info: ChatInfo) => (
      <div className="relative">
        <div
          className={`w-10 h-10 rounded-full ${info.avatarColor} flex items-center justify-center text-white font-semibold`}
        >
          {info.avatar}
        </div>
        {info.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
        )}
      </div>
    ),
    []
  );

  const renderProfileHeader = useCallback(
    (info: ChatInfo) => (
      <div className="flex justify-between items-center px-4 bg-white py-6">
        <div className="flex">
          <button onClick={handleCloseDrawer} className="hover:text-gray-500">
            <IoArrowBackSharp className="size-5" />
          </button>
          <h3 className="font-semibold ml-4">
            {tab === "PIN_MESSAGE"
              ? "Tin nhắn đã ghim"
              : info.type === "GROUP"
                ? "Thông tin nhóm"
                : "Thông tin cá nhân"}
          </h3>
        </div>
      </div>
    ),
    [handleCloseDrawer, tab]
  );

  const renderProfileInfo = useCallback(
    (info: ChatInfo) => (
      <div className="flex items-center gap-6 py-6 px-4 bg-white shadow-sm">
        <div
          className={`rounded-full h-18 w-18 overflow-hidden flex items-center justify-center ${info.avatarColor}`}
        >
          <span className="text-2xl font-bold text-white">{info.avatar}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">{info.title}</h4>
          <p className="text-xs text-[#AAAAAA]">{info.subtitle}</p>
        </div>
      </div>
    ),
    []
  );

  const renderDirectChatDetails = useCallback(
    (info: ChatInfo) => (
      <>
        <div className="mt-3 bg-white text-sm">
          <div className="flex items-start gap-8 border-b p-4">
            <InfoWhiteIcon className="size-5 text-[#AAAAAA] mt-2" />
            <div className="flex flex-col gap-2">
              <div>
                <p>{info.phone || "-"}</p>
                <p className="text-[#AAAAAA] text-xs">Phone</p>
              </div>
              <div>
                <p>{info.username}</p>
                <p className="text-[#AAAAAA] text-xs">Username</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className="flex items-start hover:bg-gray-50 gap-8 p-4">
              <BellIcon className="size-5 text-[#AAAAAA]" />
              <div className="flex justify-between w-full">
                <p>Thông báo</p>
                <Switch color="blue" />
              </div>
            </div>
            <div
              onClick={() => handleUserToggle(info.users._id)}
              className="hover:bg-gray-50 p-4 cursor-pointer"
            >
              <p className="text-blue-500 px-14 uppercase font-semibold">
                Gửi tin nhắn
              </p>
            </div>
          </div>
        </div>
      </>
    ),
    [handleUserToggle]
  );

  const renderGroupChatDetails = useCallback(
    (info: ChatInfo) => (
      <div className="mt-3 bg-white shadow-sm py-2">
        <div className="flex items-center gap-8 p-4 hover:bg-gray-50 cursor-pointer">
          <MdGroup className="size-7" />
          <div className="flex justify-between items-center w-full">
            <p className="text-sm uppercase font-semibold">{info.subtitle}</p>
            <MdGroupAdd onClick={openModalCreate} className="size-5" />
          </div>
        </div>
        <div className="max-h-[calc(100vh-405px)] overflow-y-auto custom-scrollbar">
          {info.users?.map((user: any) => (
            <UserBox
              onContextMenu={(e) => handleContextMenu(e, user.userId)}
              key={user._id}
              user={user.userId}
              role={user.role}
              onUserToggle={handleUserToggle}
              showOnlineStatus={true}
              showTeamBadge={true}
            />
          ))}
        </div>
        {showMenu &&
          createPortal(
            <ul
              ref={menuRef}
              className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-2 w-fit overflow-hidden z-[9999] shadow-lg"
              style={{
                top: position.y,
                left: position.x,
              }}
            >
              {userMenus.map((menu, idx) => (
                <li
                  key={idx}
                  className={`px-4 py-2 hover:text-blue-400 cursor-pointer flex items-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-700`}
                  onClick={menu.action}
                >
                  {menu.icon}
                  <span className="text-sm">{menu.title}</span>
                </li>
              ))}
            </ul>,
            document.body
          )}
      </div>
    ),
    [
      openModalCreate,
      showMenu,
      position.y,
      position.x,
      userMenus,
      handleUserToggle,
      handleContextMenu,
    ]
  );

  const renderMediaStats = useCallback(
    (info: ChatInfo) => (
      <div className="mt-3 bg-white text-sm shadow-sm">
        <div className="py-2">
          <div className="flex items-start hover:bg-gray-50 gap-8 p-4 cursor-pointer">
            <ImageIcon className="size-5 text-[#AAAAAA]" />
            <p>{info.totalImage} hình ảnh</p>
          </div>
          <div className="flex items-start hover:bg-gray-50 gap-8 p-4 cursor-pointer">
            <FaLink className="size-5 text-[#AAAAAA]" />
            <p>{info.totalFile} tệp đính kèm</p>
          </div>
        </div>
      </div>
    ),
    []
  );

  const renderProfileTab = useCallback(
    (info: ChatInfo) => (
      <div>
        {renderProfileInfo(info)}
        {info.type === "DIRECT" && renderDirectChatDetails(info)}
        {renderMediaStats(info)}
        {info.type === "DIRECT" && (
          <div className="mt-3 bg-white text-sm">
            <div className="py-2">
              <div
                onClick={openModalConfirmDelete}
                className="flex items-start hover:bg-gray-50 text-red-500 gap-8 p-4 cursor-pointer"
              >
                <MdDelete className="size-5" />
                <p>Xóa tin nhắn</p>
              </div>
            </div>
          </div>
        )}
        {info.type === "GROUP" && renderGroupChatDetails(info)}
      </div>
    ),
    [
      renderProfileInfo,
      renderDirectChatDetails,
      renderMediaStats,
      renderGroupChatDetails,
      openModalConfirmDelete,
    ]
  );

  if (!chatInfo) return null;

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <IoArrowBackSharp
            onClick={handleBackClick}
            className="text-gray-400 w-6 h-6 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors lg:hidden block"
          />
          <div
            onClick={handleOpenProfileDrawer}
            className="flex items-center gap-3 cursor-pointer"
          >
            {renderAvatar(chatInfo)}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {chatInfo.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chatInfo.subtitle}
              </p>
            </div>
          </div>
        </div>

        <button
          className="text-left border border-[#8774E1] text-[#8774E1] rounded-md py-2 px-4 font-semibold hover:bg-[#8774E1] hover:text-white transition-colors"
          onClick={handleOpenPinMessageDrawer}
        >
          Ghim tin nhắn
        </button>
      </div>

      <Drawer
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        side="right"
        title="Filters"
        wContainer="sm:w-[380px] w-full"
        className="!bg-gray-100 overflow-y-hidden"
      >
        {renderProfileHeader(chatInfo)}
        {tab === "PROFILE" && renderProfileTab(chatInfo)}
        {tab === "PIN_MESSAGE" && conversationId && (
          <PinMessages conversationId={conversationId} />
        )}
      </Drawer>

      {isConfirmDelete && (
        <ConfirmDeleteChatModal
          isOpen={isConfirmDelete}
          chatTitle={chatInfo.title}
          onConfirm={handleConfirmDelete}
          onCancel={closeModalConfirmDelete}
          isLoading={isDeletingConversation}
        />
      )}

      {isOpenCreate && (
        <CreateChatModal
          type="add"
          closeModal={handleCloseCreateModal}
          isOpen={isOpenCreate}
          existingUserIds={existingUserIds}
          conversationId={conversationId}
          closeDrawer={handleCloseDrawer}
        />
      )}

      {isConfirmRemove && (
        <ConfirmRemoveModal
          isOpen={isConfirmRemove}
          closeModal={closeModalConfirmRemove}
          confirm={handleRemoveMembers}
          username={selectedUser?.username}
        />
      )}
    </>
  );
};

export default ChatBoxHeader;
