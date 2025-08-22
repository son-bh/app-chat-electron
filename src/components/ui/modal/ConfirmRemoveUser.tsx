import { Modal } from ".";
import Button from "../button/Button";

interface IConfirmBlockModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  confirm: () => void;
  closeModal: () => void;
  username?: string;
}

export default function ConfirmRemoveModal({
  isOpen,
  isLoading,
  confirm,
  closeModal,
  username,
}: IConfirmBlockModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[350px]"
      isBackdropClose={false}
      showCloseButton={false}
    >
      <div className="px-4 pt-2">
        <p className="py-4">Xóa {username} khỏi nhóm</p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="none" size="sm" onClick={closeModal}>
            Hủy
          </Button>
          <Button
            variant="none"
            size="sm"
            onClick={confirm}
            isLoading={isLoading}
          >
            Xóa
          </Button>
        </div>
      </div>
    </Modal>
  );
}
