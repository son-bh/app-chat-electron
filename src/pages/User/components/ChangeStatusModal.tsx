import { toast } from '@/components/toast';
import ConfirmStatusModal from '@/components/ui/modal/ConfirmStatusModal';
import { useChangeStatusUserTypeMutation } from '@/services';
import { ToastType } from '@/shared/constants/common';
import { IUser } from '@/types';

interface IChangeStatusModalProps {
  userDetail: IUser | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

export default function ChangeStatusModal({
  userDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: IChangeStatusModalProps) {
  const changeStatusMutation = useChangeStatusUserTypeMutation();

  const handleDeleteCategory = () => {
    changeStatusMutation.mutate(
      {
        username: userDetail?.username as string,
        status: userDetail?.status as string,
      },
      {
        onSuccess: () => {
          toast(ToastType.Success, 'Thay đổi trạng thái thành công');
          handleRefetchData();
          closeModal();
        },
      }
    );
  };

  return (
    <ConfirmStatusModal
      isOpen={isOpen}
      isLoading={changeStatusMutation.isPending}
      closeModal={closeModal}
      confirmChange={handleDeleteCategory}
    />
  );
}
