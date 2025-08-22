import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleXIcon, FileIcon, SendHorizontalIcon, SmileIcon } from '@/icons';

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Emoji, TYPE_FILE_MESS } from '@/types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  // children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
  isBackdropClose?: boolean;
  title?: React.ReactNode;
  footerContent?: React.ReactNode;
  isScroll?: boolean;
  files: Array<File>
  handleSendMessage: (files: Array<File>, type: TYPE_FILE_MESS, mess?: string) => void;
}

export const CaptionModal: React.FC<ModalProps> = ({
  files,
  isOpen,
  onClose,
  // children,
  className,
  // showCloseButton = true,
  isFullscreen = false,
  isBackdropClose = true,
  // title,
  // footerContent,
  isScroll = true,
  handleSendMessage
}) => {
  const [message, setMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  // const url = URL.createObjectURL(file);

  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const emojiBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMessage("")
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(e.target as Node) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(e.target as Node)
      ) {
        setShowEmoji(false);
      }
    }
    if (showEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmoji]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const contentClasses = isFullscreen
    ? 'w-full h-full'
    : 'relative w-full rounded-lg bg-white dark:bg-gray-900';


  const handleEmojiSelect = (emoji: Emoji) => {
    const text = message + emoji.native;
    setMessage(text);
  };

  const onSendMessage = (files: Array<File>) => {
    if (files?.length === 0) return;
    if (files[0].type.startsWith("image/")) {
      handleSendMessage(files, "IMAGE", message);
    } else if (files[0].type.startsWith("video/")) {
      handleSendMessage(files, "VIDEO", message);
    } else {
      handleSendMessage(files, "FILE", message);
    }
    setMessage("")
    onClose()
  }

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center overflow-y-auto modal z-[998]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!isFullscreen && (
            <motion.div
              className='fixed inset-0 h-full w-full bg-black/50 z-[997]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (isBackdropClose) {
                  onClose();
                }
              }}
            />
          )}

          <motion.div
            ref={modalRef}
            className={`${contentClasses} ${className} max-w-[350px] z-[998]`}
            initial={
              isFullscreen
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 0, y: 100, scale: 0.9 }
            }
            animate={
              isFullscreen
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              isFullscreen
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 0, y: 100, scale: 0.9 }
            }
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 400,
              duration: 0.3,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className='relative w-full dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden'>
              <div className='flex justify-end bg-[#3A4D65] p-4 border-b border-gray-500'>
                <button
                  onClick={onClose}
                  className='flex items-center justify-center rounded-full text-gray-400 transition-colors hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-4'
                >
                  <CircleXIcon className='size-8 text-[#166fc9]' />
                  {/* <span className='text-white font-semibold ml-4'>Gửi file</span> */}
                </button>
              </div>
              <div className='bg-[#3A4D65]'>
                <div
                  className={`${isScroll ? 'overflow-y-auto' : 'overflow-y-visible'}  custom-scrollbar`}
                >

                  {files?.map((file, idx) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div key={idx}>
                        {file.type.startsWith("image/") && (
                          <img src={url} alt="sent-img" className="w-full h-[300px]" />
                        )}
                        {file.type.startsWith("video/") && (
                          <video src={url} controls className="w-full h-[300px]" />
                        )}
                        {(file.type.startsWith("pdf/") || file.type.startsWith("document") || file.type.startsWith("word") || file.type.startsWith("text/plain")) && (
                          <div className='flex items-center p-4 '>
                            <FileIcon className='size-12 text-[#1E90FF]' />
                            <p className='text-white ml-2 font-semibold text-lg'>{file.name}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

              </div>
              <div className='flex justify-between items-center bg-[#3A4D65] p-4 border-t border-gray-500'>
                <input
                  className="flex-1 rounded-full bg-white px-4 py-2 outline-none text-sm"
                  placeholder="Nhập tin nhắn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSendMessage(files)
                    }
                  }}
                />
                <div className="relative flex items-center">
                  <button
                    ref={emojiBtnRef}
                    onClick={() => setShowEmoji((prev) => !prev)}
                    className="ml-4 text-xl"
                  >
                    <SmileIcon className="size-6 text-[#AAAAAA] hover:text-[#1E90FF] transition-colors" />
                  </button>
                  {showEmoji && (
                    <div ref={emojiRef} className="absolute bottom-10 right-0 z-50">
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onSendMessage(files)}
                  className="ml-4 text-xl"
                >
                  <SendHorizontalIcon className="size-6 text-[#1E90FF]" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
