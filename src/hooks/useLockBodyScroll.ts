import { useEffect } from "react";

export const useLockBodyScroll = (locked: boolean) => {
    useEffect(() => {
      const original = document.body.style.overflow;
      if (locked) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = original;
      };
    }, [locked]);
  }