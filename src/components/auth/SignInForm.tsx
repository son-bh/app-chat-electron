import Button from '../ui/button/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import InputController from '../form/controller/InputController';
import { useLoginMutation } from '../../services/user';
import { CookiesStorage } from '../../shared/utils/cookie-storage';
import { StorageKeys } from '../../shared/constants/storage-keys';
import useUserStore from '../../store/userStore';
import { PATH_NAME } from '../../configs';
import { ErrorForm } from '@/shared/constants';
import { useState } from 'react';
import { EyeCloseIcon, EyeIcon } from '@/icons';

type FormValues = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required(ErrorForm.Required),
  password: yup.string().required(ErrorForm.Required),
});

export default function SignInForm() {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const setUserInfo = useUserStore(state => state.setUserInfo);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    loginMutation.mutate(
      { ...values },
      {
        onSuccess: response => {
          const { data, token } = response || {};

          CookiesStorage.setCookieData(StorageKeys.AccessToken, token);
          CookiesStorage.setCookieData(
            StorageKeys.UserInfo,
            JSON.stringify(data)
          );
          setUserInfo(data);

          navigate(PATH_NAME.HOME);
        },
      }
    );
  };

  return (
    <div className='flex flex-col flex-1 bg-[url(/images/background/sign-in-bg.webp)] bg-cover bg-center w-full h-full'>
      <div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
        <div
          className='py-12 px-8 bg-white rounded-2xl'
          // style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}
        >
          <div className='mb-5 sm:mb-8'>
            <h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
              Đăng nhập
            </h1>
          </div>
          <div>
            <form>
              <div className='space-y-6'>
                <InputController
                  control={control}
                  name='username'
                  label='Tài khoản'
                  required
                />
                <InputController
                  type={!isSecureTextEntry ? 'password' : 'text'}
                  control={control}
                  name='password'
                  label='Mật khẩu'
                  required
                  endAdornment={
                    <button
                      type='button'
                      onClick={() => setIsSecureTextEntry(pre => !pre)}
                    >
                      {isSecureTextEntry ? (
                        <EyeCloseIcon className='fill-black dark:fill-black size-5' />
                      ) : (
                        <EyeIcon className='fill-black dark:fill-black size-5' />
                      )}
                    </button>
                  }
                />
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}
                <div>
                  <Button
                    className='w-full !bg-white !text-black border border-black'
                    size='sm'
                    isLoading={loginMutation.isPending}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
