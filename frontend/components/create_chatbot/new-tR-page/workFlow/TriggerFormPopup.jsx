import dynamic from "next/dynamic";
import React from "react";
import WFSetTriggerResponseFrom from "../set_response_trigger/WFSetTriggerResponseFrom";
import DecisionButtonsTrigger from "../Decision-button/DecisionButtonsTrigger";
import WFSliderTrigger from "../SliderTrigger/WFSliderTrigger";
const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));
const TriggerFormPopup = ({
  isActiveBottomTRForm,
  setIsActiveBottomTRForm,
}) => {
  console.log("isActiveBottomTRForm", isActiveBottomTRForm);

  const renderForms = () => {
    if (
      isActiveBottomTRForm.data.triggerType == "actions" &&
      isActiveBottomTRForm.data.trigger_Name == "Send a chat"
    ) {
      return <WFSetTriggerResponseFrom />;
    } else if (
      isActiveBottomTRForm.data.triggerType == "actions" &&
      isActiveBottomTRForm.data.trigger_Name == "Decision (Buttons)"
    ) {
      return <DecisionButtonsTrigger />;
    } else if (
      isActiveBottomTRForm.data.triggerType == "actions" &&
      isActiveBottomTRForm.data.trigger_Name == "Decision (Card Messages)"
    ) {
      return <WFSliderTrigger />;
    }
  };
  return (
    <div className="fixed bottom-0 right-0 z-50 animate-fade-up bg-white p-4 border-t border-gray-200 w-[450px] h-[75vh] overflow-y-auto">
      <div className="flex w-full bg-white top-0 items-center justify-between mb-4 border-b rounded-t dark:border-gray-600">
        <div className="flex justify-start items-center gap-2 cursor-pointer p-2 h-auto w-full">
          <isActiveBottomTRForm.data.iconName className="w-9 h-9 bg-purple-500 text-white p-2 rounded-full" />
          <span className="text-sm whitespace-nowrap">
            {isActiveBottomTRForm.data.triggerType} :
          </span>{" "}
          <span className="font-semibold whitespace-nowrap">
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
      <div className="relative">
        <div className="px-2">
          <span className="font-semibold my-1">How it works </span>
          <p className="mt-0 mb-2 font-normal text-sm leading-4 tracking-tight pt-2 pb-0 text-[#647491]">
            {isActiveBottomTRForm.data.howItsWorksText}
          </p>
          <span className="font-semibold my-1">Setup </span>
        </div>
        <div className="px-2">
          <div className="bg-[#f8f9fc] mt-2 w-full py-6 px-8  rounded-md h-full">
            {renderForms()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriggerFormPopup;
