import { DEVICES } from '@/configs/devices';
import { USER_TEAM } from '../../configs';
import { USER_ROLE_SUPER_ADMIN } from '@/configs/userRole';

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export const TINY_API_KEY = import.meta.env.VITE_TINY_API_KEY || '';

export const API_VERSION = '/api/v1';
export const API_URL = `${API_BASE_URL}/api/v1`;

export const PASSWORD_DEFAULT = 'Human2025@';

export const ToastType = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
} as const;

export const RoleOptions = (
  Object.keys(USER_ROLE_SUPER_ADMIN) as Array<
    keyof typeof USER_ROLE_SUPER_ADMIN
  >
).map(item => ({
  label: USER_ROLE_SUPER_ADMIN[item],
  value: item,
}));
export const DevicesOptions = (
  Object.keys(DEVICES) as Array<keyof typeof DEVICES>
).map(item => ({
  label: DEVICES[item],
  value: item,
}));
export const TeamOptions = (
  Object.keys(USER_TEAM) as Array<keyof typeof USER_TEAM>
).map(item => ({
  label: item,
  value: USER_TEAM[item],
}));

export const ModalType = {
  Upsert: 'upsert',
  Block: 'block',
  Delete: 'delete',
  Reset: 'reset',
  ChangeStatus: 'changeStatus',
  Detail: 'detail',
  Note: 'note',
  Permission: 'permission',
};

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCK: 'BLOCK',
};

export const SalaryStatus = {
  DRAFT: 'DRAFT',
  CONFIRMED: 'CONFIRMED',
  PAID: 'PAID',
};

export const StatusText = {
  [UserStatus.ACTIVE]: 'Hoạt động',
  [UserStatus.INACTIVE]: 'Không hoạt động',
  [UserStatus.BLOCK]: 'Khoá',
  [SalaryStatus.DRAFT]: 'Bản nháp',
  [SalaryStatus.CONFIRMED]: 'Đã xác nhận',
  [SalaryStatus.PAID]: 'Đã thanh toán',
};

// export const StatusColor = {
//   [UserStatus.ACTIVE ]: '!text-success-500 !border-success-500',
//   [UserStatus.INACTIVE]: '!text-warning-500 !border-warning-500',
//   [UserStatus.BLOCK]: '!text-error-500 !border-error-500',
// };
export const ACTION_SYSTEM_LOG = {
  APPROVED: 'APPROVED',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  CHANGE_STATUS: 'CHANGE_STATUS',
};

export const ACTION_SYSTEM_LOG_LABEL = {
  [ACTION_SYSTEM_LOG.APPROVED]: 'Duyệt',
  [ACTION_SYSTEM_LOG.CREATE]: 'Tạo',
  [ACTION_SYSTEM_LOG.UPDATE]: 'Cập nhật',
  [ACTION_SYSTEM_LOG.CHANGE_STATUS]: 'Thay đổi trạng thái',
  [ACTION_SYSTEM_LOG.DELETE]: 'Xóa',
};
export const REF_TYPE = {
  REQUEST_OFF: 'RequestOff',
  SCHEDULE: 'Schedule',
  TEAM: 'Team',
  SHIFT: 'Shift',
  EMPLOYEE_MATERIAL: 'EmployeeMaterial',
  EMPLOYEE_BENEFIT: 'EmployeeBenefit',
  BENEFIT_TEMPLATE: 'BenefitTemplate',
  POLICY: 'Policy',
  REQUEST_SCHEDULE: 'RequestSchedule',
  USER: 'User',
};
export const REF_TYPE_LABEL = {
  [REF_TYPE.REQUEST_OFF]: 'Nghỉ phép',
  [REF_TYPE.SCHEDULE]: 'Lịch làm việc',
  [REF_TYPE.TEAM]: 'Phòng ban',
  [REF_TYPE.SHIFT]: 'Ca làm việc',
  [REF_TYPE.EMPLOYEE_MATERIAL]: 'Dụng cụ làm việc',
  [REF_TYPE.EMPLOYEE_BENEFIT]: 'Phúc lợi nhân viên',
  [REF_TYPE.BENEFIT_TEMPLATE]: 'Quyền lợi',
  [REF_TYPE.POLICY]: 'Chính sách',
  [REF_TYPE.REQUEST_SCHEDULE]: 'Yêu cầu lịch trình',
  [REF_TYPE.USER]: 'Quản trị viên',
};

