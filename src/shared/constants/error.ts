export const ErrorForm = {
  Required: 'Trường này là bắt buộc',
  EmailInvalid: 'Email không đúng định dạng',
  MaximumPhoneLength: 'Số phone bao gồm 10 chữ số',
  MaximumUsernameLength: 'Mật khẩu từ 5 đến 30 ký tự',
  MaximumPasswordLength: 'Mật khẩu từ 8 đến 20 ký tự',
  MinZero: 'Vui lòng nhập số lớn hơn hoặc bằng 0 ',
  MinMoney: 'Số tiền tối thiểu là 1.000 vnd',
  TypeOfInteger: 'Phải là số nguyên',
  TypeOfNumber: 'Phải là số',
  CodeNumberLength: 'Code number must be from 8 to 20 symbol',
  PasswordInvalid:
    'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
  PasswordNotSame: 'Mật khẩu xác nhận phải giống với mật khẩu mới',
  MaximumAge: 'Bạn phải lớn hơn 18 tuổi',
  MinDate: 'Ngày chuyển chính phải sau hoặc bằng ngày nhận việc',
  // MinMoney: amount => `Số xu phải lớn hơn hoặc bằng ${amount}`,
  // MaxMoney: amount => `Số xu phải nhỏ hơn hoặc bằng ${amount}`,
  // MaxLength: length => `Bạn được nhập tối đa ${length} ký tự`,
};

export const ErrorApi = {
  ['token expired']: 'Phiên đăng nhập đã hết hạn',
  WRONG_USERNAME_OR_PASSWORD: 'Tên đăng nhập hoặc mật khẩu sai',
  THE_USERNAME_OR_EMAIL_EXISTED: 'Tài khoản này đã tồn tại',
  YOUR_INFORMATION_IS_WAITING_APPROVAL_OR_APPROVED:
    'Thông tin của bạn đang chờ phê duyệt hoặc được phê duyệt',
  ['Wrong_Password.']: 'Mật khẩu hiện tại chưa đúng',
  THE_WEBSITE_AD_UNIT_IS_INVALID: 'Đơn vị quảng cáo web không hợp lệ',
  THE_WEBSITE_URL_IS_INVALID: 'Địa chỉ website không hợp lệ',
  WEBSITE_ALREADY_EXISTS: 'Trang web này đã tồn tại',
  WRONG_PASSWORD: 'Mật khẩu không đúng',
  USERNAME_INVALID_FORMAT: 'Tên đăng nhập không hợp lệ',
  MEMBER_NOT_ENOUGH_BALANCE:
    'Số dư của bạn không đủ để thực hiện giao dịch này',
  THE_USERNAME_EXISTED: 'Tên đăng nhập này đã tồn tại',
  ['Wrong username or password.']: 'Tên đăng nhập hoặc mật khẩu không đúng',
  SYSTEM_UNSTABLE_PLS_TRY_AGAIN: 'Hệ thống không ổn định xin vui lòng chờ đợi',
  NAME_EXISTED: 'Tên đã tồn tại',
  PHONE_OUT_OF_STOCK: 'Hết số điện thoại, vui lòng chờ bổ sung thêm.',
  SELLER_NOT_FOUND: 'Seller not found',
  MEMBER_NOT_FOUND: 'Member not found',
  EMPLOYEE_BENEFIT_NOT_FOUND: 'Nhân viên chưa có chính sách lương',
};
