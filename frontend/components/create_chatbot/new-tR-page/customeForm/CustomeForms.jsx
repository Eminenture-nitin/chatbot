import dynamic from "next/dynamic";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomemDropDownComponent from "./CustomemDropDownComponent";
const XMarkIcon = dynamic(import("@heroicons/react/24/outline/XMarkIcon"));

const CustomeForms = () => {
  const [inputTags, setInputTags] = useState([
    {
      id: uuidv4(),
      inputType: "",
      inputTagType: "",
      required: false,
      placeholder: "",
      icon: "",
    },
  ]);

  return (
    <div>
      <form>
        <div className="inline mb-2">
          <textarea
            placeholder="Type in a message that will be sent to a visitor..."
            id="message"
            rows="3"
            maxLength={180}
            className="block mb-2 placeholder:text-md placeholder:italic text-md p-2.5 w-full text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <div className="inline mb-2">
          {inputTags?.map((input) => (
            <div key={input.id} className="inline mb-2">
              {input.inputType == "Long Text" ? (
                <textarea
                  name={input.inputType}
                  placeholder={input.placeholder}
                  rows="3"
                  maxLength={280}
                  className="block placeholder:text-md placeholder:italic text-md p-2.5 w-full text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
              ) : input.inputType == "Image" ? (
                <div className="inline mb-2"></div>
              ) : (
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <XMarkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type={input.inputTagType}
                    name={input.inputType}
                    className="bg-gray-50 placeholder:italic border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={input.placeholder}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <CustomemDropDownComponent />
      </form>
    </div>
  );
};

export default CustomeForms;
