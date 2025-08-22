import { IUser } from "./IUser";

export interface Emoji {
  id: string;
  name: string;
  native: string;
  keywords: string[];
  shortcodes: string;
  skin: number | null;
  version: number;
}

export interface Message {
  id: number;
  type: MessageType;
  content: string;
  sender: string;
  time: string;
  isOwn: boolean;
}

export interface ISendMessagePayload {
  receiverId: string;
  type: TYPE_FILE_MESS;
  text: string;
  pathFile?: string;
}

export interface ISendMessageGroupPayload {
  conversationId: string;
  type: TYPE_FILE_MESS;
  text: string;
  pathFile?: string;
}

export interface IMessage {
  conversationId: string;
  createdAt: string;
  isDeleted: boolean;
  isEdited: boolean;
  isPin: boolean;
  pathFile?: string;
  senderId: {
    status?: string;
    username: string;
    _id: string;
  };
  text: string;
  type: TYPE_FILE_MESS;
  _id: string;
}

export interface IConversationDetail {
  conversation: { type: "DIRECT" | "GROUP"}
  totalFile: number;
  totalImage: number;
  totalVideo: number;
  users: Array<IUser> | IUser;
}

export type MessageType = "text" | "image" | "video" | "file";

export type TYPE_FILE_MESS = "TEXT" | "IMAGE" | "FILE" | "VIDEO";