import { IMessage } from "@/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OtherMessage from "./OtherMessage";
import OwnMessage from "./OwnMessage";
import { toast } from "../toast";
import { usePinMessageMutation, useRemovePinMessageMutation } from "@/services/message";

interface MessageProps {
  isGroup?: boolean;
  isSelecting?: boolean;
  setSelectedMessages: Dispatch<SetStateAction<string[]>>;
  selectedMessages: string[];
  onEnableSelect: () => void;
  message: IMessage;
  owner: boolean;
}

const Message = (props: MessageProps) => {
  const { isSelecting, message, setSelectedMessages, onEnableSelect, owner, selectedMessages } = props;
  const { userId } = useParams<{ userId: string }>();
  const [isPined, setIsPined] = useState<boolean>(false);
  const pinMessageMutation = usePinMessageMutation();
  const removePinMessageMutation = useRemovePinMessageMutation();

  useEffect(() => {
    setIsPined(message?.isPin);
  }, [message?.isPin]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.text);
    toast("success", `Đã copy`);
  };

  const handlePinMessage = () => {
    if (message?._id && userId) {
      const payload = {
        messageId: message?._id,
        conversationId: userId
      }
      if (isPined) {
        removePinMessageMutation.mutate(
          payload,
          {
            onSuccess: () => {
              setIsPined(false);
              toast("success", `Đã bỏ ghim.`);
            }
          }
        )
      } else {
        pinMessageMutation.mutate(
          payload,
          {
            onSuccess: () => {
              setIsPined(true)
              toast("success", `Đã ghim.`);
            }
          }
        )
      }
    }
  }

  if (owner) {
    return (
      <OwnMessage
        isPined={isPined}
        message={message}
        handlePinMessage={handlePinMessage}
        handleCopyMessage={handleCopyMessage}
      />
    )
  }

  return (
    <OtherMessage
      setSelectedMessages={setSelectedMessages}
      onEnableSelect={onEnableSelect}
      isSelecting={isSelecting}
      isPined={isPined}
      message={message}
      handlePinMessage={handlePinMessage}
      handleCopyMessage={handleCopyMessage} 
      selectedMessages={selectedMessages}  
    />
  )
};

export default Message;