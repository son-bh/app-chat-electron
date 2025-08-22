import { HorizontaLDots, SearchIcon } from '@/icons';

export function ChatHeader() {
  return (
    <div className="w-full py-4 px-6 flex items-center justify-between border-b shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
      <div className="flex items-center">
        <div className="rounded-full h-11 w-11 overflow-hidden">
          <img src="/images/user/avatar.avif" alt="User" />
        </div>
        <div className="ml-2">
          <h4 className="font-semibold">leducanh25</h4>
          <p>6 members</p>
        </div>
      </div>
      <div className="flex space-x-3">
        <button><SearchIcon className="size-6" /></button>
        <button><HorizontaLDots className="size-6" /></button>
      </div>
    </div>
  );
}
