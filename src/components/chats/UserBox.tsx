import React, { useCallback } from "react";
import { IUser } from "@/types";
import { AVATAR_COLORS } from "@/shared/constants";

interface UserItemProps {
  user: IUser;
  isSelected?: boolean;
  onUserToggle?: (userId: string) => void;
  onClick?: (user: IUser) => void;
  showOnlineStatus?: boolean;
  showTeamBadge?: boolean;
  className?: string;
  avatarSize?: "sm" | "md" | "lg";
  disabled?: boolean;
  role?: "OWNER" | "ADMIN" | "MEMBER";
  onContextMenu?: (e: React.MouseEvent) => void;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  role,
  isSelected = false,
  onUserToggle,
  onClick,
  showOnlineStatus = true,
  showTeamBadge = true,
  className = "",
  avatarSize = "md",
  disabled = false,
  onContextMenu,
}) => {
  const getRoleBadge = useCallback(() => {
    if (!role || role === "MEMBER") return null;

    const roleConfig = {
      OWNER: { text: "Chủ nhóm", color: "text-blue-500" },
      ADMIN: { text: "Quản trị viên", color: "text-blue-500" },
    };

    const config = roleConfig[role];

    return (
      <span className={`text-xs ${config.color} font-medium`}>
        {config.text}
      </span>
    );
  }, [role]);

  const getAvatarBgColor = useCallback((user: IUser) => {
    const index = parseInt(user._id.slice(-1), 16) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
  }, []);

  const getAvatarContent = useCallback(
    (user: IUser) => {
      const initials = user.username.replace("@", "").slice(0, 2).toUpperCase();
      return (
        <div
          className={`w-full h-full ${getAvatarBgColor(user)} flex items-center justify-center text-white font-medium`}
        >
          {initials}
        </div>
      );
    },
    [getAvatarBgColor]
  );

  const formatLastSeen = useCallback((user: IUser) => {
    return user.online ? "đang hoạt động" : "không hoạt động";
  }, []);

  const getAvatarSize = () => {
    switch (avatarSize) {
      case "sm":
        return "w-8 h-8";
      case "md":
        return "w-12 h-12";
      case "lg":
        return "w-16 h-16";
      default:
        return "w-12 h-12";
    }
  };

  const getOnlineIndicatorSize = () => {
    switch (avatarSize) {
      case "sm":
        return "w-3 h-3";
      case "md":
        return "w-4 h-4";
      case "lg":
        return "w-5 h-5";
      default:
        return "w-4 h-4";
    }
  };

  const handleClick = () => {
    if (disabled) return;

    if (onClick) {
      onClick(user);
    } else if (onUserToggle) {
      onUserToggle(user._id);
    }
  };

  return (
    <div
      onContextMenu={onContextMenu}
      onClick={handleClick}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:bg-gray-50"
      } ${className}`}
    >
      <div className="relative">
        <div className={`${getAvatarSize()} rounded-full overflow-hidden`}>
          {getAvatarContent(user)}
        </div>

        {isSelected && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}

        {showOnlineStatus && user.online && !isSelected && (
          <div
            className={`absolute -bottom-1 -right-1 ${getOnlineIndicatorSize()} bg-green-500 rounded-full border-2 border-white`}
          ></div>
        )}
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4
            className={`font-medium truncate ${
              isSelected ? "text-blue-500" : "text-gray-900"
            }`}
          >
            {user.fullname || user.username}
          </h4>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm text-gray-500 truncate">
            {formatLastSeen(user)}
          </p>
          {role && getRoleBadge()}
          {showTeamBadge && user.teamId && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full truncate">
              {user.teamId.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
