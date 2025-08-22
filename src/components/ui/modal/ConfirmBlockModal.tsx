import { FaRegCircleXmark } from 'react-icons/fa6';

import { Modal } from '.';
import Button from '../button/Button';

interface IConfirmBlockModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  confirmBlock: () => void;
  closeModal: () => void;
}

export default function ConfirmBlockModal({
  isOpen,
  isLoading,
  confirmBlock,
  closeModal,
}: IConfirmBlockModalProps) {
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
            Confirm block
          </h4>
        </div>
        <div>
          Are you really want to block this? This process cannot be undone.
        </div>
        <div className='flex items-center justify-center gap-3 px-2 mt-6'>
          <Button size='sm' variant='outline' onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className='bg-red-500'
            size='sm'
            onClick={confirmBlock}
            isLoading={isLoading}
          >
            Block
          </Button>
        </div>
      </div>
    </Modal>
  );
}
