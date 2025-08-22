import {
  TaskIcon,
  PinIcon,
  ReplyIcon,
  CirclCheckIcon,
  PinOffIcon,
} from "@/icons";
import { motion, AnimatePresence } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Checkbox from "../form/input/Checkbox";
import moment from "moment";
import { MessageItem } from "./MessageItem";
import { ContextMenu, IMessage } from "@/types";

interface OtherMessageProps {
  isGroup?: boolean;
  isSelecting?: boolean;
  setSelectedMessages: Dispatch<SetStateAction<string[]>>;
  selectedMessages: string[];
  onEnableSelect: () => void;
  message: IMessage;
  isPined?: boolean;
  handlePinMessage: () => void;
  handleCopyMessage: () => void;
}

const OtherMessage: React.FC<OtherMessageProps> = ({
  // id,
  // text,
  // time,
  // sender,
  message,
  isSelecting,
  setSelectedMessages,
  selectedMessages,
  onEnableSelect,
  isGroup = false,
  isPined = false,
  handlePinMessage,
  handleCopyMessage,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  // const [isPined, setIsPined] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsPined(message?.isPin);
  // }, [message?.isPin])

  const subMenus = useMemo<Array<ContextMenu>>(
    () => [
      { title: "Trả lời", icon: <ReplyIcon className="size-4 mr-2" /> },
      {
        title: "Copy",
        icon: <TaskIcon className="size-4 mr-2" />,
        action: handleCopyMessage,
      },
      {
        title: isPined ? "Bỏ Ghim" : "Ghim",
        icon: isPined ? (
          <PinOffIcon className="size-4 mr-2" />
        ) : (
          <PinIcon className="size-4 mr-2" />
        ),
        action: handlePinMessage,
      },
      {
        title: "Chọn",
        icon: <CirclCheckIcon className="size-4 mr-2" />,
        action: onEnableSelect,
      },
      // { title: "Xoá", icon: <TrashBinIcon className="size-4 mr-2" /> },
    ],
    [isPined]
  );

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // chặn menu mặc định
    // setPosition({ x: e.pageX, y: e.pageY });
    setShowMenu(true);
  };

  const toggleSelect = () => {
    setSelectedMessages((prev: Array<string>) =>
      prev.includes(message?._id)
        ? prev.filter((m) => m !== message?._id)
        : [...prev, message?._id]
    );
  };

  return (
    <div className="flex items-end mb-3 justify-start ">
      <div className="w-8 mr-6">
        <AnimatePresence mode="wait" initial={false}>
          {isSelecting ? (
            <motion.div
              key="checkbox"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mr-6"
              layout
            >
              <Checkbox
                checked={selectedMessages.includes(message?._id)}
                onChange={toggleSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="avatar"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mr-6"
              layout
            >
              {message?.senderId?.username && message?.senderId?.username?.slice(1,3).toUpperCase()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-[70%] rounded-xl shadow-md mine relative">
        <div className="px-4 py-2 text-gray-800 dark:text-white relative rounded-xl bg-gray-200 dark:bg-gray-700 rounded-tr-none message last">
          {isGroup && (
            <div className="text-gray-600 dark:text-gray-300 font-semibold mb-1">
              {/* {message?.} */}
            </div>
          )}
          <div className="whitespace-pre-line">
            <MessageItem
              type={message?.type}
              content={message?.text}
              textColor="text-gray-900"
              url={message?.pathFile}
            />
          </div>
          <div className="flex justify-end relative">
            <span
              onContextMenu={handleContextMenu}
              className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1"
            >
              {moment(message?.createdAt).utcOffset(7).format("HH:mm")}
            </span>
            {showMenu && (
              <ul
                className="absolute bg-[#1e2229] text-white border rounded-lg py-2 w-32 overflow-hidden z-999999"
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
        </div>
        {isPined && (
          <div className="absolute right-[-10px] top-0 rotate-45">
            <PinIcon className="size-4 mr-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherMessage;
