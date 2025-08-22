import { FiPhone, FiUser, FiMoreHorizontal } from "react-icons/fi";
import { toast } from "../toast";
import UserCard from "./UserCard";

interface ProfileViewModeProps {
  userInfo: any;
}

export default function ProfileViewMode({ userInfo }: ProfileViewModeProps) {
  const handleCopyUsername = () => {
    const username = userInfo?.username;
    navigator.clipboard.writeText(`${username}`);
    toast("success", "Username copied to clipboard!");
  };

  return (
    <div className="flex flex-col">
      <div className="pb-4 border-b border-gray-200">
        <UserCard profile={userInfo} />
      </div>

      <div className="py-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <FiPhone size={14} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 mb-1">
              {userInfo?.phone || "+84 345909901"}
            </p>
            <p className="text-xs text-gray-400">Mobile</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <FiUser size={14} className="text-gray-600" />
          </div>
          <div
            className="flex-1 cursor-pointer hover:bg-gray-50 rounded p-1 -m-1 transition-colors"
            onClick={handleCopyUsername}
            title="Click to copy username"
          >
            <p className="text-sm font-medium text-blue-500 mb-1">
              {userInfo?.username}
            </p>
            <p className="text-xs text-gray-400">Username</p>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <FiMoreHorizontal size={16} className="text-blue-500" />
          </button>
        </div>
      </div>

      <div className="py-6 text-center">
        <p className="text-sm text-gray-400">Your stories will be here.</p>
      </div>
    </div>
  );
}
