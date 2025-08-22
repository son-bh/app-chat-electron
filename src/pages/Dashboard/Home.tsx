import PageMeta from "@/components/common/PageMeta";
// import { useState } from "react";
// import { ChatHeader } from "@/components/chats/ChatHeader";
// import { ChatFooter } from "@/components/chats/ChatFooter";
// import { Message, MessageType } from "@/types";
// import { CaptionModal } from "@/components/chats/CaptionModal";
// import { Messages } from "@/components/chats/Messages";

export default function Home() {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [message, setMessage] = useState("");
  // const [file, setFile] = useState<Array<File>>([]);
  // const [showModal, setShowModal] = useState(false);

  // const sendMessage = (content: string, type: MessageType = "text") => {
  //   if (!content.trim()) return;
  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       id: Date.now(),
  //       type,
  //       content,
  //       sender: "cu Trắng Úp Vi Déo",
  //       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  //       isOwn: true,
  //     },
  //   ]);
  //   setMessage("");
  //   setFile([]);
  // };

  return (
    <>
      <PageMeta title="Quản lý nhân sự" description="Quản lý nhân sự" />
      <div className="flex flex-col w-full h-[calc(100vh)]">
        {/* <ChatHeader />
        <Messages messages={messages} />
        <ChatFooter
          message={message}
          setMessage={setMessage}
          onSend={(text) => sendMessage(text)}
          onFileSelect={(f: Array<File>) => {
            setFile(f);
            setShowModal(true);
          }}
        /> */}
      </div>
      {/* {file && (
        <CaptionModal
          isOpen={showModal}
          files={file}
          onClose={() => setShowModal(false)}
          handleSendMessage={sendMessage}
        />
      )} */}
    </>
  );
}
