import dynamic from "next/dynamic";
import React from "react";
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "reactflow";

const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));

const CustomeEdge = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BezierEdge
        {...props}
        style={{
          stroke: "#7e7e92", // Custom stroke color
          strokeWidth: 4, // Custom stroke width
          border: "4px solid #394f31", // Additional border styling if needed
        }}
      />
      <EdgeLabelRenderer>
        <XMarkIcon
          onClick={() => {
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
          }}
          className={`w-5 h-5 pointer-events-auto cursor-pointer text-red-500 bg-white rounded-full absolute transform -translate-x-1/2 -translate-y-1/2`}
          style={{ transform: `translate(${labelX}px, ${labelY}px)` }}
          aria-label="Delete-Edge"
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomeEdge;
