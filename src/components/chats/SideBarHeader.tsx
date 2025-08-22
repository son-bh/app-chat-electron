import { useSidebar } from "@/context/SidebarContext";
import { ChatHeaderProps } from "@/types";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import Input from "../form/input/InputField";
import { IoCloseOutline } from "react-icons/io5";

const SideBarHeader: React.FC<ChatHeaderProps> = ({
  handleOpenDrawer,
  onSearchChange,
}) => {
  const { isExpanded } = useSidebar();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  return (
    <div
      className={`p-4 border-b border-gray-200 dark:border-gray-700 min-h-[77px] ${
        !isExpanded ? "px-2" : ""
      }`}
    >
      {isExpanded ? (
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={handleOpenDrawer}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <IoIosMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          {isExpanded && (
            <div className="flex-1 !w-full">
              <Input
                endAdornment={
                  searchKeyword ? (
                    <IoCloseOutline
                      onClick={() => {
                        setSearchKeyword("");
                        onSearchChange("");
                      }}
                      className="text-gray-400 w-6 h-6 hover:text-blue-500 cursor-pointer transition-all duration-200"
                    />
                  ) : (
                    <FaSearch className="text-gray-400 w-4 h-4 " />
                  )
                }
                type="text"
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  onSearchChange(e.target.value);
                }}
                className="!rounded-4xl !mt-0 pl-2 "
              />
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleOpenDrawer}
          className="p-2 hover:bg-gray-100 flex justify-center w-full dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <IoIosMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </div>
  );
};

export default SideBarHeader;
