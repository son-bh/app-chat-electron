import { LayoutWidthContext } from "@/context/LayoutContext";
import { useContext } from "react";

export const useLayoutWidth = () => {
  const context = useContext(LayoutWidthContext);
  if (!context) {
    throw new Error("useLayoutWidth must be used within a LayoutWidthProvider");
  }
  return context.width;
};
