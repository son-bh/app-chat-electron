import { createContext } from "react";

type LayoutWidthContextType = {
  width: number;
};

export const LayoutWidthContext = createContext<LayoutWidthContextType | undefined>(undefined);