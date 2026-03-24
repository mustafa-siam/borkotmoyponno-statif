"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function GTMPageViewTracker() {
  const path = usePathname();

  useEffect(() => {
    window.dataLayer?.push({
      event: "page_view",
      page_path: path,
    });
  }, [path]);

  return null;
}