export const RefTypeOption = Object.keys(REF_TYPE).map(key => ({
  label: REF_TYPE_LABEL[REF_TYPE[key as keyof typeof REF_TYPE]],
  value: REF_TYPE[key as keyof typeof REF_TYPE],
}));

export const ActionSystemLogsOption = Object.keys(ACTION_SYSTEM_LOG).map(
  key => ({
    label: ACTION_SYSTEM_LOG_LABEL[key],
    value: key,
  })
);

export const UserStatusOption = Object.keys(UserStatus).map(key => ({
  label: StatusText[key],
  value: key,
}));

export const Status = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const StatusLabel = {
  [Status.PENDING]: 'Chờ duyệt',
  [Status.APPROVED]: 'Đã duyệt',
  [Status.REJECTED]: 'Từ chối',
};
export const StatusColor = {
  [UserStatus.ACTIVE]: '!text-success-500 !border-success-500',
  [UserStatus.INACTIVE]: '!text-warning-500 !border-warning-500',
  [UserStatus.BLOCK]: '!text-error-500 !border-error-500',

  [Status.APPROVED]: '!text-success-500 !border-success-500',
  [Status.PENDING]: '!text-warning-500 !border-warning-500',
  [Status.REJECTED]: '!text-error-500 !border-error-500',
  [ACTION_SYSTEM_LOG.CREATE]: '!text-success-500 !border-success-500',
  [ACTION_SYSTEM_LOG.UPDATE]: '!text-warning-500 !border-warning-500',
  [ACTION_SYSTEM_LOG.CHANGE_STATUS]: '!text-success-500 !border-success-500',
  [ACTION_SYSTEM_LOG.DELETE]: '!text-error-500 !border-error-500',
  [SalaryStatus.PAID]: '!text-success-500 !border-success-500',
  [SalaryStatus.CONFIRMED]: '!text-brand-500 !border-brand-500',
  [SalaryStatus.DRAFT]: '!text-warning-500 !border-warning-500',
};

export const StatusRequestBgColor = {
  [Status.APPROVED]: 'bg-success-200',
  [Status.PENDING]: 'bg-warning-200',
  [Status.REJECTED]: 'bg-error-200',
};

export const StatusOption = Object.keys(Status).map(key => ({
  label: StatusLabel[key],
  value: key,
}));

export const isOfficialOption = [
  {
    label: 'Chính thức',
    value: true,
  },
  {
    label: 'Thử việc',
    value: false,
  },
];

export const RequestOffCategory = {
  P: 'P',
  P2: 'P2',
  DB: 'DB',
  DB2: 'DB2',
  PN: 'PN',
  X: 'X',
  KL: 'KL',
  KL2: 'KL2',
};

export const RequestOffCategoryLabel = {
  [RequestOffCategory.P]: 'Nghỉ phép ngày',
  [RequestOffCategory.P2]: 'Nghỉ phép nửa ngày',
  [RequestOffCategory.DB]: 'Nghỉ đặc biệt',
  [RequestOffCategory.DB2]: 'Nghỉ nửa ngày đặc biệt buổi tối',
  [RequestOffCategory.PN]: 'Nghỉ phép năm',
  [RequestOffCategory.X]: 'Ngày đi làm bình thường',
  [RequestOffCategory.KL]: 'Nghỉ không lương',
  [RequestOffCategory.KL2]: 'Nghỉ nửa ngày không lương',
};

export const RequestOffCategoryOption = Object.keys(RequestOffCategory).map(
  key => ({
    label: RequestOffCategoryLabel[key],
    value: key,
  })
);

export const SalaryStatusOption = Object.keys(SalaryStatus).map(key => ({
  label: StatusText[key],
  value: key,
}));

export const EmployeeTypeOption = [
  {
    label: 'Chính thức',
    value: true,
  },
  {
    label: 'Thử việc',
    value: false,
  },
];

export const GenderText = {
  MALE: 'Nam',
  FEMALE: 'Nũ',
};

