// components/FacebookMessengerButton.tsx

"use client";

import React from "react";
import { FaFacebookMessenger } from "react-icons/fa6";

const FacebookMessengerButton = () => {
  const pageId = "qrinux"; // Replace with your actual Page ID

  const openMessenger = () => {
    window.open(
      `https://m.me/${pageId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={openMessenger}
      className="fixed cursor-pointer bottom-[80px] left-auto right-4 sm:right-8 z-50 bg-[#0084FF] hover:bg-[#0073E6] text-white p-3.5 shadow-md transition-colors duration-300 rounded-full flex items-center justify-center"
    >
      <FaFacebookMessenger className="h-5 w-5" />
    </button>
  );
};

export default FacebookMessengerButton;
