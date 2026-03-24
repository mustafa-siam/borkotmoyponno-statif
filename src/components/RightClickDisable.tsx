"use client";
import { useEffect } from "react";

const RightClickDisable = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      const disableRightClick = (e: MouseEvent) => {
        e.preventDefault();
      };

      document.addEventListener("contextmenu", disableRightClick);

      return () => {
        document.removeEventListener("contextmenu", disableRightClick);
      };
    }
  }, []);

  return null;
};

export default RightClickDisable;
