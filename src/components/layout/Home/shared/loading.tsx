import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-[3px] border-gray-200 border-t-forest-green rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 text-sm font-medium">Please Wait...</p>
      </div>
    </div>
  );
};

export default Loading;
