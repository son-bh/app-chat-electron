import classNames from 'classnames';
import { toast as toastify } from 'react-toastify';
import Toast from './Toast';
import { ToastType } from '../../shared/constants/common';

export const toast = (
  type: (typeof ToastType)[keyof typeof ToastType],
  message: string,
  toastId?: string | undefined,
  autoClose = 5000
) => {
  toastify.clearWaitingQueue();
  toastify.dismiss();
  setTimeout(() =>
    toastify(<Toast type={type} message={message} />, {
      toastId,
      autoClose,
      closeButton: true,
      closeOnClick: true,
      position: 'top-right',
      className: classNames('min-h-[58px] border-1 text-[#404040]', {
        'border-success-500 !bg-success-50': type === ToastType.Success,
        'border-error-500 !bg-error-50': type === ToastType.Error,
      }),
    })
  );
};
