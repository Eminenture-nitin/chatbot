import React, { useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import WFImageInputTag from "./WFImageInputTag";
import WFLinkComponent from "./WFLinkComponent";

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
  const [showFeidlsOptions, setShowFeildsOpstions] = useState(false);
  const [formData, setFormData] = useState({ urlLabels: [] });
  const [showImg, setShowImg] = useState(false);

  const [tags, setTags] = useState([]);

  const addTag = (tagsType) => {
    setTags((prevTags) => [...prevTags, { id: uuidv4(), tagsType }]);
  };

  const removeTag = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id != id));
  };

  const handleSubmit = (e) => {
    e.preventDefualt();
  };

  return (
    <>
      <form className="w-full h-full" onSubmit={handleSubmit}>
        <div className="w-full relative">
          {tags?.map((tag) => (
            <>
              {tag.tagsType == "textTags" ? (
                <div key={tag.id} className="group mb-2 relative">
                  <textarea
                    id="message"
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500 resize-none"
                    placeholder="type a message that will sent a visitor..."
                  ></textarea>
                  <button
                    type="button"
                    className="group-hover:block hidden absolute top-1/2 -right-5 -translate-y-1/2"
                    onClick={() => removeTag(tag.id)}
                  >
                    <TrashIcon className="text-red-500 w-5 h-4/5" />
                  </button>
                </div>
              ) : tag.tagsType == "imageTags" ? (
                <div key={tag.id} className="group mb-2 relative">
                  <WFImageInputTag
                    showImg={showImg}
                    setShowImg={setShowImg}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <button
                    type="button"
                    className="group-hover:block hidden absolute top-1/2 -right-5 -translate-y-1/2"
                    onClick={() => removeTag(tag.id)}
                  >
                    <TrashIcon className="text-red-400 w-5 h-4/5 group-hover-block " />
                  </button>
                </div>
              ) : (
                <div key={tag.id} className="group mb-2 relative">
                  <WFLinkComponent
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
            </>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowFeildsOpstions(!showFeidlsOptions)}
          disabled={tags?.length === 5}
          className="w-full py-2 px-0 mt-2 grid place-items-center me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <PlusCircleIcon className="w-7 h-7 text-blue-500" />
        </button>

        {showFeidlsOptions && (
          <div className="grid place-items-center w-full">
            <div className="w-2/3 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700">
              <div className="py-2 px-1 w-full text-gray-900 md:pb-4 dark:text-white">
                <ul
                  className="space-y-1 w-full"
                  aria-labelledby="mega-menu-dropdown-button text-center"
                >
                  <li
                    onClick={() => {
                      addTag("textTags");
                      setShowFeildsOpstions(false);
                    }}
                    className="flex px-1 py-2 gap-1 hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <buttobutton
                      type="button"
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                    >
                      text
                    </buttobutton>
                  </li>
                  <li
                    onClick={() => {
                      addTag("imageTags");
                      setShowFeildsOpstions(false);
                    }}
                    className="flex px-1 py-2 gap-1 hover:bg-gray-100 w-full cursor-pointer"
                  >
                    <PhotoIcon className="w-6 h-6 text-gray-400" />
                    <button
                      type="button"
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                    >
                      images
                    </button>
                  </li>
                  <li
                    onClick={() => {
                      addTag("linkTags");
                      setShowFeildsOpstions(false);
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
      </form>
    </>
  );
};

export default WFSetTriggerResponseFrom;
