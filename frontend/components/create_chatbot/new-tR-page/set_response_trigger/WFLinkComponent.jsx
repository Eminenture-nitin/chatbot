import React, { useState } from "react";
import dynamic from "next/dynamic";
const XCircleIcon = dynamic(import("@heroicons/react/24/solid/XCircleIcon"), {
  ssr: false,
});
const LinkIcon = dynamic(import("@heroicons/react/24/solid/LinkIcon"), {
  ssr: false,
});
const WFLinkComponent = ({ formData, setFormData }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputLink, setInputLink] = useState("");
  const handleAddValue = () => {
    if (inputValue.trim() !== "") {
      const newURLLable = {
        label: inputValue,
        link: inputLink,
      };
      setFormData({
        ...formData,
        urlLabels: [...formData.urlLabels, newURLLable],
      });
      setInputValue("");
      setInputLink("");
    } else {
      alert("Add text for the trigger");
    }
  };
  const handleRemoveValueUrlLabels = (indexToRemove) => {
    const updatedURLs = formData?.urlLabels?.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({ ...formData, urlLabels: updatedURLs });
  };
  return (
    <>
      <div className="md:flex md:items-center mb-4 animate-fade-up">
        <div className={`md:w-full w-full`}>
          <div
            className={`flex items-center border-b border-blue-500 py-2 gap-0`}
          >
            <div className="flex justify-between items-center">
              <input
                onChange={(e) => setInputValue(e.target.value)}
                className="w-1/2 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter link label"
                aria-label="label"
                value={inputValue}
              />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <LinkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  onChange={(e) => setInputLink(e.target.value)}
                  type="text"
                  id="input-group-1"
                  className=" text-blue-500 bg-gray-50 border-none border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter link "
                  value={inputLink}
                />
              </div>
            </div>
            <button
              onClick={handleAddValue}
              className="flex bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              add
            </button>
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap gap-2">
        {formData?.urlLabels?.map((elem, index) => (
          <li
            className="flex border border-blue-500 rounded-lg m-1 p-2 cursor-pointer gap-1"
            key={index}
          >
            <div className="relative">
              <span className="text-tooltip" title={elem.link}>
                {elem.label}
              </span>
            </div>
            <XCircleIcon
              className="w-5 h-5 text-red-500 mt-1"
              onClick={() => handleRemoveValueUrlLabels(index)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default WFLinkComponent;
