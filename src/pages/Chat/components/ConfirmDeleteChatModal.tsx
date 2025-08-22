import { Modal } from "@/components/ui/modal";
import { TrashBinIcon } from "@/icons";

export const ConfirmDeleteChatModal: React.FC<{
  isOpen: boolean;
  chatTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}> = ({ isOpen, chatTitle, onConfirm, onCancel, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <Modal
      showCloseButton={false}
      className="max-w-[380px]"
      isOpen={isOpen}
      onClose={onCancel}
    >
      <div className="flex flex-col gap-6 mt-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
            <TrashBinIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Xóa cuộc trò chuyện
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hành động này không thể hoàn tác
            </p>
          </div>
        </div>

        <div>
          <p className="text-gray-700 dark:text-gray-300">
            Bạn có chắc chắn muốn xóa cuộc trò chuyện với{" "}
            <span className="font-semibold">"{chatTitle}"</span>?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Tất cả tin nhắn, file và dữ liệu trong cuộc trò chuyện này sẽ bị xóa
            vĩnh viễn.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Xóa
          </button>
        </div>
      </div>
    </Modal>
  );
  // createPortal(

  // document.body
};
