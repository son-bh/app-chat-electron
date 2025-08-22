import { useDeleteUserMutation } from '@/services';
import { ToastType } from '@/shared/constants/common';
import { IUser } from '@/types';
import { toast } from '@/components/toast';
import ConfirmDeleteModal from '@/components/ui/modal/ConfirmDeleteModal';

interface IDeleteUserModalProps {
  userDetail?: IUser | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

export default function DeleteUserModal({
  userDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: IDeleteUserModalProps) {
  const deleteUserMutation = useDeleteUserMutation();

  const handleDeleteAdmin = () => {
    deleteUserMutation.mutate(
      { username: userDetail?.username as string },
      {
        onSuccess: () => {
          toast(ToastType.Success, 'Xoá nhân sự thành công');
          handleRefetchData();
          closeModal();
        },
      }
    );
  };

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      isLoading={deleteUserMutation.isPending}
      closeModal={closeModal}
      confirmDelete={handleDeleteAdmin}
    />
  );
}
