import dynamic from "next/dynamic";
import React from "react";
const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));
const TriggerFormPopup = ({ setIsActiveBottomTRForm }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 animate-fade-up bg-white p-4 border-t border-gray-200 w-[400px] h-2/3 overflow-auto">
      <div className="flex items-center justify-between mb-4 border-b rounded-t dark:border-gray-600">
        Trigger Input from Accourdigng to trigger
        <button
          onClick={() => {
            setIsActiveBottomTRForm({ status: false, label: null });
          }}
          className={`mx-2 px-4 py-2 rounded-lg focus:outline-none`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TriggerFormPopup;
