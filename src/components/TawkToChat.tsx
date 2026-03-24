"use client";
import { useEffect } from "react";
const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/68616538d818d7190e86bac2/1iuu76pv6";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(script, firstScriptTag);
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  return null;
};
export default TawkToChat;