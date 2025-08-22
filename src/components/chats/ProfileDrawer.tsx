import { useLogoutMutation } from "@/services";
import { CookiesStorage } from "@/shared/utils/cookie-storage";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useCallback } from "react";
import CurrentUser from "./CurrentUser";

interface Props {
  openModal: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  isLoading?: boolean;
}

const ProfileDrawer = ({ openModal }: Props) => {
  const logoutMutation = useLogoutMutation();

  const handleNavigation = useCallback((path: string) => {
    window.location.href = path;
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync(undefined);
      CookiesStorage.clearSession();
      handleNavigation("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logoutMutation, handleNavigation]);

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
      onClick: openModal,
    },
    // {
    //   id: "settings",
    //   label: "Setting",
    //   icon: FiSettings,
    //   onClick: openModal,
    // },
    {
      id: "logout",
      label: "Đăng xuất",
      icon: FiLogOut,
      onClick: handleLogout,
      isLoading: logoutMutation.isPending,
    },
  ];

  return (
    <>
      <CurrentUser />
      <ul className="py-2 border-b text-gray-700 dark:text-gray-300">
        {menuItems.map(({ id, label, icon: Icon, onClick, isLoading }) => (
          <li key={id}>
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-left 
                         hover:bg-gray-100 dark:hover:bg-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-150"
              onClick={onClick}
              disabled={isLoading}
              type="button"
            >
              <Icon
                size={16}
                className={`flex-shrink-0 ${isLoading ? "animate-spin" : ""}`}
              />
              <span className="truncate">{label}</span>
              {isLoading && id === "logout" && (
                <div className="ml-auto">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProfileDrawer;
