import React, { useState, useRef, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../context/SidebarContext";
import ChatList from "@/components/chats/ChatList";
import { useModal } from "@/hooks/useModal";
import { useLocation } from "react-router-dom";
import { CloseIcon, PencilIcon, User2Icon, UsersIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import ProfileDrawer from "@/components/chats/ProfileDrawer";
import CreateChatModal from "@/pages/Chat/components/CreateChatModal";
import SettingModal from "@/components/setting/SettingModal";
import Drawer from "@/components/ui/drawer";
import { ITypeChat } from "@/types";

interface MenuProps {
  title: string;
  icon: ReactNode;
  type: ITypeChat;
}

const ChatSidebar: React.FC = () => {
  const { isExpanded, setIsExpanded, isMobileOpen, isMobile } = useSidebar();

  const location = useLocation();

  const {
    isOpen: isOpenCreate,
    closeModal: closeModalCreate,
    openModal: openModalCreate,
  } = useModal();

  const {
    isOpen: isOpenSetting,
    openModal: openModalSetting,
    closeModal: closeModalSetting,
  } = useModal();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [type, setType] = useState<ITypeChat>("new");
  const menus: Array<MenuProps> = [
    // {
    //   title: "Tạo channel",
    //   icon: <MegaPhoneIcon className="size-4" />,
    // },
    {
      title: "Tạo nhóm",
      type: "group",
      icon: <User2Icon className="size-4" />,
    },
    {
      title: "Tin nhắn mới",
      type: "new",
      icon: <UsersIcon className="size-4" />,
    },
  ];

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setOpenDropdown((pre) => !pre);
  };

  const isHomePage = location.pathname === "/";

  const handleOpenModalCreate = (type: ITypeChat) => {
    openModalCreate();
    setOpenDropdown(false);
    setType(type);
  };

  const handleOpenModalSetting = () => {
    openModalSetting();
    setIsOpenDrawer(false);
  };

  const handleOpenDrawer = useCallback(() => {
    setIsOpenDrawer(true);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newWidth = e.clientX;
    if (newWidth > 300) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const shouldShowSidebar = !isMobile || isMobileOpen || isHomePage;

  const getSidebarWidth = () => {
    if (isMobile) {
      if (isMobileOpen || isHomePage) {
        return "w-full";
      }
      return "w-0 hidden";
    } else {
      return isExpanded || isMobileOpen ? "w-[350px]" : "w-[90px]";
    }
  };

  return (
    <>
      {isDragging && !isMobileOpen && (
        <div
          className="fixed inset-0 z-[9999] cursor-col-resize"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`flex flex-col bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 dark:text-white h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${getSidebarWidth()}
        ${shouldShowSidebar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <motion.div
          variants={{
            open: { x: 0, opacity: 1 },
            closed: { x: "-100%", opacity: 0 },
          }}
          animate={shouldShowSidebar ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative flex flex-col h-full"
        >
          <ChatList handleOpenDrawer={handleOpenDrawer} />

          <div className="absolute bottom-8 right-4">
            <div className="relative">
              <button
                ref={toggleRef}
                onClick={handleClick}
                className="bg-[#E4E7EC] rounded-full p-3 shadow-theme-cs"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!openDropdown ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.5, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PencilIcon className="size-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="loader"
                      initial={{ opacity: 0, scale: 0.5, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CloseIcon className="size-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <Dropdown
                isOpen={openDropdown}
                onClose={() => setOpenDropdown(false)}
                anchorRef={toggleRef as React.RefObject<HTMLElement>}
                duration={0.4}
                className="absolute min-w-[170px] bottom-14 right-0 rounded-2xl border border-gray-200 p-2 !shadow-theme-cs dark:border-gray-800 dark:bg-gray-dark"
              >
                {menus?.map((menu, idx) => (
                  <DropdownItem
                    key={idx}
                    onItemClick={() => handleOpenModalCreate(menu.type)}
                    className="flex items-center gap-3 px-3 py-2 !text-[#101828] hover:!bg-transparent"
                  >
                    {menu.icon} <span className="text-sm">{menu.title}</span>
                  </DropdownItem>
                ))}
              </Dropdown>
            </div>
          </div>
        </motion.div>

        {!isMobileOpen && !isMobile && (
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-400 transition-all duration-300 dark:hover:bg-gray-700"
          />
        )}
      </aside>

      {isOpenCreate && (
        <CreateChatModal
          type={type}
          closeModal={closeModalCreate}
          isOpen={isOpenCreate}
        />
      )}

      {isOpenSetting && (
        <SettingModal isOpen={isOpenSetting} closeModal={closeModalSetting} />
      )}

      <Drawer
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        side="left"
        title="Filters"
        wContainer="w-[280px]"
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      >
        <div className="py-6 px-3">
          <ProfileDrawer openModal={handleOpenModalSetting} />
        </div>
      </Drawer>
    </>
  );
};

export default ChatSidebar;
