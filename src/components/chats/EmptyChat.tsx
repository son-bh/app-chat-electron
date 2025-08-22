import React from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const EmptyChat: React.FC = () => {
  return (
    <div className="flex-1 flex items-center h-screen justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600">
          <HiOutlineChatBubbleLeftRight className="w-full h-full" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Chào mừng đến với Chat nội bộ
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin với
          đồng nghiệp của bạn.
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;
