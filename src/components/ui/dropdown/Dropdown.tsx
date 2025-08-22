import React, { useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  anchorRef?: React.RefObject<HTMLElement>;
  closeOnEsc?: boolean;
  clickEvent?: "mousedown" | "click" | "pointerdown";
  duration?: number;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className = "",
      anchorRef,
      closeOnEsc = true,
      clickEvent = "mousedown",
      duration = 0.15
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLDivElement>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    useEffect(() => {
      if (!isOpen) return;

      const handleOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const insideDropdown = !!localRef.current && localRef.current.contains(target);
        const insideAnchor = !!anchorRef?.current && anchorRef.current.contains(target);

        if (!insideDropdown && !insideAnchor) {
          onClose();
        }
      };

      document.addEventListener(clickEvent, handleOutside);
      return () => document.removeEventListener(clickEvent, handleOutside);
    }, [isOpen, onClose, anchorRef, clickEvent]);

    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [isOpen, closeOnEsc, onClose]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={setRefs}
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: duration, ease: "easeOut" }}
            className={`absolute right-0 z-40 mt-2 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
Dropdown.displayName = "Dropdown";
