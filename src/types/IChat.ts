export interface Chat {
    _id: string;
    conversationId: string;
    userId: string;
    role: "OWNER" | "ADMIN" | "MEMBER";
    lastReadAt: string;
    unreadCount: number;
    joinedAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    conversation: {
        type: "GROUP" | "DIRECT";
        title?: string;
        createdBy: string;
        receiverId?: string;
        lastMessage?: string;
        lastMessageAt?: string;
    };

    lastMessage?: {
        type: "TEXT" | "IMAGE" | "FILE";
        text?: string;
        createdAt: string;
    };

    createdBy: {
        username: string;
        email: string;
        online: boolean;
        fullname: string;
    };

    receiverId?: {
        username: string;
        email: string;
        online: boolean;
        fullname: string;
    };
}
// export interface Chat {
//     _id: string;
//     conversationId: string;
//     type: string;
//     text: string;
//     isEdited: boolean;
//     isPin: boolean;
//     isDeleted: boolean;
//     createdAt: string;
//     updatedAt: string;
//     senderId: {
//         _id: string;
//         username: string;
//         status: string;
//     };
// }
export interface ChatItemProps {
    chat: Chat;
    showMenu: boolean;
    handleDeleteSuccess: (id: string) => void;
    handleShowMenu: (chat: Chat, x: number, y: number) => void;
}

export interface ChatSidebarProps {
    chats?: Chat[];
    onChatSelect?: (chatId: string) => void;
}

export interface ChatHeaderProps {
    handleOpenDrawer: () => void;
    searchTerm?: string;
    onSearchChange: (term: string) => void;
    // openModalCreate?: () => void
}

export interface IConvarsationPayLoad {
    title: string;
    userIds: string[];
}

export interface IAddMemberForConvarsationPayLoad {
    conversationId: string;
    userIds: string[];
}


export interface IRemoveMemberForConvarsationPayLoad {
    conversationId: string;
    userId: string;
}
