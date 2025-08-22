import { useResetPasswordUserMutation } from '@/services';
import { ToastType } from '@/shared/constants/common';
import { IUser } from '@/types';
import { toast } from '@/components/toast';
import { Modal } from '@/components/ui/modal';
import Button from '@/components/ui/button/Button';
import { MdOutlineInfo } from 'react-icons/md';

interface IResetPasswordModalProps {
  userDetail?: IUser | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function ResetPasswordModal({
  userDetail,
  isOpen,
  closeModal,
}: IResetPasswordModalProps) {
  const resetPasswordMutation = useResetPasswordUserMutation();

  const handleResetPassword = () => {
    resetPasswordMutation.mutate(
      { username: userDetail?.username as string },
      {
        onSuccess: () => {
          toast(
            ToastType.Success,
            'Đặt lại mật khẩu thành công, mật khẩu là: Human2025@'
          );
          closeModal();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className='max-w-[500px] m-4'
      isBackdropClose={false}
    >
      <div className='text-center relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11'>
        <div className='flex items-center justify-center mb-4'>
          <MdOutlineInfo className='text-blue-500' size={64} />
        </div>
        <div>
          <h4 className='mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90'>
            Xác nhận
          </h4>
        </div>
        <div>Bạn có chắc chắn muốn đặt lại mật khẩu tài khoản này không?</div>
        <div className='flex items-center justify-center gap-3 px-2 mt-6'>
          <Button size='sm' variant='outline' onClick={closeModal}>
            Đóng
          </Button>
          <Button
            className='bg-blue-500'
            size='sm'
            onClick={handleResetPassword}
            isLoading={resetPasswordMutation.isPending}
          >
            Đặt lại
          </Button>
        </div>
      </div>
    </Modal>
  );
}
