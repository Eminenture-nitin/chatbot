import { useState } from "react";
import dynamic from "next/dynamic";

const XMarkIcon = dynamic(import("@heroicons/react/24/outline/XMarkIcon"));
const ShareIcon = dynamic(import("@heroicons/react/24/outline/ShareIcon"));
const LinkIcon = dynamic(import("@heroicons/react/24/outline/LinkIcon"));

export default function DecisionButtonsTrigger() {
  const [formData, setFormData] = useState({
    subTriggers: [],
    responseText: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubTriggerChange = (index, name, value) => {
    const newSubTriggers = [...formData.subTriggers];
    newSubTriggers[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      subTriggers: newSubTriggers,
    }));
  };

  const addSubTrigger = (type) => {
    if (formData.subTriggers.length < 3) {
      const newTrigger =
        type === "link" ? { type, label: "", url: "" } : { type, value: "" };
      setFormData((prevData) => ({
        ...prevData,
        subTriggers: [...prevData.subTriggers, newTrigger],
      }));
    }
  };

  const removeSubTrigger = (index) => {
    const newSubTriggers = formData.subTriggers.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      subTriggers: newSubTriggers,
    }));
  };

  const handleResponseTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= 280) {
      setFormData((prevData) => ({
        ...prevData,
        responseText: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <div className="mb-2 relative w-full h-auto">
        <textarea
          name="responseText"
          value={formData.responseText}
          onChange={handleResponseTextChange}
          placeholder="Enter response (max 280 characters)"
          maxLength="280"
          className="w-full p-2 border rounded"
        />
        <div className="text-right text-xs text-gray-500">
          {formData.responseText.length}/280
        </div>
      </div>

      <div className="mb-2 w-full">
        {formData.subTriggers.map((trigger, index) => (
          <div key={index} className="mb-2 flex items-center relative w-full">
            {trigger.type === "link" ? (
              <>
                <input
                  type="text"
                  value={trigger.label}
                  onChange={(e) =>
                    handleSubTriggerChange(index, "label", e.target.value)
                  }
                  name="label"
                  placeholder={`Link Label ${index + 1}`}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="url"
                  value={trigger.url}
                  onChange={(e) =>
                    handleSubTriggerChange(index, "url", e.target.value)
                  }
                  placeholder={`Link URL ${index + 1}`}
                  className="w-full p-2 border rounded"
                />
              </>
            ) : (
              <input
                type="text"
                value={trigger.value}
                onChange={(e) =>
                  handleSubTriggerChange(index, "value", e.target.value)
                }
                placeholder={`Trigger ${index + 1}`}
                className="w-full p-2 border rounded"
              />
            )}
            <button
              type="button"
              onClick={() => removeSubTrigger(index)}
              className="text-red-500 bg-gray-200 absolute -right-10 top-1/2 -translate-y-1/2"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
        {formData.subTriggers.length < 3 && (
          <div className="mt-2 flex">
            <button
              type="button"
              onClick={() => addSubTrigger("action")}
              className="flex items-center justify-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <ShareIcon className="w-5 h-5 rotate-90" />
              <span>Add Action</span>
            </button>
            <button
              type="button"
              onClick={() => addSubTrigger("link")}
              className="flex items-center justify-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <LinkIcon className="w-5 h-5" />
              <span>Add URL</span>
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="px-4 w-full py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
