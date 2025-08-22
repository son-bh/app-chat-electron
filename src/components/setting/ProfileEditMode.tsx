import { FiUser, FiPhone, FiCalendar } from "react-icons/fi";
import UserCard from "./UserCard";
import { IUser, UpdateType } from "@/types";

interface EditData {
  fullname: string;
  username: string;
  phone: string;
  birthday?: string;
}

interface ProfileEditModeProps {
  userInfo: IUser;
  editData: EditData;
  onEditField: (fieldType: UpdateType) => void;
}

export default function ProfileEditMode({
  userInfo,
  editData,
  onEditField,
}: ProfileEditModeProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col items-center pb-6 border-b border-gray-200">
        <UserCard
          profile={userInfo}
          className="flex-col items-center justify-center"
        />
      </div>

      <div>
        <div
          className="flex items-center gap-3 p-3 justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onEditField("fullname")}
        >
          <div className="flex items-center gap-4">
            <FiUser size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500 block">Tên đầy đủ</span>
          </div>
          <p className="text-sm font-medium text-blue-500">
            {editData.fullname || "Thêm"}
          </p>
        </div>
        <div
          className="flex items-center gap-3 p-3 justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onEditField("phone")}
        >
          <div className="flex items-center gap-4">
            <FiPhone size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500 block">Số điện thoại</span>
          </div>
          <p className="text-sm font-medium text-blue-500">
            {editData.phone || "Thêm"}
          </p>
        </div>
        <div
          className="flex items-center gap-3 p-3 justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onEditField("username")}
        >
          <div className="flex items-center gap-4">
            <FiUser size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500 block">Username</span>
          </div>
          <p className="text-sm font-medium text-blue-500">
            {editData.username || "Thêm"}
          </p>
        </div>

        <div
          className="flex items-center gap-3 p-3 justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onEditField("birthday")}
        >
          <div className="flex items-center gap-4">
            <FiCalendar size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500 block">Sinh nhật</span>
          </div>
          <p className="text-sm font-medium text-blue-500">
            {editData?.birthday || "Thêm"}
          </p>
        </div>
      </div>
    </div>
  );
}
