import { Chat } from "@/types";
import { format, isThisWeek, isToday } from "date-fns";

import { vi } from "date-fns/locale";
import { AVATAR_COLORS } from "../constants";

export const formatSendTimeConversation = (time: string) => {
  const date = new Date(time);

  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, "EEEE", { locale: vi });
  }

  return format(date, "dd/MM/yyyy");
};

export const getDisplayNameConversation = (
  chatData: Chat,
  currentUsername: string
) => {
  const { conversation, createdBy, receiverId } = chatData || {};
  const { type, title } = conversation || {};
  const { username: receiverUsername, fullname: receiverFullname } =
    receiverId || {};
  const { username: createdUsername, fullname: createdFullname } =
    createdBy || {};
  const isGroupChat = type === "GROUP";
  let name = createdFullname || createdUsername;

  if (isGroupChat) {
    return title;
  }

  if (currentUsername === createdUsername) {
    name = receiverFullname || receiverUsername || "Unknown User";
  }

  return name?.replace("@", "");
};

export const formatChatDetail = (chatData: Chat, currentUsername: string) => {
  const { conversation, lastMessage, conversationId } = chatData;
  const isGroupChat = conversation.type === "GROUP";
  const displayName = getDisplayNameConversation(chatData, currentUsername);
  const createdByName = (
    chatData.createdBy.fullname || chatData.createdBy.username
  ).replace("@", "");

  const avatar = isGroupChat
    ? (displayName || "Group")
        .split(" ")
        .map((word: any) => word[0])
        .join("")
    : (displayName || "U").replace("@", "");

  const lastMessageDisplay = isGroupChat
    ? lastMessage
      ? `${createdByName}: ${lastMessage.text}`
      : `${createdByName} đã tạo nhóm`
    : lastMessage?.text || "Bắt đầu cuộc trò chuyện";

  const isOnline = isGroupChat
    ? chatData.createdBy.online
    : chatData.receiverId?.online || false;

  const avatarBgColor =
    AVATAR_COLORS[
      parseInt(conversationId.slice(-1), 16) % AVATAR_COLORS.length
    ];

  return {
    isGroupChat,
    avatar: avatar.slice(0, 2).toUpperCase(),
    displayName,
    lastMessageDisplay,
    isOnline,
    avatarBgColor,
  };
};
