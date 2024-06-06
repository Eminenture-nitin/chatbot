import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import icons
const EnvelopeIcon = dynamic(() =>
  import("@heroicons/react/24/outline/EnvelopeIcon")
);
const UserIcon = dynamic(() => import("@heroicons/react/24/outline/UserIcon"));
const PhotoIcon = dynamic(() =>
  import("@heroicons/react/24/outline/PhotoIcon")
);
const PhoneIcon = dynamic(() =>
  import("@heroicons/react/24/outline/PhoneIcon")
);
const LinkIcon = dynamic(() => import("@heroicons/react/24/outline/LinkIcon"));
const ClipboardDocumentIcon = dynamic(() =>
  import("@heroicons/react/24/outline/ClipboardDocumentIcon")
);
const DocumentTextIcon = dynamic(() =>
  import("@heroicons/react/24/outline/DocumentTextIcon")
);

const inputTypes = [
  { id: 1, inputIcon: UserIcon, inputType: "Name" },
  { id: 2, inputIcon: EnvelopeIcon, inputType: "Email" },
  { id: 3, inputIcon: "123", inputType: "Number" },
  { id: 4, inputIcon: "T", inputType: "Text" },
  { id: 5, inputIcon: ClipboardDocumentIcon, inputType: "Long Text" },
  { id: 6, inputIcon: LinkIcon, inputType: "URL" },
  { id: 7, inputIcon: PhotoIcon, inputType: "Image" },
];

const CustomemDropDownComponent = () => {
  const [selectedOption, setSelectedOption] = useState(inputTypes[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md shadow-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="flex items-center">
            {typeof selectedOption.inputIcon === "string" ? (
              <p className="mr-2 mt-0 mb-2 font-normal text-sm leading-4 tracking-tight pt-2 px-3 pb-0 text-[#647491]">
                {selectedOption.inputIcon}
              </p>
            ) : (
              <selectedOption.inputIcon className="w-5 h-5 mr-2" />
            )}
            {selectedOption.inputType}
          </span>
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {inputTypes.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                role="menuitem"
              >
                {typeof option.inputIcon === "string" ? (
                  <p
                    className={`${
                      option.inputType == "Text" ? "mr-4 ml-1" : "mr-2"
                    } text-md font-semibold leading-4 tracking-tight text-gray-500`}
                  >
                    {option.inputIcon}
                  </p>
                ) : (
                  <option.inputIcon className="w-5 h-5 mr-2" />
                )}
                <span>{option.inputType}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomemDropDownComponent;
