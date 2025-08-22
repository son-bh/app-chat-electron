import { Chat } from "@/types";
import { useState, useMemo } from "react";

export const useChatSearch = (chats: Chat[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = useMemo(() => {
    if (!searchTerm) return chats;

    return chats.filter((chat) => {
      const search = searchTerm.toLowerCase();

      const chatTitle = (chat.conversation.title || "").toLowerCase();

      const lastMessageText = (chat.lastMessage?.text || "").toLowerCase();

      const creatorUsername = chat.createdBy.username.toLowerCase();

      const receiverUsername = (chat.receiverId?.username || "").toLowerCase();

      return (
        chatTitle.includes(search) ||
        lastMessageText.includes(search) ||
        creatorUsername.includes(search) ||
        receiverUsername.includes(search)
      );
    });
  }, [chats, searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredChats,
    clearSearch,
    hasSearchTerm: searchTerm.length > 0,
  };
};
