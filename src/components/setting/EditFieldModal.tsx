import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { FiUser } from "react-icons/fi";
import { toast } from "../toast";
import Button from "../ui/button/Button";
import { UpdateType } from "@/types";
import useUserStore from "@/store/userStore";
import { useChangeInformationMutation } from "@/services";
import { CookiesStorage } from "@/shared/utils/cookie-storage";
import { StorageKeys } from "@/shared/constants";

interface EditFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldType: UpdateType;
  currentValue: string;
  onSave: (value: string) => void;
}

export default function EditFieldModal({
  isOpen,
  onClose,
  fieldType,
  currentValue,
  onSave,
}: EditFieldModalProps) {
  const [value, setValue] = useState(currentValue);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const changeInformationMutation = useChangeInformationMutation();
  const getFieldConfig = () => {
    switch (fieldType) {
      case "fullname":
        return {
          title: "Tên đầy đủ",
          placeholder: "Nhập tên đầy đủ",
        };
      case "username":
        return {
          title: "Username",
          placeholder: "Nhập username",
        };
      case "phone":
        return {
          title: "Số điện thoại",
          placeholder: "Nhập số điện thoại",
        };
      case "birthday":
        return {
          title: "Sinh nhật",
          placeholder: "Nhập ngày sinh",
        };
      default:
        return { title: "", placeholder: "", icon: FiUser, description: "" };
    }
  };

  const config = getFieldConfig();

  useEffect(() => {
    if (isOpen) {
      setValue(currentValue);
    } else {
      setValue("");
    }
  }, [isOpen, currentValue]);
  const handleSave = () => {
    if (!value.trim() || value === currentValue) return;

    const payload = {
      [fieldType]: value,
    };

    changeInformationMutation.mutate(payload, {
      onSuccess: () => {
        const updatedUser = { ...useUserStore.getState().userInfo, ...payload };

        CookiesStorage.setCookieData(
          StorageKeys.UserInfo,
          JSON.stringify(updatedUser)
        );
        setUserInfo(updatedUser);

        onSave(value);
        onClose();
        toast("success", `Cập nhật ${config.title.toLowerCase()} thành công!`);
      },
      onError: (err: any) => {
        toast("error", err?.message || "Cập nhật thất bại!");
      },
    });
  };

  const handleClose = () => {
    setValue(currentValue);
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 w-full">
          <h4 className="text-lg font-medium text-gray-600 flex-1">
            Thay đổi {config.title.toLocaleLowerCase()}
          </h4>
        </div>
      }
      footerContent={
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={handleClose}
            variant="outline"
            size="sm"
            className="px-4 py-1 text-blue-500 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
          >
            Hủy
          </Button>
          <Button
            className="px-4 py-1 text-blue-500 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
            onClick={handleSave}
            size="sm"
            disabled={!value?.trim() || value === currentValue}
          >
            Lưu
          </Button>
        </div>
      }
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[360px]"
      showCloseButton={false}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-2 border-b-2 border-blue-500">
          <div className="flex-1">
            <label className="text-xs text-blue-500 block mb-1">
              {config.title}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full text-sm font-medium text-gray-900 bg-transparent border-none outline-none p-0  focus:ring-0 focus:border-none"
              placeholder={config.placeholder}
              autoFocus
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
