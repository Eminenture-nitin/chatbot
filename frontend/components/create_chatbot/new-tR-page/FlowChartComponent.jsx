import { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import MainMenuTCA from "@/components/create_chatbot/new-tR-page/MainMenuTCA";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "reactflow/dist/style.css";
import CustomeEdge from "./workFlow/CustomeEdge";
import TriggerComponent from "./workFlow/TriggerComponent";
import { initialEdges, initialNodes } from "./workFlow/Workflow.constants";
import BottomSubMenusTR from "./BottomSubMenusTR";
import { v4 as uuidv4 } from "uuid";
import TriggerFormPopup from "./workFlow/TriggerFormPopup";
import { useWorkFlowContextData } from "@/context/WorkFlowContext";
const edgeTypes = {
  customeEdge: CustomeEdge,
};

const nodeTypes = {
  triggerComponent: TriggerComponent,
};
const FlowChartComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [activeTab, setActiveTab] = useState("triggers");
  const {
    isActiveBottomTRForm,
    setIsActiveBottomTRForm,
    isOpenBottomSubMenusTR,
    setIsOpenBottomSubMenusTR,
  } = useWorkFlowContextData();
  const onConnect = useCallback((connection) => {
    const edge = {
      ...connection,
      id: uuidv4(),
      type: "customeEdge",
      label: "new edge ew edgeew edge",
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  });

  // useEffect(() => {
  //   console.log(nodes);
  // }, [nodes]);
  return (
    <div className="w-full h-[85vh] overflow-y-auto relative border-1 border-gray-500">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background variant="dots" />
        <div className="w-auto relative z-50">
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
          {isActiveBottomTRForm.status && (
            <TriggerFormPopup
              setIsActiveBottomTRForm={setIsActiveBottomTRForm}
              isActiveBottomTRForm={isActiveBottomTRForm}
            />
          )}
        </div>
      </ReactFlow>
      <style>{`
        .react-flow__panel a{
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default FlowChartComponent;
