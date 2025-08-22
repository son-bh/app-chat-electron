import { useState } from "react";
import { Modal } from "../ui/modal";
import { CookiesStorage } from "@/shared/utils/cookie-storage";
import { StorageKeys } from "@/shared/constants";
import { useSidebar } from "@/context/SidebarContext";
import classNames from "classnames";
import EditFieldModal from "./EditFieldModal";
import { useEditFieldModal } from "../../hooks/useEditFieldModal";
import SettingsModalHeader from "./SettingsModalHeader";
import ProfileEditMode from "./ProfileEditMode";
import ProfileViewMode from "./ProfileViewMode";
import { UpdateType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

interface EditData {
  fullname: string;
  username: string;
  phone: string;
  birthday: string;
}

export default function SettingModal({ isOpen, closeModal }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    fullname: "",
    username: "",
    phone: "",
    birthday: "",
  });

  const { editFieldModal, openEditFieldModal, closeEditFieldModal } =
    useEditFieldModal();
  const userInfo = CookiesStorage.getCookieData(StorageKeys.UserInfo);
  const { isMobile } = useSidebar();

  const handleCloseModal = () => {
    closeModal();
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setEditData({
      fullname: userInfo?.fullname,
      username: userInfo?.username,
      phone: userInfo?.phone,
      birthday: userInfo?.birthday,
    });
    setIsEditMode(true);
  };

  const handleBackFromEdit = () => {
    setIsEditMode(false);
  };

  const handleEditField = (fieldType: UpdateType) => {
    openEditFieldModal(fieldType, editData[fieldType]);
  };

  const handleSaveField = (fieldType: UpdateType, newValue: string) => {
    setEditData((prev) => ({
      ...prev,
      [fieldType]: newValue,
    }));
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Modal
            title={
              <SettingsModalHeader
                isEditMode={isEditMode}
                isMobile={isMobile}
                onEditClick={handleEditClick}
                onBackFromEdit={handleBackFromEdit}
                onCloseModal={handleCloseModal}
              />
            }
            isOpen={isOpen}
            onClose={handleCloseModal}
            className={classNames(
              isMobile ? "max-w-[1024px]" : "max-w-[400px]"
            )}
            showCloseButton={false}
            isFullscreen={isMobile ? true : false}
          >
            <motion.div
              key={isEditMode ? "edit" : "view"}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {isEditMode ? (
                <ProfileEditMode
                  userInfo={userInfo}
                  editData={editData}
                  onEditField={handleEditField}
                />
              ) : (
                <ProfileViewMode userInfo={userInfo} />
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <EditFieldModal
        isOpen={editFieldModal.isOpen}
        onClose={closeEditFieldModal}
        fieldType={editFieldModal.fieldType}
        currentValue={editFieldModal.currentValue}
        onSave={(newValue) => {
          if (editFieldModal.fieldType) {
            handleSaveField(editFieldModal.fieldType, newValue);
          }
        }}
      />
    </>
  );
}
