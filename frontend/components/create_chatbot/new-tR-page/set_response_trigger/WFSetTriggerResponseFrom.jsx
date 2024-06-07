import React, { useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import WFImageInputTag from "./WFImageInputTag";
import WFLinkComponent from "./WFLinkComponent";
import { useWorkFlowContextData } from "@/context/WorkFlowContext";
import { useReactFlow } from "reactflow";

const PlusCircleIcon = dynamic(() =>
  import("@heroicons/react/24/solid/PlusCircleIcon")
);
const DocumentTextIcon = dynamic(() =>
  import("@heroicons/react/24/solid/DocumentTextIcon")
);
const PhotoIcon = dynamic(() => import("@heroicons/react/24/solid/PhotoIcon"));
const TrashIcon = dynamic(() => import("@heroicons/react/24/solid/TrashIcon"));
const LinkIcon = dynamic(() => import("@heroicons/react/24/solid/LinkIcon"));

const WFSetTriggerResponseFrom = () => {
  const [showFieldsOptions, setShowFieldsOptions] = useState(false);
  const [formData, setFormData] = useState({});
  const [tags, setTags] = useState([{ id: uuidv4(), tagsType: "textTags" }]);
  const { isActiveBottomTRForm } = useWorkFlowContextData();
  const { setNodes } = useReactFlow();
  const addTag = (tagsType) => {
    setTags((prevTags) => [...prevTags, { id: uuidv4(), tagsType }]);
  };

  const removeTag = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
    setFormData((prevData) => {
      const newData = { ...prevData };
      delete newData[id];
      return newData;
    });
  };

  const handleChange = (e, id) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [name]: files ? files[0] : value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <form className="w-full h-full" onSubmit={handleSubmit}>
        <div className="w-full relative">
          {tags?.map((tag, index) => (
            <div key={tag.id}>
              {tag.tagsType === "textTags" ? (
                <div className="group mb-2 relative">
                  <textarea
                    name="responseText"
                    onChange={(e) => handleChange(e, index)}
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 focus-visible:border-blue-500 resize-none"
                    placeholder="Type a message that will be sent to a visitor..."
                  ></textarea>
                  <button
                    type="button"
                    className="group-hover:block hidden absolute top-1/2 -right-5 -translate-y-1/2"
                    onClick={() => removeTag(tag.id)}
                  >
                    <TrashIcon className="text-red-500 w-5 h-4/5" />
                  </button>
                </div>
              ) : tag.tagsType === "imageTags" ? (
                <div className="group mb-2 relative">
                  <WFImageInputTag
                    index={index}
                    handleChange={(e) => handleChange(e, index)}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <button
                    type="button"
                    className="group-hover:block hidden absolute top-1/2 -right-5 -translate-y-1/2"
                    onClick={() => removeTag(tag.id)}
                  >
                    <TrashIcon className="text-red-400 w-5 h-4/5 group-hover-block" />
                  </button>
                </div>
              ) : (
                <div className="group mb-2 relative">
                  <WFLinkComponent
                    index={index}
                    handleChange={(e) => handleChange(e, index)}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <button
                    type="button"
                    className="group-hover:block hidden absolute top-1/2 -right-5 -translate-y-1/2"
                    onClick={() => removeTag(tag.id)}
                  >
                    <TrashIcon className="text-red-400 w-5 h-4/5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowFieldsOptions(!showFieldsOptions)}
          disabled={tags.length === 5}
          className="w-full py-2 px-0 mt-2 grid place-items-center me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <PlusCircleIcon className="w-7 h-7 text-blue-500" />
        </button>

        {showFieldsOptions && (
          <div className="grid place-items-center w-full">
            <div className="w-2/3 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700">
              <div className="py-2 px-1 w-full text-gray-900 md:pb-4 dark:text-white">
                <ul className="space-y-1 w-full">
                  <li
                    onClick={() => {
                      addTag("textTags");
                      setShowFieldsOptions(false);
                    }}
                    className="flex px-1 py-2 gap-1 hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                    >
                      Text
                    </button>
                  </li>
                  <li
                    onClick={() => {
                      addTag("imageTags");
                      setShowFieldsOptions(false);
                    }}
                    className="flex px-1 py-2 gap-1 hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <PhotoIcon className="w-6 h-6 text-gray-400" />
                    <button
                      type="button"
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                    >
                      Images
                    </button>
                  </li>
                  <li
                    onClick={() => {
                      addTag("linkTags");
                      setShowFieldsOptions(false);
                    }}
                    className="flex px-1 py-2 gap-1 hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <LinkIcon className="w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                    >
                      Links
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <div>
          <button
            type="submit"
            className="text-blue-700 w-full hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default WFSetTriggerResponseFrom;
