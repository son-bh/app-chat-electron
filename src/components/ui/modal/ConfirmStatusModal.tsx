import { FaCircleInfo } from 'react-icons/fa6';

import { Modal } from '.';
import Button from '../button/Button';

interface IConfirmStatusModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  isLoading?: boolean;
  confirmChange: () => void;
  closeModal: () => void;
}

export default function ConfirmStatusModal({
  title,
  description,
  isOpen,
  isLoading,
  confirmChange,
  closeModal,
}: IConfirmStatusModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className='max-w-[500px] m-4'
      isBackdropClose={false}
    >
      <div className='text-center relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11'>
        <div className='flex items-center justify-center mb-4'>
          <FaCircleInfo className='text-blue-500' size={64} />
        </div>
        <div>
          <h4 className='mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90'>
            {title || 'Xác nhận thay đổi trạng thái'}
          </h4>
        </div>
        <div>
          {description ||
            'Bạn có chắc chắn muốn thay đổi trạng thái này không?'}
        </div>
        <div className='flex items-center justify-center gap-3 px-2 mt-6'>
          <Button size='sm' variant='outline' onClick={closeModal}>
            Hủy
          </Button>
          <Button
            className='bg-blue-500'
            size='sm'
            onClick={confirmChange}
            isLoading={isLoading}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
}
