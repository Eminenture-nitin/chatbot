import React from "react";

const TableSkeleton = () => {
  return (
    <>
      <div className="p-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div className="flex items-center justify-between w-full gap-2">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-44 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
      <div className="p-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div className="flex items-center justify-between w-full gap-2">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-44 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default TableSkeleton;
