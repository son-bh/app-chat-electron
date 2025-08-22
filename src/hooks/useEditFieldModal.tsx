import { UpdateType } from "@/types";
import { useState } from "react";

interface EditFieldState {
  isOpen: boolean;
  fieldType: UpdateType;
  currentValue: string;
}

export function useEditFieldModal() {
  const [editFieldModal, setEditFieldModal] = useState<EditFieldState>({
    isOpen: false,
    fieldType: "fullname",
    currentValue: "",
  });

  const openEditFieldModal = (fieldType: UpdateType, currentValue: string) => {
    setEditFieldModal({
      isOpen: true,
      fieldType,
      currentValue,
    });
  };

  const closeEditFieldModal = () => {
    setEditFieldModal((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    editFieldModal,
    openEditFieldModal,
    closeEditFieldModal,
  };
}
