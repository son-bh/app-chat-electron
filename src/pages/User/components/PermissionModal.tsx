import { IUser } from '@/types';
import { Modal } from '@/components/ui/modal';
import Button from '@/components/ui/button/Button';
import { CheckboxController } from '@/components/form/controller';
import { useForm, useWatch } from 'react-hook-form';
import { permissions, ToastType } from '@/shared/constants';
import { useAssignPermissionsMutation } from '@/services';
import { useEffect } from 'react';
import { toast } from '@/components/toast';
import Checkbox from '@/components/form/input/Checkbox';

interface IPermissionModalModalProps {
  userDetail: IUser;
  isOpen: boolean;
  closeModal: () => void;
  refetch: () => void;
}

export default function PermissionModal({
  userDetail,
  isOpen,
  closeModal,
  refetch,
}: IPermissionModalModalProps) {
  const assignPermissionsMutation = useAssignPermissionsMutation();
  const { control, handleSubmit, reset, setValue } = useForm<any>({});

  // Theo dõi toàn bộ giá trị form
  const formValues = useWatch({ control });

  useEffect(() => {
    if (isOpen && userDetail?.permissions) {
      const defaultValues = userDetail.permissions.reduce(
        (acc: Record<string, boolean>, key: string) => {
          acc[key] = true;
          return acc;
        },
        {}
      );
      reset(defaultValues);
    }
  }, [isOpen, userDetail, reset]);

  const onSubmit = (values: any) => {
    const keysWithTrue = Object.entries(values)
      .filter(([_, value]) => value === true)
      .map(([key]) => key);

    const payload = {
      userId: userDetail?._id,
      permissions: keysWithTrue,
    };

    assignPermissionsMutation.mutate(payload, {
      onSuccess: () => {
        toast(ToastType.Success, 'Chỉnh quyền thành công.');
        refetch();
        closeModal();
      },
    });
  };

  const handleSelectAll = (checked: boolean, groupKey: string) => {
    const group = permissions.find(item => item.key === groupKey);
    if (group) {
      Object.keys(group.permissions).forEach(permKey => {
        setValue(permKey, checked);
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className='max-w-[600px] lg:max-w-[900px] m-4'
      isBackdropClose={false}
      footerContent={
        <div className='flex items-center justify-end gap-3 px-2 mt-6'>
          <Button
            size='sm'
            variant='outline'
            onClick={closeModal}
            className='px-12'
          >
            Đóng
          </Button>
          <Button
            className='bg-blue-500 px-12'
            size='sm'
            onClick={handleSubmit(onSubmit)}
          >
            Xác nhận
          </Button>
        </div>
      }
    >
      <div className='relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11'>
        <h4 className='mb-2 text-xl font-semibold text-gray-800 dark:text-white/90'>
          Cấp quyền truy cập
        </h4>

        <div className='mt-12'>
          <form>
            <div className='relative'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {permissions.map(permissionGroup => {
                  const groupKeys = Object.keys(permissionGroup.permissions);
                  const allChecked = groupKeys.every(
                    key => formValues?.[key]
                  ) as boolean;
                  // const someChecked = groupKeys.some((key) => formValues?.[key]) && !allChecked;

                  return (
                    <div key={permissionGroup.key}>
                      <div className='flex items-center mb-4'>
                        <p className='text-base mr-4'>
                          {permissionGroup.title}
                        </p>
                        <Checkbox
                          label='Chọn tất cả'
                          checked={allChecked}
                          onChange={checked =>
                            handleSelectAll(checked, permissionGroup.key)
                          }
                        />
                      </div>

                      {Object.entries(permissionGroup.permissions).map(
                        ([permKey, label]) => (
                          <CheckboxController
                            key={permKey}
                            control={control}
                            name={permKey}
                            label={label}
                            containerClassName='mb-4'
                          />
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
