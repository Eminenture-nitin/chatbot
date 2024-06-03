import { useState } from "react";
import dynamic from "next/dynamic";
import { useReactFlow } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { actions, conditions, triggers } from "./workFlow/TRDataMain.constants";

const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));

const BottomSubMenusTR = ({
  activeTab,
  setActiveTab,
  setIsOpenBottomSubMenusTR,
}) => {
  const switchTab = (tab) => {
    setActiveTab(tab);
  };
  const { setNodes } = useReactFlow();
  return (
    <div className="fixed bottom-0 right-0 z-50 animate-fade-up bg-white p-4 border-t border-gray-200 w-[400px] h-2/3 overflow-auto">
      <div className="flex items-center justify-between mb-4 border-b rounded-t dark:border-gray-600">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => switchTab("triggers")}
            className={`mx-2 cursor-pointer px-4 py-2 rounded-lg focus:outline-none ${
              activeTab === "triggers"
                ? "bg-blue-400 text-white"
                : "text-gray-500"
            }`}
          >
            Triggers
          </button>
          <button
            onClick={() => switchTab("conditions")}
            className={`mx-2 cursor-pointer px-4 py-2 rounded-lg focus:outline-none ${
              activeTab === "conditions"
                ? "bg-blue-500 text-white"
                : "text-gray-500"
            }`}
          >
            Conditions
          </button>
          <button
            onClick={() => switchTab("actions")}
            className={`mx-2 cursor-pointer px-4 py-2 rounded-lg focus:outline-none ${
              activeTab === "actions"
                ? "bg-purple-600 text-white"
                : "text-gray-500"
            }`}
          >
            Actions
          </button>

          <button
            onClick={() => setIsOpenBottomSubMenusTR(false)}
            className={`mx-2 px-4 py-2 rounded-lg focus:outline-none`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full">
        {activeTab === "triggers" && (
          <>
            <p className="mt-0 mb-2 font-normal text-sm leading-4 tracking-tight pt-2 px-3 pb-0 text-[#647491]">
              Choose how your visitors will be engaged by the Flow.
            </p>
            <div className="grid grid-cols-2 justify-between w-full">
              {triggers.map((trigger) => (
                <div
                  onClick={() => {
                    const locationX = Math.random() * 200;
                    const locationY = Math.random() * 200;
                    const newNode = {
                      id: uuidv4(),

                      position: { x: locationX, y: locationY },
                      data: {
                        triggerType: "triggers",
                        iconName: trigger.icon,
                        trigger_Name: trigger.label,
                        nodeHandles: trigger.nodeHandles,
                        decisiontrigger: trigger.decisiontrigger,
                        howItsWorksText: trigger.howItsWorksText,
                      },
                      type: "triggerComponent",
                    };
                    setNodes((prevNodes) => [...prevNodes, newNode]);
                  }}
                  key={trigger.id}
                  className="flex justify-start items-center gap-2 cursor-pointer p-2 h-auto w-full"
                >
                  {trigger.icon && (
                    <trigger.icon className="w-9 h-9 bg-blue-400 text-white p-2 rounded-full" />
                  )}
                  <span className="text-sm">{trigger.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="grid grid-cols-2 justify-between w-full">
          {activeTab === "actions" &&
            actions.map((action) => (
              <div
                onClick={() => {
                  const locationX = Math.random() * 200;
                  const locationY = Math.random() * 200;
                  const newNode = {
                    id: uuidv4(),

                    position: { x: locationX, y: locationY },
                    data: {
                      triggerType: "actions",
                      iconName: action.icon,
                      trigger_Name: action.label,
                      nodeHandles: action.nodeHandles,
                      decisiontrigger: action.decisiontrigger,
                      howItsWorksText: action.howItsWorksText,
                    },
                    type: "triggerComponent",
                  };
                  setNodes((prevNodes) => [...prevNodes, newNode]);
                }}
                key={action.id}
                className="flex justify-start items-center gap-2 cursor-pointer p-2 h-auto w-full"
              >
                {action.icon && (
                  <action.icon className="w-9 h-9 bg-purple-500 text-white p-2 rounded-full" />
                )}
                <span className="text-sm">{action.label}</span>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 justify-between w-full">
          {activeTab === "conditions" &&
            conditions.map((condition) => (
              <div
                onClick={() => {
                  const locationX = Math.random() * 200;
                  const locationY = Math.random() * 200;
                  const newNode = {
                    id: uuidv4(),
                    position: { x: locationX, y: locationY },
                    data: {
                      triggerType: "conditions",
                      iconName: condition.icon,
                      trigger_Name: condition.label,
                      nodeHandles: condition.nodeHandles,
                      decisiontrigger: condition.decisiontrigger,
                      howItsWorksText: condition.howItsWorksText,
                    },
                    type: "triggerComponent",
                  };
                  setNodes((prevNodes) => [...prevNodes, newNode]);
                }}
                key={condition.id}
                className="flex justify-start items-center gap-2 cursor-pointer p-2 h-auto w-full"
              >
                {condition.icon && (
                  <condition.icon className="w-9 h-9 bg-orange-400 text-white p-2 rounded-full" />
                )}
                <span className="text-sm">{condition.label}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default BottomSubMenusTR;
