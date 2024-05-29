import dynamic from "next/dynamic";
import React from "react";
import { BezierEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";
const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));

const CustomeEdge = (EdgeProps) => {
  return (
    <>
      <BezierEdge {...EdgeProps} />
      <EdgeLabelRenderer>
        <XMarkIcon className="w-5 h-5 text-red-500 bg-transparent" aria-label="Delete-Edge" />
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomeEdge;
