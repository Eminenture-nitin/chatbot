// import dynamic from "next/dynamic";
// import React from "react";
// import {
//   BezierEdge,
//   EdgeLabelRenderer,
//   EdgeProps,
//   getBezierPath,
//   useReactFlow,
// } from "reactflow";

// const XMarkIcon = dynamic(() => import("@heroicons/react/24/solid/XMarkIcon"));

// const CustomeEdge = (props) => {
//   const {
//     id,
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//     sourcePosition,
//     targetPosition,
//   } = props;

//   const { setEdges } = useReactFlow();

//   const [edgePath, labelX, labelY] = getBezierPath({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//     sourcePosition,
//     targetPosition,
//   });

//   return (
//     <>
//       <BezierEdge
//         {...props}
//         style={{
//           stroke: "#7e7e92",
//           strokeWidth: 4,
//           border: "4px solid #394f31",
//         }}
//       />
//       <EdgeLabelRenderer>
//         <XMarkIcon
//           onClick={() => {
//             setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
//           }}
//           className={`w-5 h-5 pointer-events-auto cursor-pointer text-red-500 bg-white rounded-full absolute transform -translate-x-1/2 -translate-y-1/2`}
//           style={{ transform: `translate(${labelX}px, ${labelY}px)` }}
//           aria-label="Delete-Edge"
//         />
//       </EdgeLabelRenderer>
//     </>
//   );
// };

// export default CustomeEdge;
import dynamic from "next/dynamic";
import React from "react";
import {
  BezierEdge,
  EdgeLabelRenderer,
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

  const arrowPath = `M ${targetX - 10} ${targetY} L ${
    targetX + 10
  } ${targetY} L ${targetX} ${targetY + 10} Z`;

  return (
    <>
      <path
        style={{
          stroke: "#7e7e92",
          strokeWidth: 4,
          fill: "none",
        }}
        d={edgePath}
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
      <path d={arrowPath} fill="#7e7e92" />
    </>
  );
};

export default CustomeEdge;
