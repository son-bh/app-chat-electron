import React, { useEffect, useRef, useState } from "react";
// import OwnMessage from "./OwnMessage";
// import OtherMessage from "./OtherMessage";
import { motion, AnimatePresence } from "framer-motion";
import { PinIcon, ReplyIcon, TrashBinIcon } from "@/icons";
import { IMessage } from "@/types";
import useUserStore from "@/store/userStore";
import Message from "./Message";

interface ChatMessagesAreaProps {
  messages: Array<IMessage>;
}

const ChatMessagesArea: React.FC<ChatMessagesAreaProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<Array<string>>([]);
  const userInfo = useUserStore(state => state.userInfo);

  // Auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCancelSelect = () => {
    setIsSelecting(false);
    setSelectedMessages([]);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50 dark:bg-gray-800 relative ">
      {messages.map((msg) => {
        // console.log(msg.senderId, "msg.senderId")
        const owner = msg.senderId?._id === userInfo?._id;

        return (
          <Message 
            owner={owner} 
            message={msg} 
            key={msg._id} 
            isSelecting={isSelecting}
            selectedMessages={selectedMessages}
            setSelectedMessages={setSelectedMessages}
            onEnableSelect={() => setIsSelecting(true)}
          />
        )

        // if (owner) {
        //   return (
        //     <OwnMessage
        //       key={msg._id || idx}
        //       message={msg}
        //       isSelecting={isSelecting}
        //       selectedMessages={selectedMessages}
        //       setSelectedMessages={setSelectedMessages}
        //       onEnableSelect={() => setIsSelecting(true)}
        //     />
        //   )
        // }

        // return (
        //   <OtherMessage
        //     key={msg._id}
        //     isGroup={true}
        //     message={msg}
        //     isSelecting={isSelecting}
        //     selectedMessages={selectedMessages}
        //     setSelectedMessages={setSelectedMessages}
        //     onEnableSelect={() => setIsSelecting(true)}
        //   />
        // )
      })}

      {/* ref ở cuối */}
      <div ref={messagesEndRef} />
      {/* Toolbar hành động khi đang chọn */}
      <AnimatePresence>
        {isSelecting && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute z-999999 bottom-0 left-0 right-0 shadow-lg flex justify-center"
          >
            <div className="w-[80%] flex items-center justify-between bg-gray-800 text-white py-3 px-6 mb-4 rounded-lg" style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
              <div className="text-sm">
                {selectedMessages.length} đã chọn
              </div>
              <div className="flex space-x-4">
                <button className="hover:text-yellow-400 flex items-center">
                  <TrashBinIcon className="size-4 mr-1" /> Xoá
                </button>
                <button className="hover:text-blue-400 flex items-center">
                  <ReplyIcon className="size-4 mr-1" /> Trả lời
                </button>
                <button className="hover:text-yellow-400 flex items-center">
                  <PinIcon className="size-4 mr-1" /> Pin
                </button>
                <button
                  onClick={handleCancelSelect}
                  className="hover:text-gray-400"
                >
                  Hủy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessagesArea;
