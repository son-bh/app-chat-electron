import { useLocation, useNavigate } from 'react-router-dom';

export const useChatNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getCurrentChatId = (): string | null => {
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'message' && pathParts[2]) {
            return pathParts[2];
        }
        return null;
    };

    const navigateToChat = (conversationId: string) => {
        navigate(`/message/${conversationId}`);
    };

    const isCurrentChat = (conversationId: string): boolean => {
        return getCurrentChatId() === conversationId;
    };

    return {
        getCurrentChatId,
        navigateToChat,
        isCurrentChat,
        currentChatId: getCurrentChatId()
    };
};