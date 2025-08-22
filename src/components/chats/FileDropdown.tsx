import { PaperclipIcon, ImageIcon, FileIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useState, useRef } from "react";

export function FileDropdown({
  onFileSelect,
}: {
  onFileSelect: (files: File[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const imageVideoInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
    onFileSelect(files);
    e.target.value = "";
  };

  return (
    <div className="relative">
      <button ref={toggleRef} type="button" onClick={() => setOpen(!open)}>
        <PaperclipIcon className="size-6" />
      </button>
      <Dropdown
        isOpen={open}
        onClose={() => setOpen(false)}
        anchorRef={toggleRef as React.RefObject<HTMLElement>}
        className="absolute w-[210px] bottom-10 left-0 rounded-2xl border border-gray-200 bg-white py-3 px-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <DropdownItem
          onItemClick={() => {
            setOpen(false);
            imageVideoInputRef.current?.click();
          }}
          className="flex items-center gap-3 px-3 py-2"
        >
          <ImageIcon className="size-6" /> Hình ảnh & Video
        </DropdownItem>
        <DropdownItem
          onItemClick={() => {
            setOpen(false);
            fileInputRef.current?.click();
          }}
          className="flex items-center gap-3 px-3 py-2"
        >
          <FileIcon className="size-6" /> File
        </DropdownItem>
      </Dropdown>

      <input
        type="file"
        ref={imageVideoInputRef}
        className="hidden"
        accept="image/*,video/*"
        multiple 
        onChange={handleSelect}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
        multiple   // cho phép chọn nhiều
        onChange={handleSelect}
      />
    </div>
  );
}
