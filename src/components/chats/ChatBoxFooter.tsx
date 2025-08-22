import React, { useState, useRef, useEffect } from "react";
import { HiPaperAirplane, HiX } from "react-icons/hi";
import {
  FaSmile,
  FaFile,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileVideo,
  FaPaperclip
} from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FileDropdown } from "./FileDropdown";
import { CaptionModal } from "./CaptionModal";
import { TYPE_FILE_MESS } from "@/types";
import { uploadFileMessage, uploadImageMessage, uploadVideoMessage } from "@/services/message";

interface SelectedFile {
  file: File;
  preview?: string;
  id: string;
}

interface ChatBoxFooterProps {
  // message: string;
  // setMessage: (message: string) => void;
  onSendMessage: (type: TYPE_FILE_MESS, content?: string, filePath?: string) => void;
  // onKeyPress: (e: React.KeyboardEvent) => void;
  onFileSelect?: (files: FileList) => void;
}

const ChatBoxFooter: React.FC<ChatBoxFooterProps> = ({
  // message,
  // setMessage,
  onSendMessage,
  // onKeyPress,
  onFileSelect
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<Array<File>>([]);
  const isMultiple = false;
  const [message, setMessage] = useState("");

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }
    if (showEmojiPicker) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);


  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);

  const handleEmojiSelect = (emoji: any) => {
    const input = inputRef.current;
    if (input) {
      const cursorPosition = input.selectionStart || message.length;
      const emojiChar = emoji.native || emoji.emoji;
      const newMessage =
        message.slice(0, cursorPosition) +
        emojiChar +
        message.slice(cursorPosition);
      setMessage(newMessage);

      setTimeout(() => {
        input.focus();
        input.setSelectionRange(
          cursorPosition + emojiChar.length,
          cursorPosition + emojiChar.length
        );
      }, 10);
    }
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/"))
      return <FaFileImage className="w-4 h-4" />;
    if (fileType.startsWith("video/"))
      return <FaFileVideo className="w-4 h-4" />;
    if (fileType === "application/pdf")
      return <FaFilePdf className="w-4 h-4" />;
    if (fileType.includes("word") || fileType.includes("document"))
      return <FaFileWord className="w-4 h-4" />;
    return <FaFile className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles: SelectedFile[] = Array.from(files).map((file) => {
        const fileObj: SelectedFile = {
          file,
          id: Math.random().toString(36).substr(2, 9),
        };
        if (file.type.startsWith("image/")) {
          fileObj.preview = URL.createObjectURL(file);
        }
        return fileObj;
      });
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      if (onFileSelect) {
        onFileSelect(files);
      }
    }
    event.target.value = "";
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleUploadFile = async (file: File, type: TYPE_FILE_MESS) => {
    const formData = new FormData();
    
    if (type === "IMAGE") {
      formData.append('imageFile', file);
      const response = await uploadImageMessage(formData);
      return response;
    }
    if (type === "VIDEO") {
      formData.append('video', file);
      const response = await uploadVideoMessage(formData);
      return response;
    }
    if (type === "FILE") {
      formData.append('file', file);
      const response = await uploadFileMessage(formData);
      return response;
    }
  }

  const handleSendMessage = async (files: File[], type: TYPE_FILE_MESS, mess?: string) => {
    const pathFiles: string[] = [];

    if (files?.length > 0) {
      for (const item of files) {
        
        const response = await handleUploadFile(item, type);
        
        if (response) {
          pathFiles.push(response?.data);
        }
        
      }

    }

    setMessage("")
    onSendMessage(type, mess, pathFiles[0]);
    selectedFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setSelectedFiles([]);

  };

  const handleFileSelect = (f: Array<File>) => {
    setFile(f);
    setShowModal(true);
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          setFile([file]);
          setShowModal(true);
        }
      }
    }
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // handleSendMessage(file, "TEXT", message)
      setMessage("")
      onSendMessage("TEXT", message);
    }
  };

  const handelSetMessage = (value: string) => {
    setMessage(value)
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {selectedFiles.length > 0 && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((selectedFile) => (
              <div
                key={selectedFile.id}
                className="relative group bg-gray-50 dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-600"
              >
                {selectedFile.file.type.startsWith("image/") ? (
                  <div className="relative">
                    <img
                      src={selectedFile.preview}
                      alt={selectedFile.file.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      onClick={() => removeFile(selectedFile.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    >
                      <HiX className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pr-6">
                    <div className="text-gray-600 dark:text-gray-300">
                      {getFileIcon(selectedFile.file.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate max-w-24">
                        {selectedFile.file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(selectedFile.file.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(selectedFile.id)}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    >
                      <HiX className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip,.rar"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex items-center gap-3">
          {isMultiple ? (
            <button
              onClick={handleFileClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Chọn file hoặc ảnh"
            >
              <FaPaperclip className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          ) : (
            <FileDropdown onFileSelect={handleFileSelect} />
          )}

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => handelSetMessage(e.target.value)}
              onKeyPress={onKeyPress}
              onPaste={handlePaste}
              placeholder="Nhập tin nhắn..."
              className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              ref={btnRef}
              onClick={toggleEmojiPicker}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded transition-colors ${showEmojiPicker ? "bg-gray-200 dark:bg-gray-700" : ""
                }`}
            >
              <FaSmile className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>

            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-12 right-0 z-50"
              >
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="auto"
                  locale="vi"
                  previewPosition="none"
                  skinTonePosition="none"
                  searchPosition="sticky"
                  perLine={8}
                  maxFrequentRows={2}
                  navPosition="top"
                  set="native"
                  style={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>

          <button
            onClick={() => handleSendMessage(file, "TEXT", message)}
            disabled={!message.trim() && selectedFiles.length === 0}
            className={`p-2 rounded-lg transition-colors ${message.trim() || selectedFiles.length > 0
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}
          >
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
      </div>
      {file && (
        <CaptionModal
          isOpen={showModal}
          files={file}
          onClose={() => setShowModal(false)}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ChatBoxFooter;
