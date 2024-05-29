import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import CustomeEdge from "./workFlow/CustomeEdge";

const initialNodes = [
  { id: "1", position: { x: 200, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 100, y: 200 }, data: { label: "2" } },
  { id: "3", position: { x: 400, y: 200 }, data: { label: "3" } },
  { id: "4", position: { x: 200, y: 400 }, data: { label: "4" } },
];

const initialEdges = [
  { id: "e1-1", source: "1", target: "2" },
  { id: "e1-1", source: "1", target: "3" },
  { id: "e1-2", source: "3", target: "4" },
];

const edgeTypes = {
  customeEdge: CustomeEdge,
};
const FlowChartComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => {
    const edge = {
      ...connection,
      animated: true,
      id: `${edges.length + 1}`,
      type: "customeEdge",
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  });

  return (
    <div className="w-full h-[85vh] overflow-y-auto relative border-1 border-gray-500">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <Background />
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
