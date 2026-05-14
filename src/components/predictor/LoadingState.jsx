import React from "react";

export default function LoadingState() {
  return (
    <div className="mt-8 border border-gray-200 rounded-[28px] p-6 bg-gray-50 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded-lg mb-5"></div>

      <div className="h-10 w-72 bg-gray-300 rounded-xl mb-4"></div>

      <div className="h-5 w-56 bg-gray-200 rounded-lg"></div>
    </div>
  );
}
