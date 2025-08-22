import { LayoutWidthContext } from "@/context/LayoutContext";
import React, { useEffect, useRef, useState } from "react";

export const LayoutWidthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!divRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(divRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <LayoutWidthContext.Provider value={{ width }}>
      <div ref={divRef} style={{ width: "100%" }}>
        {children}
      </div>
    </LayoutWidthContext.Provider>
  );
};
