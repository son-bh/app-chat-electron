import { SquarePenIcon, HorizontaLDots, InfoWhiteIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useState } from "react";
import Drawer from "../ui/drawer";

export function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)}>
        <HorizontaLDots className="size-6" />
      </button>
      <Dropdown
        isOpen={open}
        onClose={() => setOpen(false)}
        className="absolute top-4 right-0 w-[220px] rounded-2xl border border-gray-200 !bg-[#273F45] p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <ul className="flex flex-col gap-1">
          <li>
            <DropdownItem
              onItemClick={() => {
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 !text-white hover:!bg-transparent"
            >
              <SquarePenIcon className="size-6" /> Chỉnh sửa
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={() => {
                setIsOpenDrawer(true);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 !text-white hover:!bg-transparent "
            >
              <InfoWhiteIcon className="size-6" /> Thông tin
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
      <Drawer
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        side="right"
        title="Filters"
        wContainer="sm:w-[380px] w-full"
      >
        <div className="space-y-3">
          <label className="block text-sm">Keyword</label>
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Search..."
          />
          <button className="rounded-xl px-4 py-2 border shadow-sm">
            Apply
          </button>
        </div>
      </Drawer>
    </div>
  );
}
