import dynamic from "next/dynamic";
import React from "react";
const LinkIcon = dynamic(() => import("@heroicons/react/24/outline/LinkIcon"));
const TagIcon = dynamic(() => import("@heroicons/react/24/outline/TagIcon"));
const WFLinkComponent = ({ handleChange, index, formData }) => {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <TagIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          value={formData[index]?.label}
          type="text"
          name="label"
          placeholder="Label"
          onChange={handleChange}
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <LinkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          value={formData[index]?.url}
          type="url"
          name="url"
          onChange={handleChange}
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="URL"
        />
      </div>
    </div>
  );
};

export default WFLinkComponent;