export const PERMISSIONS = {
  //TEAM
  VIEW_LIST_TEAM: 'Quyền xem danh sách bộ phận',
  CREATE_TEAM: 'Quyền thêm bộ phận',
  UPDATE_TEAM: 'Quyền chỉnh sửa bộ phận',
  DELETE_TEAM: 'Quyền xóa bộ phận',
  // NHÂN SỰ
  VIEW_LIST_EMPLOYEE: 'Quyền xem danh sách nhân sự',
  CREATE_EMPLOYEE: 'Quyền tạo tài khoản nhân sự',
  UPDATE_EMPLOYEE: 'Quyền chỉnh sửa tài khoản nhân sự',
  DELETE_EMPLOYEE: 'Quyền xóa tài khoản nhân sự',
  CHANGE_STATUS_EMPLOYEE: 'Quyền thay đổi trạng thái tài khoản nhân sự',
  RESET_PASSWORD_EMPLOYEE: 'Quyền đặt lại mật khẩu tài khoản nhân sự',
  VIEW_DETAIL_EMPLOYEE: 'Quyền xem thông tin chi tiết nhân sự',
  // CA
  VIEW_LIST_SHIFF: 'Quyền xem danh sách ca',
  CREATE_SHIFF: 'Quyền thêm ca',
  UPDATE_SHIFF: 'Quyền chỉnh sửa ca',
  DELETE_SHIFF: 'Quyền xóa ca',
  // LỊCH LÀM VIỆC
  VIEW_SCHEDULES: 'Quyền xem lịch làm việc của nhân viên',
  CREATE_SCHEDULE: 'Quyền phân ca cho nhân viên',
  DELETE_SCHEDULE: 'Quyền xóa ca cho nhân viên',
  //CHÍNH SÁCH LƯƠNG
  VIEW_BENEFIT: 'Quyền xem danh sách lương & phép',
  CREATE_BENEFIT: 'Quyền thêm mới chính sách lương & phép',
  UPDATE_BENEFIT: 'Quyền chỉnh sửa chính sách lương & phép',
  DELETE_BENEFIT: 'Quyền chỉnh xóa chính sách lương & phép',
  //LƯƠNG NHÂN VIÊN
  VIEW_EMPLOYEE_BENEFIT: 'Quyền xem danh sách lương & phép của nhân viên',
  CREATE_EMPLOYEE_BENEFIT: 'Quyền cài đặt lương & phép cho nhân viên',
  UPDATE_EMPLOYEE_BENEFIT: 'Quyền chỉnh sửa lương & phép của nhân viên',
  DELETE_EMPLOYEE_BENEFIT: 'Quyền xóa lương & phép của nhân viên',
  //QUẢN LÝ THIẾT BỊ
  VIEW_EMPLOYEE_MATERIAL: 'Quyền xem danh sách thiết bị được cấp cho nhân viên',
  CREATE_EMPLOYEE_MATERIAL: 'Quyền cấp thiết bị cho nhân viên',
  DELETE_EMPLOYEE_MATERIAL: 'Quyền thu hồi thiết bị cho nhân viên',
  //QUẢN LÝ IP
  VIEW_IPS: 'Quyền xem danh sách whitelist IP',
  CREATE_IP: 'Quyền thêm mới IP vào whitelist',
  DELETE_IP: 'Quyền xóa IP ra khỏi whitelist',
  WIEW_LOGS: 'Quyền xem lịch sử tác động hệ thống',
  WIEW_REQUESTS: 'Quyền xem yêu cầu nghỉ phép của nhân viên',
  APPROVE_REQUESTS: 'Quyền duyệt/ từ chối yêu cầu nghỉ phép của nhân viên',
  VIEW_HISTORY_EMPLOYEE: 'Quyền xem lịch sử chấm công của nhân viên',
};

