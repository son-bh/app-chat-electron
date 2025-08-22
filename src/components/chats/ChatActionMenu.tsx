import { forwardRef, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { TaskIcon, TrashBinIcon } from "@/icons";
import { Chat } from "@/types";
import { getDisplayNameConversation } from "@/shared/utils/chat";
import { useDeleteConversationMutation } from "@/services";
import { ConfirmDeleteChatModal } from "@/pages/Chat/components/ConfirmDeleteChatModal";

interface ContextMenu {
  title: string;
  icon: ReactNode;
  className?: string;
  action?: () => void;
}

interface IChatActionMenuProps {
  chatDetail: Chat;
  position: { x: number; y: number };
  currentChatId?: string;
  handleCloseMenu: () => void;
  handleDeleteSuccess: (id: string) => void;
}

const ChatActionMenu = forwardRef<HTMLUListElement, IChatActionMenuProps>(
  (
    {
      chatDetail,
      position,
      currentChatId,
      handleCloseMenu,
      handleDeleteSuccess,
    }: IChatActionMenuProps,
    ref
  ) => {
    const navigate = useNavigate();

    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    const deleteConversationMutation = useDeleteConversationMutation();

    const handleOpenInNewTab = () => {
      if (chatDetail) {
        const url = `/message/${chatDetail.conversationId}`;
        window.open(url, "_blank");
      }
      handleCloseMenu();
    };

    // const handlePin = () => {
    //   if (chatDetail) {
    //     console.log("Pinning chat:", chatDetail.conversationId);
    //   }
    //   handleCloseMenu();
    // };

    const handleDeleteClick = () => {
      setShowConfirmDelete(true);
    };

    const subMenus: Array<ContextMenu> = [
      {
        title: "Mở bằng trình duyệt mới",
        icon: <TaskIcon className="size-5 mr-2" />,
        action: handleOpenInNewTab,
      },
      // {
      //   title: "Pin",
      //   icon: <PinIcon className="size-5 mr-2" />,
      //   action: handlePin,
      // },
      {
        title: "Xoá tin nhắn",
        icon: <TrashBinIcon className="size-5 mr-2 text-red-500" />,
        action: handleDeleteClick,
        className:
          "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
      },
    ];

    const handleConfirmDelete = () => {
      if (!chatDetail) return;

      deleteConversationMutation.mutate(
        {
          conversationId: chatDetail.conversationId,
        },
        {
          onSuccess: () => {
            setShowConfirmDelete(false);
            handleDeleteSuccess(chatDetail.conversationId);
            handleCloseMenu();

            if (chatDetail.conversationId === currentChatId) {
              navigate(-1);
            }
          },
        }
      );
    };

    const handleCancelDelete = () => {
      setShowConfirmDelete(false);
      handleCloseMenu();
    };

    return (
      <>
        {createPortal(
          <ul
            ref={ref}
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-2 w-fit overflow-hidden z-[9999] shadow-lg"
            style={{
              top: position.y,
              left: position.x,
            }}
          >
            {subMenus.map((menu, idx) => (
              <li
                key={idx}
                className={`px-4 py-2 hover:text-blue-400 cursor-pointer flex items-center transition-colors ${
                  menu.className || "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={menu.action}
              >
                {menu.icon}
                <span className="text-sm">{menu.title}</span>
              </li>
            ))}
          </ul>,
          document.body
        )}

        <ConfirmDeleteChatModal
          isOpen={showConfirmDelete}
          isLoading={deleteConversationMutation.isPending}
          chatTitle={getDisplayNameConversation(chatDetail, "") as string}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </>
    );
  }
);
export default ChatActionMenu;
