import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDate, isAfter, isBefore } from 'date-fns';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { toast } from '@/components/toast';
import {
  isOfficialOption,
  RoleOptions,
  ToastType,
} from '@/shared/constants/common';
import {
  IUser,
  IOptionSelect,
  UserRole,
  IOptionSelectValueBoolean,
} from '@/types';
import { useCreateUserMutation, useUpdateUserMutation } from '@/services';
import { ErrorForm } from '@/shared/constants/error';
import { schemaTest } from '@/shared/constants';
import {
  generateUsernameFromEmail,
  maxDate,
  removeEmptyStrings,
} from '@/shared/utils/helpers';
import UpdateForm from './UpdateForm';
import CreateForm from './CreateForm';

interface IUserFormProps {
  userDetail?: IUser | null;
  isOpen: boolean;
  teamOptions: Array<IOptionSelect>;
  closeModal: () => void;
  handleRefetchData: () => void;
  handleOpenReset: () => void;
}

type FormValues = {
  email: string;
  role: IOptionSelect;
  teamId: IOptionSelect;
  username?: string;
  phone?: string;
  fullname?: string;
  onboardAt?: string;
  birthday: string;
  officialAt?: string;
  facebook?: string;
  discord?: string;
  telegram?: string;
  zalo?: string;
  gender?: string;
  isOfficial: IOptionSelectValueBoolean;
};

const defaultValues = {
  email: '',
  phone: '',
  fullname: '',
  username: '',
  role: undefined,
  teamId: undefined,
  onboardAt: '',
  birthday: '',
  officialAt: '',
  facebook: '',
  discord: '',
  telegram: '',
  zalo: '',
  gender: '',
  isOfficial: undefined,
};

const schemaBase = yup.object().shape({
  email: yup
    .string()
    .required(ErrorForm.Required)
    .test('validEmail', ErrorForm.EmailInvalid, schemaTest.isValidEmail),
  role: yup.mixed<IOptionSelect>().nullable().required(ErrorForm.Required),
  teamId: yup.mixed<IOptionSelect>().nullable().required(ErrorForm.Required),
  isOfficial: yup
    .mixed<IOptionSelectValueBoolean>()
    .required(ErrorForm.Required),
  birthday: yup
    .string()
    .required(ErrorForm.Required)
    .test(
      'isBirthDayValid',
      () => ErrorForm.MaximumAge,
      value => {
        return isBefore(value, maxDate(18));
      }
    ),
});

export default function UserForm({
  userDetail,
  isOpen,
  teamOptions,
  closeModal,
  handleRefetchData,
  handleOpenReset,
}: IUserFormProps) {
  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const schema = userDetail
    ? schemaBase.concat(
        yup.object().shape({
          phone: yup
            .string()
            .min(10, ErrorForm.MaximumPhoneLength)
            .max(10, ErrorForm.MaximumPhoneLength)
            .required(ErrorForm.Required),
          officialAt: yup.string().test(
            'isOfficialValid',
            () => ErrorForm.MinDate,
            (value, testContext) => {
              return value && testContext.parent.onboardAt
                ? isAfter(value, testContext.parent.onboardAt)
                : true;
            }
          ),
        })
      )
    : schemaBase;

  const { control, reset, handleSubmit, watch, setValue } = useForm<FormValues>(
    {
      defaultValues,
      resolver: yupResolver(schema),
    }
  );
  const watchEmail = watch('email');

  useEffect(() => {
    if (userDetail) {
      reset({
        email: userDetail.email,
        username: userDetail.username,
        phone: userDetail.phone,
        fullname: userDetail.fullname,
        role: RoleOptions.find(item => item.value === userDetail.role),
        isOfficial: isOfficialOption.find(
          item => item.value === userDetail.isOfficial
        ),
        teamId: teamOptions.find(item => item.value === userDetail.teamId?._id),
        birthday: userDetail.birthday,
        onboardAt: userDetail.onboardAt,
        officialAt: userDetail.officialAt,
        discord: userDetail?.social?.discord,
        facebook: userDetail?.social?.facebook,
        telegram: userDetail?.social?.telegram,
        zalo: userDetail?.social?.zalo,
        gender: userDetail?.gender,
      });
    }
  }, [userDetail, reset, teamOptions]);

  useEffect(() => {
    if (!userDetail) {
      setValue('username', generateUsernameFromEmail(watchEmail));
    }
  }, [watchEmail, userDetail]);

  const onSubmit = (values: FormValues) => {
    const cleanedValues = removeEmptyStrings(values);

    const dataSubmit = {
      ...cleanedValues,
      email: values.email,
      role: values?.role.value as UserRole,
      teamId: values?.teamId.value,
      isOfficial: values?.isOfficial?.value,
      ...(values?.birthday && {
        birthday: formatDate(values?.birthday, 'yyyy-MM-dd'),
      }),
      ...(values?.onboardAt && {
        onboardAt: formatDate(values?.onboardAt, 'yyyy-MM-dd'),
      }),
      ...(values?.officialAt && {
        officialAt: formatDate(values?.officialAt, 'yyyy-MM-dd'),
      }),
      social: {
        facebook: values?.facebook,
        zalo: values?.zalo,
        discord: values?.discord,
        telegram: values?.telegram,
      },
    };

    if (userDetail?.username) {
      updateUserMutation.mutate(dataSubmit, {
        onSuccess: () => {
          toast(ToastType.Success, 'Cập nhật nhân sự thành công');
          handleRefetchData();
          handleCloseModal();
        },
      });
      return;
    }

    createUserMutation.mutate(dataSubmit, {
      onSuccess: () => {
        toast(
          ToastType.Success,
          'Thêm nhân sự thành công, mật khẩu mặc định là:Human2025@'
        );
        handleRefetchData();
        handleCloseModal();
      },
    });
  };

  const handleCloseModal = () => {
    reset(defaultValues);
    closeModal();
  };

  return (
    <Modal
      title={
        <h4 className='text-2xl sm:text-xl font-bold text-white mb-1'>
          {userDetail ? 'Chỉnh sửa nhân sự' : 'Thêm nhân sự'}
        </h4>
      }
      footerContent={
        <div className='flex items-center justify-between mt-3'>
          <div>
            {userDetail && (
              <Button
                size='sm'
                isLoading={createUserMutation.isPending}
                onClick={handleOpenReset}
              >
                Đặt lại mật khẩu
              </Button>
            )}
          </div>
          <div className='flex items-center gap-3 px-2 lg:justify-end'>
            <Button size='sm' variant='outline' onClick={handleCloseModal}>
              Đóng
            </Button>
            <Button
              size='sm'
              isLoading={createUserMutation.isPending}
              onClick={handleSubmit(onSubmit)}
            >
              Lưu
            </Button>
          </div>
        </div>
      }
      isOpen={isOpen}
      onClose={handleCloseModal}
      className='max-w-[700px] m-4'
    >
      <div className='lg:p-4'>
        <form className='flex flex-col'>
          <div className='space-y-4'>
            {userDetail ? (
              <UpdateForm control={control} teamOptions={teamOptions} />
            ) : (
              <CreateForm control={control} teamOptions={teamOptions} />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
