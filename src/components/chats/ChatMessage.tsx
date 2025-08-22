import React from "react";
import clsx from "clsx";

export type MessageType = "text" | "image" | "video" | "file";

interface ChatMessageProps {
  type: MessageType;
  content: string;
  time: string;
  sender?: string;
  isOwn?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, time, type, sender, isOwn }) => {
  return (
    //   <div className="flex flex-col h-screen p-4 overflow-y-auto">
    //   <div className="flex-grow"></div>

    //   <div className="flex flex-col space-y-2">
    //     <div className="relative max-w-xs p-3 bg-gray-200 rounded-lg self-start bubble-left">
    //       <p className="text-gray-800">Hi, how's it going?</p>
    //     </div>
    //     <div className="relative max-w-xs p-3 bg-blue-500 text-white rounded-lg self-end bubble-right">
    //       <p>It's going great! How about you?</p>
    //     </div>
    //     <div className="relative max-w-xs p-3 bg-gray-200 rounded-lg self-start bubble-left">
    //       <p className="text-gray-800">I'm doing well too. Just building a cool chat UI.</p>
    //     </div>
    //     <div className="relative max-w-xs p-3 bg-blue-500 text-white rounded-lg self-end bubble-right">
    //       <p>That's awesome! It looks good so far.</p>
    //     </div>
    //   </div>
    // </div>

    <div
      className={clsx("flex items-end mb-3", {
        "justify-end": isOwn,
        "justify-start": !isOwn,
      })}
    >
      {!isOwn && (
        <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold mr-4">
          {sender ? sender.charAt(0).toUpperCase() : "?"}
        </div>
      )}
      <div
        className={clsx("max-w-[70%] rounded-2xl shadow-md", {
          "yours ": isOwn,
          "mine": !isOwn,
        })}
      >
        <div
          className={clsx("px-4 py-2 text-white relative rounded-2xl ", {
            "bg-[#2b3648] text-white rounded-tr-none message last": !isOwn,
            "bg-[#3a4d65] text-white rounded-tl-none message last": isOwn,
          })}
        >
          {!isOwn && sender && (
            <div
              className="text-pink-400 font-semibold mb-1"
            // className={clsx("text-pink-400 font-semibold mb-1 message", {
            //   "mine": isOwn,
            //   "last": !isOwn,
            // })}
            >{sender}</div>
          )}
          {type === "text" && <p className="whitespace-pre-line">{content}</p>}
          {type === "image" && (
            <img src={content} alt="sent-img" className="rounded-lg max-w-full h-auto" />
          )}
          {type === "video" && (
            <video src={content} controls className="rounded-lg max-w-full h-auto" />
          )}
          {type === "file" && (
            <a href={content} download className="text-blue-200 underline">
              📎 {content}
            </a>
          )}
          <div className="text-xs text-gray-300 text-right mt-1">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
