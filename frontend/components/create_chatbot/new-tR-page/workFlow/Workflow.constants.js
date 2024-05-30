import { Edge, Node } from "reactflow";
import dynamic from "next/dynamic";
const HomeIcon = dynamic(() => import("@heroicons/react/24/solid/HomeIcon"));
export const initialEdges = [];
export const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { iconName: HomeIcon, trigger_Name: "Set Initial Response" },
    type: "triggerComponent",
  },
];
