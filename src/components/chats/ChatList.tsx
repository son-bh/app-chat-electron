import { memo, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import ChatItem from "./ChatItem";
import SideBarHeader from "./SideBarHeader";
import { useChatSearch } from "@/hooks/useChatSearch";
import { useQueryGetConversation } from "@/services";
import { useSidebar } from "@/context/SidebarContext";
import { Chat } from "@/types";
import { useSocketEvent } from "@/hooks/useSocketEvent";
import useUserStore from "@/store/userStore";
import ChatActionMenu from "./ChatActionMenu";
import { useChatNavigation } from "@/hooks/useChatNavigation";
import { useReadMessageMutation } from "@/services/message";

interface ChatListProps {
  handleOpenDrawer: () => void;
}

const ChatList = ({ handleOpenDrawer }: ChatListProps) => {
  const { currentChatId } = useChatNavigation();

  const menuRef = useRef<HTMLUListElement>(null);

  const userInfo = useUserStore((state) => state.userInfo);
  const { isExpanded } = useSidebar();

  const [chatList, setChatList] = useState<Array<Chat>>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const { data: conversationData } = useQueryGetConversation();
  const readMessageMutation = useReadMessageMutation();

  const { filteredChats, setSearchTerm } = useChatSearch(chatList);

  const handleNewChat = (chatData: Chat) => {
    console.log("🚀 ~ handleNewChat ~ chatData:", chatData);
    const isFocusChat = currentChatId === chatData?.conversationId;
    const currentChat = chatList.find(
      (chatItem) => chatItem.conversationId === chatData._id
    );
    const chatListTmp = chatList.filter(
      (chatItem) => chatItem.conversationId !== chatData._id
    );
    const isReceiver = chatData.receiverId?.username === userInfo.username;

    const unreadCount = isFocusChat && isReceiver ? 0 : chatData.unreadCount;
    const newChat = { ...currentChat, ...chatData, unreadCount };

    if (isFocusChat && isReceiver) {
      readMessageMutation.mutate({ conversationId: currentChatId as string });
    }

    setChatList([newChat, ...chatListTmp]);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const isModalExists = document.getElementById("modal");

    if (isModalExists) return;

    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setShowMenu(false);
      setSelectedChat(null);
    }
  };

  useSocketEvent(`newMessage_${userInfo._id}`, handleNewChat);

  useEffect(() => {
    setChatList(conversationData?.data);
  }, [conversationData?.data]);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return;
    }
    document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleDeleteSuccess = useCallback((id: string) => {
    setChatList((prev) => prev.filter((item) => item.conversationId !== id));
  }, []);

  const handleShowMenu = (selectedChat: Chat, x: number, y: number) => {
    const menuHeight = 134;
    const maxMenuHeight = y + menuHeight;
    const isOutSide = maxMenuHeight > window.innerHeight;
    const maxY = isOutSide ? y - menuHeight : y;

    setShowMenu(true);
    setSelectedChat(selectedChat);
    setPosition({ x, y: maxY });
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
    setSelectedChat(null);
  };

  return (
    <>
      <SideBarHeader
        onSearchChange={setSearchTerm}
        handleOpenDrawer={handleOpenDrawer}
      />
      <div
        className={classNames("flex-1 overflow-y-auto", {
          "pointer-events-none": showMenu,
        })}
      >
        <div className={`p-2 ${!isExpanded && "space-y-3"}`}>
          {filteredChats?.map((chat) => (
            <div
              key={chat._id}
              className={classNames({
                "bg-gray-100": chat?._id === selectedChat?._id,
              })}
            >
              <ChatItem
                showMenu={showMenu}
                chat={chat}
                handleDeleteSuccess={handleDeleteSuccess}
                handleShowMenu={handleShowMenu}
              />
            </div>
          ))}
        </div>
      </div>
      {showMenu && (
        <ChatActionMenu
          ref={menuRef}
          currentChatId={currentChatId as string}
          chatDetail={selectedChat as Chat}
          position={position}
          handleCloseMenu={handleCloseMenu}
          handleDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
};

export default memo(ChatList);
