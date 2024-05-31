import dynamic from "next/dynamic";
import React from "react";
import WFSetTriggerResponseFrom from "./WFSetTriggerResponseFrom";
const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));
const TriggerFormPopup = ({
  isActiveBottomTRForm,
  setIsActiveBottomTRForm,
}) => {
  console.log(isActiveBottomTRForm, "isActiveBottomTRForm");
  return (
    <div className="fixed bottom-0 right-0 z-50 animate-fade-up bg-white p-4 border-t border-gray-200 w-[400px] h-2/3 overflow-auto">
      <div className="flex items-center justify-between mb-4 border-b rounded-t dark:border-gray-600">
        <div className="flex justify-start items-center gap-2 cursor-pointer p-2 h-auto w-full">
          <isActiveBottomTRForm.data.iconName className="w-9 h-9 bg-purple-500 text-white p-2 rounded-full" />
          <span className="text-sm">
            {isActiveBottomTRForm.data.triggerType} :
          </span>{" "}
          <span className="font-semibold">
            {" "}
            {isActiveBottomTRForm.data.trigger_Name}
          </span>
        </div>
        <button
          onClick={() => {
            setIsActiveBottomTRForm({ status: false, label: null });
          }}
          className={`mx-2 px-4 py-2 rounded-lg focus:outline-none`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="px-2">
        <span className="font-semibold my-1">How it works </span>
        <p class="mt-0 mb-2 font-normal text-sm leading-4 tracking-tight pt-2 pb-0 text-[#647491]">
          A chat message will be sent to the visitor after the last action
          occurs or is initiated.
        </p>
        <span className="font-semibold my-1">Setup </span>
        <div className="bg-[#f8f9fc] mt-2 w-full p-6 rounded-md">
          <WFSetTriggerResponseFrom />
        </div>
      </div>
    </div>
  );
};

export default TriggerFormPopup;