export const permissions = [
  {
    title: 'Quản lý bộ phận',
    key: 'TEAM',
    permissions: {
      VIEW_LIST_TEAM: 'Quyền xem danh sách bộ phận',
      CREATE_TEAM: 'Quyền thêm bộ phận',
      UPDATE_TEAM: 'Quyền chỉnh sửa bộ phận',
      DELETE_TEAM: 'Quyền xóa bộ phận',
    },
  },
  {
    title: 'Quản lý nhân sự',
    key: 'EMPLOYEE',
    permissions: {
      VIEW_LIST_EMPLOYEE: 'Quyền xem danh sách nhân sự',
      CREATE_EMPLOYEE: 'Quyền tạo tài khoản nhân sự',
      UPDATE_EMPLOYEE: 'Quyền chỉnh sửa tài khoản nhân sự',
      DELETE_EMPLOYEE: 'Quyền xóa tài khoản nhân sự',
      CHANGE_STATUS_EMPLOYEE: 'Quyền thay đổi trạng thái tài khoản nhân sự',
      RESET_PASSWORD_EMPLOYEE: 'Quyền đặt lại mật khẩu tài khoản nhân sự',
      VIEW_DETAIL_EMPLOYEE: 'Quyền xem thông tin chi tiết nhân sự',
    },
  },
  {
    title: 'Quản lý ca',
    key: 'SHIFF',
    permissions: {
      VIEW_LIST_SHIFF: 'Quyền xem danh sách ca',
      CREATE_SHIFF: 'Quyền thêm ca',
      UPDATE_SHIFF: 'Quyền chỉnh sửa ca',
      DELETE_SHIFF: 'Quyền xóa ca',
      MANAGE_OUT_EARLY_LATE: 'Quyền xem yêu cầu xin về sớm, vào trễ',
    },
  },
  {
    title: 'Quản lý lịch làm việc',
    key: 'SCHEDULES',
    permissions: {
      VIEW_SCHEDULES: 'Quyền xem lịch làm việc của nhân viên',
      CREATE_SCHEDULE: 'Quyền phân ca cho nhân viên',
      DELETE_SCHEDULE: 'Quyền xóa ca cho nhân viên',
    },
  },
  {
    title: 'Quản lý chính sách lương',
    key: 'BENEFIT',
    permissions: {
      VIEW_BENEFIT: 'Quyền xem danh sách lương & phép',
      CREATE_BENEFIT: 'Quyền thêm mới chính sách lương & phép',
      UPDATE_BENEFIT: 'Quyền chỉnh sửa chính sách lương & phép',
      DELETE_BENEFIT: 'Quyền chỉnh xóa chính sách lương & phép',
    },
  },
  {
    title: 'Quản lý lương nhân viên',
    key: 'EMPLOYEE_BENEFIT',
    permissions: {
      VIEW_EMPLOYEE_BENEFIT: 'Quyền xem danh sách lương & phép của nhân viên',
      CREATE_EMPLOYEE_BENEFIT: 'Quyền cài đặt lương & phép cho nhân viên',
      UPDATE_EMPLOYEE_BENEFIT: 'Quyền chỉnh sửa lương & phép của nhân viên',
      DELETE_EMPLOYEE_BENEFIT: 'Quyền xóa lương & phép của nhân viên',
    },
  },
  {
    title: 'Quản lý thiết bị',
    key: 'EMPLOYEE_MATERIAL',
    permissions: {
      VIEW_EMPLOYEE_MATERIAL:
        'Quyền xem danh sách thiết bị được cấp cho nhân viên',
      CREATE_EMPLOYEE_MATERIAL: 'Quyền cấp thiết bị cho nhân viên',
      DELETE_EMPLOYEE_MATERIAL: 'Quyền thu hồi thiết bị cho nhân viên',
    },
  },
  {
    title: 'Quản lý IP',
    key: 'IPS',
    permissions: {
      VIEW_IPS: 'Quyền xem danh sách whitelist IP',
      CREATE_IP: 'Quyền thêm mới IP vào whitelist',
      DELETE_IP: 'Quyền xóa IP ra khỏi whitelist',
      WIEW_LOGS: 'Quyền xem lịch sử tác động hệ thống',
      WIEW_REQUESTS: 'Quyền xem yêu cầu nghỉ phép của nhân viên',
      APPROVE_REQUESTS: 'Quyền duyệt/ từ chối yêu cầu nghỉ phép của nhân viên',
      VIEW_HISTORY_EMPLOYEE: 'Quyền xem lịch sử chấm công của nhân viên',
    },
  },
];

export const RequestOutCategory = {
  LATE_CHECKIN: 'LATE_CHECKIN',
  EARLY_CHECKOUT: 'EARLY_CHECKOUT',
  BREAK_EARLY: 'BREAK_EARLY',
  BREAK_LATE: 'BREAK_LATE',
};

export const RequestOutCategoryLabel = {
  [RequestOutCategory.LATE_CHECKIN]: 'Xin vào ca trễ',
  [RequestOutCategory.EARLY_CHECKOUT]: 'Xin xuống ca sớm',
  [RequestOutCategory.BREAK_EARLY]: 'Xin nghỉ giữa ca sớm',
  [RequestOutCategory.BREAK_LATE]: 'Xin vào lại ca trễ',
};

export const RequestOutCategoryOption = Object.keys(RequestOutCategory).map(
  key => ({
    label: RequestOutCategoryLabel[key],
    value: key,
  })
);


export const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
] as const;