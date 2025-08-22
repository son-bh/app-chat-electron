import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment"
import { IMessage } from "@/types";
import { MessageItem } from "./MessageItem";
import { PinIcon, PinOffIcon, ReplyIcon, TaskIcon, TrashBinIcon } from "@/icons";

interface OwnMessageProps {
  message: IMessage
  isPined?: boolean;
  handlePinMessage: () => void;
  handleCopyMessage: () => void;
}

interface ContextMenu {
  title: string;
  icon: ReactNode;
  action?: () => void;
}

const OwnMessage: React.FC<OwnMessageProps> = ({
  message,
  isPined = false,
  handlePinMessage,
  handleCopyMessage,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const subMenus = useMemo<Array<ContextMenu>>(() => [
    { title: "Trả lời", icon: <ReplyIcon className="size-4 mr-2" /> },
    {
      title: "Copy",
      icon: <TaskIcon className="size-4 mr-2" />,
      action: handleCopyMessage,
    },
    {
      title: isPined ? "Bỏ Ghim" : "Ghim",
      icon: isPined ? <PinOffIcon className="size-4 mr-2" /> : <PinIcon className="size-4 mr-2" />,
      action: handlePinMessage,
    },
    { title: "Xoá", icon: <TrashBinIcon className="size-4 mr-2" /> },
  ], [isPined]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  return (
    <div className="flex items-end mb-3 justify-end">
      <div className="max-w-[70%] rounded-xl shadow-md yours">
        <div className="px-4 py-2 text-white relative rounded-xl bg-[#8774E1] rounded-tl-none message last">
          <div className="whitespace-pre-line">
            <MessageItem 
              type={message.type} 
              content={message.text}
              url={message?.pathFile} 
              textColor="text-white" 
            />
          </div>
          <div className="relative">
            <div onContextMenu={handleContextMenu} className="text-xs text-blue-100 text-right mt-1">{moment(message?.createdAt).utcOffset(7).format("HH:mm")}</div>
            {showMenu && (
              <ul
                className="absolute right-0 bg-[#1e2229] text-white border rounded-lg py-2 w-32 overflow-hidden z-999999"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                ref={menuRef}
              >
                {subMenus.map((menu, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:text-blue-400 cursor-pointer flex items-center"
                    onClick={() => {
                      menu.action?.();
                      setShowMenu(false);
                    }}
                  >
                    {menu.icon} <span className="text-sm">{menu.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {isPined && (
          <div className="absolute right-[-10px] top-0 rotate-45 text-black">
            <PinIcon className="size-4 mr-2" />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default OwnMessage;
