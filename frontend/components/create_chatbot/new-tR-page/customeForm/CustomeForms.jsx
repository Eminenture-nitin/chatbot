import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomemDropDownComponent from "./CustomemDropDownComponent";

const XMarkIcon = dynamic(() =>
  import("@heroicons/react/24/outline/XMarkIcon")
);
const PencilSquareIcon = dynamic(() =>
  import("@heroicons/react/24/solid/PencilSquareIcon")
);
const UserIcon = dynamic(() => import("@heroicons/react/24/solid/UserIcon"));

const CustomeForms = () => {
  const [inputTags, setInputTags] = useState([
    {
      id: uuidv4(),
      inputType: "Text",
      inputTagType: "text",
      required: true,
      placeholder: "Enter Name",
      inputIcon: UserIcon,
    },
  ]);

  const [customFormData, setCustomFormData] = useState({
    titleText: "",
    inputTags: [],
  });
  const [activeEditTag, setActiveEditTag] = useState({ id: "", status: false });
  const [editPlaceholder, setEditPlaceholder] = useState("");
  const [editRequired, setEditRequired] = useState(false);

  const handleEditSubmit = (id) => {
    setInputTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === id
          ? { ...tag, placeholder: editPlaceholder, required: editRequired }
          : tag
      )
    );
    setActiveEditTag({ id: "", status: false });
  };
  const handleFromSubmit = (e) => {
    e.preventDefault();
    setCustomFormData((prevState) => ({
      ...prevState,
      inputTags: inputTags,
    }));
  };

  console.log(customFormData);
  return (
    <div className="px-2">
      <form onSubmit={handleFromSubmit}>
        <div className="grid items-center border-b border-blue-500 py-2 mb-2">
          <textarea
            className="mb-2 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="question"
            id="question"
            required
            onChange={(e) =>
              setCustomFormData((prevState) => ({
                ...prevState,
                titleText: e.target.value,
              }))
            }
            placeholder="Type in a message that will be sent to a visitor..."
            maxLength={280}
          />
        </div>
        <div className="inline mb-2 mt-2">
          {inputTags?.map((input) => (
            <div key={input.id} className="inline mb-2">
              {input.inputType === "Long Text" ? (
                <div className="relative">
                  <textarea
                    disabled
                    name={input.inputType}
                    placeholder={input.placeholder}
                    rows="3"
                    maxLength={280}
                    className="block placeholder:text-md placeholder:italic text-md p-2.5 w-full text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                  ></textarea>
                  <div className="absolute right-0 top-0 flex">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveEditTag({ id: input.id, status: true });
                        setEditPlaceholder(input.placeholder);
                        setEditRequired(input.required);
                      }}
                      className="bg-teal-100 text-teal-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-teal-400 border border-teal-400"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setInputTags((prevTags) =>
                          prevTags.filter((prev) => prev.id !== input.id)
                        )
                      }
                      className="bg-red-100 text-red-800 text-xs font-medium px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center max-w-sm mx-auto mb-2 group">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-auto cursor-pointer">
                      <input.inputIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      disabled
                      type={input.inputTagType}
                      className="bg-gray-50 focus:outline-none border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={input.placeholder}
                      name={input.inputType}
                    />
                  </div>
                  <div className="absolute right-1 hidden group-hover:block">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveEditTag({ id: input.id, status: true });
                        setEditPlaceholder(input.placeholder);
                        setEditRequired(input.required);
                      }}
                      className="bg-teal-100 text-teal-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-teal-400 border border-teal-400"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setInputTags((prevTags) =>
                          prevTags.filter((prev) => prev.id !== input.id)
                        )
                      }
                      className="bg-red-100 text-red-800 text-xs font-medium px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              {activeEditTag.id === input.id && activeEditTag.status && (
                <div className="mb-2 border p-4 rounded bg-gray-50 dark:bg-gray-800">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Edit Field Name or placeholder
                  </label>
                  <input
                    type="text"
                    value={editPlaceholder}
                    onChange={(e) => setEditPlaceholder(e.target.value)}
                    placeholder="Edit Placeholder"
                    className="bg-gray-50 focus:outline-none border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                  />
                  <div className="flex items-center mb-2">
                    <label className="text-sm mr-2">Required</label>
                    <input
                      type="checkbox"
                      checked={editRequired}
                      onChange={(e) => setEditRequired(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEditSubmit(input.id)}
                    className="bg-blue-500 w-full text-white py-1 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white py-1 px-4 rounded"
        >
          Save form format
        </button>
      </form>
      <CustomemDropDownComponent
        inputTags={inputTags}
        setInputTags={setInputTags}
      />
    </div>
  );
};

export default CustomeForms;
