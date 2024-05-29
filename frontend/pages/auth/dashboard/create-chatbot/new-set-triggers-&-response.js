import BottomSubMenusTR from "@/components/create_chatbot/new-tR-page/BottomSubMenusTR";
import FlowChartComponent from "@/components/create_chatbot/new-tR-page/FlowChartComponent";
import MainMenuTCA from "@/components/create_chatbot/new-tR-page/MainMenuTCA";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const New_set_triggers_and_response = () => {
  const [activeTab, setActiveTab] = useState("triggers");
  const [isOpenBottomSubMenusTR, setIsOpenBottomSubMenusTR] = useState(false);
  return (
    <div className="flex justify-between items-start w-full gap-1 px-5 pt-5 bg-[#dce9ff] h-[85vh]">
      <div className="w-full max-w-full h-full pr-0 flex justify-between relative">
        <div className="w-full">
          <FlowChartComponent />
        </div>
        <div className="w-auto">
          {isOpenBottomSubMenusTR ? (
            <BottomSubMenusTR
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsOpenBottomSubMenusTR={setIsOpenBottomSubMenusTR}
            />
          ) : (
            <MainMenuTCA
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsOpenBottomSubMenusTR={setIsOpenBottomSubMenusTR}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default New_set_triggers_and_response;
