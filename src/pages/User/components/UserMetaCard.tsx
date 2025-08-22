import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import { CookiesStorage } from '@/shared/utils/cookie-storage';
import { StorageKeys } from '@/shared/constants/storage-keys';
import InputController from '@/components/form/controller/InputController';
import { ChangePasswordSchema } from '@/shared/constants/validation';
import Button from '@/components/ui/button/Button';
import { useChangePasswordMutation } from '@/services';
import { toast } from '@/components/toast';
import { USER_ROLE } from '@/configs';
import { useState } from 'react';
import { EyeCloseIcon, EyeIcon } from '@/icons';

interface FormValues {
  password: string;
  newPassword: string;
  passwordConf: string;
}

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const userInfo = CookiesStorage.getCookieData(StorageKeys.UserInfo);
  const changePasswordMutation = useChangePasswordMutation();
  const [isSecureTextEntry, setIsSecureTextEntry] = useState({
    password: false,
    newPassword: false,
    passwordConf: false,
  });

  const handleSave = (values: FormValues) => {
    changePasswordMutation.mutate(values, {
      onSuccess: () => {
        reset();
        toast('success', 'Đổi mật khẩu thành công');
      },
    });
    closeModal();
  };

  const { control, reset, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      passwordConf: '',
    },
  });

  const handleCloseModal = () => {
    closeModal();
    reset();
  };

  return (
    <>
      <div className='p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6'>
        <div className='flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between'>
          <div className='flex flex-col items-center w-full gap-6 xl:flex-row'>
            <div className='w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800'>
              <img src='/images/user/avatar.avif' alt='user' />
            </div>
            <div className='order-3 xl:order-2'>
              <h4 className='mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left'>
                {userInfo?.username}
              </h4>
              <div>{userInfo?.fullname}</div>
              <div className='flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {USER_ROLE[userInfo?.role as keyof typeof USER_ROLE]}
                </p>
                <div className='hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block'></div>
                <p
                  className={`text-sm ${
                    userInfo?.status === 'active'
                      ? 'text-green-500'
                      : 'text-gray-500'
                  }  dark:text-gray-400`}
                >
                  {userInfo?.team}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className='px-5 truncate flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto'
          >
            <svg
              className='fill-current min-w-[20px]'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z'
                fill=''
              />
            </svg>
            Đổi mật khẩu
          </button>
        </div>
      </div>
      <Modal
        title={
          <h4 className='text-2xl sm:text-xl font-bold text-white mb-1'>
            Đổi mật khẩu
          </h4>
        }
        footerContent={
          <div className='flex items-center gap-3 px-2 mt-6 justify-end'>
            <Button size='sm' variant='outline' onClick={handleCloseModal}>
              Huỷ
            </Button>
            <Button size='sm' onClick={handleSubmit(handleSave)}>
              Lưu
            </Button>
          </div>
        }
        isOpen={isOpen}
        onClose={closeModal}
        className='max-w-[700px] m-4'
      >
        <div className='lg:p-4'>
          <form className='flex flex-col'>
            <div className='px-2 custom-scrollbar space-y-4'>
              <InputController
                type={!isSecureTextEntry.password ? 'password' : 'text'}
                control={control}
                name='password'
                label='Mật khẩu cũ'
                required
                endAdornment={
                  <button
                    type='button'
                    onClick={() =>
                      setIsSecureTextEntry({
                        ...isSecureTextEntry,
                        password: !isSecureTextEntry.password,
                      })
                    }
                  >
                    {!isSecureTextEntry.password ? (
                      <EyeCloseIcon className='fill-gray-900 dark:fill-gray-900 size-5' />
                    ) : (
                      <EyeIcon className='fill-gray-900 dark:fill-gray-900 size-5' />
                    )}
                  </button>
                }
              />
              <InputController
                type={!isSecureTextEntry.newPassword ? 'password' : 'text'}
                control={control}
                name='newPassword'
                label='Mật khẩu mới'
                required
                endAdornment={
                  <button
                    type='button'
                    onClick={() =>
                      setIsSecureTextEntry({
                        ...isSecureTextEntry,
                        newPassword: !isSecureTextEntry.newPassword,
                      })
                    }
                  >
                    {!isSecureTextEntry.newPassword ? (
                      <EyeCloseIcon className='fill-gray-900 dark:fill-gray-900 size-5' />
                    ) : (
                      <EyeIcon className='fill-gray-900 dark:fill-gray-900 size-5' />
                    )}
                  </button>
                }
              />
              <InputController
                type={!isSecureTextEntry.passwordConf ? 'password' : 'text'}
                control={control}
                name='passwordConf'
                label='Nhập lại mật khẩu mới'
                required
                endAdornment={
                  <button
                    type='button'
                    onClick={() =>
                      setIsSecureTextEntry({
                        ...isSecureTextEntry,
                        passwordConf: !isSecureTextEntry.passwordConf,
                      })
                    }
                  >
                    {!isSecureTextEntry.passwordConf ? (
                      <EyeCloseIcon className='fill-gray-900 dark:fill-gray-900 size-5' />
                    ) : (
                      <EyeIcon className='fill-gray-900 dark:fill-gray-900 size-5' />
                    )}
                  </button>
                }
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
