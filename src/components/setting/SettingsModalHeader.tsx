import { FiEdit3, FiX, FiArrowLeft } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";

interface SettingsModalHeaderProps {
  isEditMode: boolean;
  isMobile: boolean;
  onEditClick: () => void;
  onBackFromEdit: () => void;
  onCloseModal: () => void;
}

export default function SettingsModalHeader({
  isEditMode,
  isMobile,
  onEditClick,
  onBackFromEdit,
  onCloseModal,
}: SettingsModalHeaderProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      {isMobile && (
        <button onClick={isEditMode ? onBackFromEdit : onCloseModal}>
          <IoArrowBackSharp className="w-5 h-5 text-gray-600" />
        </button>
      )}
      {!isMobile && isEditMode && (
        <button
          onClick={onBackFromEdit}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiArrowLeft size={18} className="text-gray-600" />
        </button>
      )}
      <h4 className="text-lg font-medium text-gray-600 flex-1">
        {isEditMode ? "Thông tin" : "Hồ sơ"}
      </h4>
      <div className="flex items-center gap-2">
        {!isEditMode && (
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onEditClick}
          >
            <FiEdit3 size={18} className="text-gray-600" />
          </button>
        )}
        {!isMobile && (
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onCloseModal}
          >
            <FiX size={18} className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
