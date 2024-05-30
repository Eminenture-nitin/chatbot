import { act, useState } from "react";
import dynamic from "next/dynamic";
import { useReactFlow } from "reactflow";
import { v4 as uuidv4 } from "uuid";
const HomeIcon = dynamic(() => import("@heroicons/react/24/solid/HomeIcon"));
const ChatBubbleLeftIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ChatBubbleLeftIcon")
);
const ChatBubbleLeftRightIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ChatBubbleLeftRightIcon")
);
const QuestionMarkCircleIcon = dynamic(() =>
  import("@heroicons/react/24/solid/QuestionMarkCircleIcon")
);
const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));
const ClockIcon = dynamic(() => import("@heroicons/react/24/solid/ClockIcon"));
const CursorArrowRaysIcon = dynamic(() =>
  import("@heroicons/react/24/solid/CursorArrowRaysIcon")
);
const ServerStackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/ServerStackIcon")
);
const Square2StackIcon = dynamic(() =>
  import("@heroicons/react/24/solid/Square2StackIcon")
);

const triggers = [
  { label: "First visit on site", icon: HomeIcon, id: 1 },
  { label: "Visitor click on chatbot", icon: ChatBubbleLeftIcon, id: 2 },
];
const actions = [
  { label: "Send a chat", icon: ChatBubbleLeftRightIcon, id: 1 },
  { label: "Ask a question", icon: QuestionMarkCircleIcon, id: 2 },
  { label: "Decision (Buttons)", icon: ServerStackIcon, id: 3 },
  { label: "Decision (Card Messages)", icon: Square2StackIcon, id: 4 },
  {
    label: "Custome Trigger and Response",
    icon: CursorArrowRaysIcon,
    id: 5,
  },
  { label: "Delay", icon: ClockIcon, id: 6 },
];
const conditions = [{ label: "if/else", icon: HomeIcon, id: 1 }];

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
    <div className="fixed bottom-0 right-0 z-50 bg-white p-4 border-t border-gray-200 w-[400px] h-2/3 overflow-auto">
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

      <div className="grid grid-cols-2 justify-between w-full">
        {activeTab === "triggers" &&
          triggers.map((trigger) => (
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
                  },
                  type: "triggerComponent",
                };
                setNodes((prevNodes) => [...prevNodes, newNode]);
              }}
              key={condition.id}
              className="flex justify-start items-center gap-2 cursor-pointer p-2 h-auto w-full"
            >
              {condition.icon && (
                <condition.icon className="w-9 h-9 bg-blue-500 text-white p-2 rounded-full" />
              )}
              <span className="text-sm">{condition.label}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default BottomSubMenusTR;
