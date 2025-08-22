import { FaRegCircleXmark } from 'react-icons/fa6';

import { Modal } from '.';
import Button from '../button/Button';

interface IConfirmDeleteModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  title?: string;
  content?: string;
  confirmDelete: () => void;
  closeModal: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  isLoading,
  title = 'Xác nhận',
  content = 'Bạn có thực sự muốn xóa mục này không? Quá trình này không thể hoàn tác.',
  confirmDelete,
  closeModal,
}: IConfirmDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className='max-w-[500px] m-4'
      isBackdropClose={false}
    >
      <div className='text-center relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11'>
        <div className='flex items-center justify-center mb-4'>
          <FaRegCircleXmark className='text-red-500' size={64} />
        </div>
        <div>
          <h4 className='mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90'>
            {title}
          </h4>
        </div>
        <div>{content}</div>
        <div className='flex items-center justify-center gap-3 px-2 mt-6'>
          <Button
            className='sm:w-1/4 w-1/2'
            size='sm'
            variant='outline'
            onClick={closeModal}
          >
            Đóng
          </Button>
          <Button
            className='bg-red-500 hover:bg-error-600 sm:w-1/4 w-1/2'
            size='sm'
            onClick={confirmDelete}
            isLoading={isLoading}
          >
            Xoá
          </Button>
        </div>
      </div>
    </Modal>
  );
}
