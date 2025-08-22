import { Chat, ChatItemProps } from "@/types";
import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useChatNavigation } from "@/hooks/useChatNavigation";
import isEqual from "lodash/isEqual";
import {
  formatChatDetail,
  formatSendTimeConversation,
} from "@/shared/utils/chat";
import useUserStore from "@/store/userStore";
const MAX_UNREAD_DISPLAY = 99;
const GROUP_ICON_PATH =
  "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z";
const GROUP_ICON_PATH_2 =
  "M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z";
const CHECK_ICON_PATH = "M5 13l4 4L19 7";

const GroupIcon = React.memo(() => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d={GROUP_ICON_PATH} />
    <path d={GROUP_ICON_PATH_2} />
  </svg>
));

const CheckIcon = React.memo(() => (
  <svg
    className="w-4 h-4 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={CHECK_ICON_PATH}
    />
  </svg>
));

const OnlineIndicator = React.memo(() => (
  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
));

const UnreadBadge = React.memo(
  ({
    count,
    variant = "normal",
  }: {
    count: number;
    variant?: "normal" | "collapsed";
  }) => {
    const displayCount = count > MAX_UNREAD_DISPLAY ? "99+" : count;
    const baseClasses =
      "text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1";
    const variantClasses =
      variant === "collapsed"
        ? "absolute -top-1 -right-1 bg-red-500"
        : "ml-2 bg-blue-500 flex-shrink-0";

    return (
      <div className={`${baseClasses} ${variantClasses}`}>{displayCount}</div>
    );
  }
);

const ChatAvatar = React.memo(
  ({
    avatar,
    bgColor,
    isOnline,
    unreadCount,
    isCollapsed,
    isActive,
  }: {
    avatar: string;
    bgColor: string;
    isOnline: boolean;
    unreadCount: number;
    isCollapsed: boolean;
    isActive: boolean;
  }) => {
    const containerClasses = isCollapsed
      ? `relative w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer transition-colors hover:opacity-80 mx-auto ${bgColor} ${
          isActive ? "ring-2 ring-blue-500" : ""
        }`
      : `w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${bgColor}`;

    return (
      <div className={containerClasses}>
        {avatar}
        {isOnline && <OnlineIndicator />}
        {isCollapsed && unreadCount > 0 && (
          <UnreadBadge count={unreadCount} variant="collapsed" />
        )}
      </div>
    );
  }
);

const ChatItem: React.FC<ChatItemProps> = ({ chat, handleShowMenu }) => {
  const { isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const { currentChatId, navigateToChat } = useChatNavigation();
  const userInfo = useUserStore((state) => state.userInfo);

  const [unreadCount, setUnreadCount] = useState<number>(chat.unreadCount);

  const isActive = useMemo(
    () => currentChatId === chat.conversationId,
    [chat.conversationId, currentChatId]
  );
  const chatData = useMemo(
    () => formatChatDetail(chat, userInfo.username),
    [chat, userInfo.username]
  );

  useEffect(() => {
    setUnreadCount(chat.unreadCount);
  }, [chat.unreadCount]);

  const handleClick = useCallback(() => {
    setUnreadCount(0);
    navigateToChat(chat.conversationId);

    if (isMobileOpen) toggleMobileSidebar();
  }, [isMobileOpen, chat.conversationId, navigateToChat, toggleMobileSidebar]);

  const handleContextMenu = (e: React.MouseEvent, chat: Chat) => {
    e.preventDefault();
    e.stopPropagation();

    handleShowMenu(chat, e.clientX, e.clientY);
  };

  if (!isExpanded) {
    return (
      <div onClick={handleClick}>
        <ChatAvatar
          avatar={chatData.avatar}
          bgColor={chatData.avatarBgColor}
          isOnline={chatData.isOnline}
          unreadCount={unreadCount}
          isCollapsed={true}
          isActive={isActive}
        />
      </div>
    );
  }

  return (
    <div onContextMenu={(e) => handleContextMenu(e, chat)}>
      <div
        onClick={handleClick}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isActive ? "bg-blue-50 dark:bg-blue-900/20" : ""
        }`}
      >
        <div className="relative">
          <ChatAvatar
            avatar={chatData.avatar}
            bgColor={chatData.avatarBgColor}
            isOnline={chatData.isOnline}
            unreadCount={unreadCount}
            isCollapsed={false}
            isActive={isActive}
          />
        </div>

        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {chatData.isGroupChat && (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <GroupIcon />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {chatData.displayName}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {chat.lastMessage && <CheckIcon />}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatSendTimeConversation(
                  chat.conversation.lastMessageAt ||
                    chat.lastMessage?.createdAt ||
                    chat.createdAt
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1">
              {chatData.lastMessageDisplay}
            </p>
            {unreadCount > 0 && <UnreadBadge count={unreadCount} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatItem, isEqual);
