


import React from "react";

const WFLinkComponent = ({ handleChange, index }) => {
  return (
    <div className="grid gap-2">
      <input
        type="text"
        name="label"
        placeholder="Label"
        onChange={handleChange}
        className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="url"
        name="url"
        placeholder="URL"
        onChange={handleChange}
        className="p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default WFLinkComponent;
