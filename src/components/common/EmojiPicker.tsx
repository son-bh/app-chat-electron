import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SmileIcon } from "@/icons";
import { useEffect, useRef } from "react";
import { Emoji } from "@/types";

export function EmojiPicker({
  show,
  setShow,
  onSelect,
}: {
  show: boolean;
  setShow: (v: boolean) => void;
  onSelect: (emoji: Emoji) => void;
}) {
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    }
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <div className="relative">
      <button ref={btnRef} onClick={() => setShow(!show)} className="ml-4 text-xl">
        <SmileIcon className="size-6" />
      </button>
      {show && (
        <div ref={pickerRef} className="absolute bottom-10 right-0 z-50">
          <Picker data={data} onEmojiSelect={onSelect} theme="dark" />
        </div>
      )}
    </div>
  );
}
