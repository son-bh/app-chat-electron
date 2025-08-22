import { Message } from "@/types";
import ChatMessage from "./ChatMessage";
import { useRef, useEffect } from "react";

export function Messages({ messages }: { messages: Message[] }) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        <img src="/images/no-message.png" alt="No Message" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-3">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} {...msg} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
