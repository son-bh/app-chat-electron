import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ChatMessagesArea from "./ChatMessagesArea";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxFooter from "./ChatBoxFooter";
import {
  useQueryGetConversationDetail,
  useQueryGetMessagesUser,
  useSendMessageGroupMutation,
  useSendMessageMutation,
} from "@/services/message";
import { IMessage, ISendMessageGroupPayload, ISendMessagePayload, TYPE_FILE_MESS } from "@/types";
import moment from "moment";
// import socket from "@/configs/socket";
import { useSocketEvent } from "@/hooks/useSocketEvent";

const Chat: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  // const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const sendMessageMutation = useSendMessageMutation();
  const sendMessageGroupMutation = useSendMessageGroupMutation();

  const { data: conversationDetail } = useQueryGetConversationDetail(
    { conversationId: userId },
    { enabled: userId ? true : false }
  );
  const { data: _messages } = useQueryGetMessagesUser(
    { conversationId: userId },
    { enabled: userId ? true : false }
  );

  const handleSocketMess = (dataSocket: IMessage) => {
    console.log("🚀 ~ handleNewChat ~ chatData:", dataSocket);

    const newMessage: IMessage = {
      _id: dataSocket?._id,
      // online: dataSocket.message?.createdAt,
      text: dataSocket?.text,
      type: dataSocket?.type,
      senderId: {
        username: dataSocket?.senderId?.username,
        _id: dataSocket?.senderId?._id,
      },
      pathFile: dataSocket?.pathFile,
      conversationId: "",
      createdAt: dataSocket?.createdAt,
      isDeleted: false,
      isEdited: false,
      isPin: false,
    };
    setMessages((prev) => [...prev, newMessage]);
  };


  const handleSocketPinMess = (dataSocket: {message: IMessage }) => {
    console.log("🚀 ~ handleNewChat ~ chatData:", dataSocket);

    setMessages((prev) => {
      return prev.map((item) =>
        item._id === dataSocket?.message._id
          ? { ...item, isPin: dataSocket?.message?.isPin } // cập nhật giá trị mới
          : item
      );
    });
  };


  useSocketEvent(`pinMess_${userId}`, handleSocketPinMess);
  useSocketEvent(`mess_${userId}`, handleSocketMess);

  // useEffect(() => {
  //   if (!userId) return;
  //   socket.on(`pinMess_${userId}`, (dataSocket) => {
  //     setMessages((prev) => {
  //       return prev.map((item) =>
  //         item._id === dataSocket.message._id
  //           ? { ...item, isPin: dataSocket.message.isPin } // cập nhật giá trị mới
  //           : item
  //       );
  //     });
  //   });

  //   socket.on(`mess_${userId}`, (dataSocket) => {
  //     const newMessage: IMessage = {
  //       _id: dataSocket?._id,
  //       // online: dataSocket.message?.createdAt,
  //       text: dataSocket?.text,
  //       type: dataSocket?.type,
  //       senderId: {
  //         username: dataSocket?.senderId?.username,
  //         _id: dataSocket?.senderId?._id,
  //       },
  //       conversationId: "",
  //       createdAt: dataSocket?.createdAt,
  //       isDeleted: false,
  //       isEdited: false,
  //       isPin: false,
  //     };
  //     setMessages((prev) => [...prev, newMessage]);
  //   });

  //   return () => {
  //     socket.off(`mess_${userId}`);
  //     socket.off(`pinMess_${userId}`);
  //   };
  // }, [userId]);

  useEffect(() => {
    if (_messages?.data?.length) {
      const messageData = _messages?.data;
      const messageSorted = messageData?.sort(
        (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
      );
      setMessages(messageSorted);
    } else {
      setMessages([]);
    }
  }, [_messages]);

  const handleSendMessage = (type: TYPE_FILE_MESS, mess?: string, pathFile?: string) => {
    if (Array.isArray(conversationDetail?.data?.users)) {
      const payload: ISendMessageGroupPayload = {
        conversationId: userId || "",
        text: mess ? mess.trim() : "",
        type,
        pathFile,
      };
      sendMessageGroupMutation.mutate(payload, {
        onSuccess: () => {
          // setMessage("");
        },
      });
    } else {
      if (conversationDetail?.data?.users?._id) {
        const payload: ISendMessagePayload = {
          receiverId: conversationDetail?.data?.users?._id,
          text: mess ? mess.trim() : "",
          type,
          pathFile,
        };
        sendMessageMutation.mutate(payload, {
          onSuccess: () => {
            // setMessage("");
          },
        });
      }
    }
    
  };

  return (
    <motion.div
      className="flex flex-col h-screen bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {conversationDetail?.data?.users && (
        <ChatBoxHeader
          conversationId={userId as string}
          currentChat={conversationDetail?.data}
        />
      )}

      <ChatMessagesArea messages={messages} />

      <ChatBoxFooter
        // message={message}
        // setMessage={setMessage}
        onSendMessage={handleSendMessage}
        // onKeyPress={handleKeyPress}
      />
    </motion.div>
  );
};

export default Chat;
