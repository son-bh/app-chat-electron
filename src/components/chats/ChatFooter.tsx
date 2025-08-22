import { useState } from "react";
import { Emoji } from "@/types";
import { FileDropdown } from "./FileDropdown";
import { EmojiPicker } from "../common/EmojiPicker";

export function ChatFooter({
  message,
  setMessage,
  onSend,
  onFileSelect,
}: {
  message: string;
  setMessage: (v: string) => void;
  onSend: (msg: string) => void;
  onFileSelect: (file: Array<File>) => void;
}) {
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <div className="w-full py-4 px-6 flex items-center border-t shadow-[0_-2px_6px_rgba(0,0,0,0.25)]">
      <FileDropdown onFileSelect={onFileSelect} />
      <input
        className="flex-1 rounded-full bg-white px-4 py-2 outline-none text-sm"
        placeholder="Nhập tin nhắn..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSend(message);
          }
        }}
      />
      <EmojiPicker
        show={showEmoji}
        setShow={setShowEmoji}
        onSelect={(emoji: Emoji) => onSend(message + emoji.native)}
      />
    </div>
  );
}
