import classNames from "classnames";
import { FC, ReactNode, useEffect, useRef } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: "left" | "right";
  wContainer?: string;
  className?: string;
}

const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  side = "right",
  wContainer = "w-96",
  className,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const sideClass = side === "left" ? "left-0" : "right-0";
  const transformClass =
    side === "left"
      ? "transform -translate-x-full"
      : "transform translate-x-full";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity duration-500 z-[99]"
          onClick={onClose}
        />
      )}

      <div
        ref={drawerRef}
        className={`fixed top-0 bottom-0  max-sm:right-0 bg-white shadow-lg transition-transform duration-500 ease-in-out z-[100] ${wContainer} ${sideClass} ${
          isOpen ? "transform translate-x-0" : transformClass
        }`}
      >
        <div
          className={classNames("overflow-y-auto h-[calc(100%)]", className)}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
