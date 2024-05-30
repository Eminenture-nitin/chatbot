// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import ReactFlow, {
//   Handle,
//   NodeProps,
//   Position,
//   useReactFlow,
// } from "reactflow";
// import CustomeHandle from "./CustomeHandle";

// const PencilSquareIcon = dynamic(
//   import("@heroicons/react/24/solid/PencilSquareIcon")
// );
// const XMarkIcon = dynamic(import("@heroicons/react/24/solid/XMarkIcon"));
// const TriggerComponent = ({ data, id }) => {
//   const { setNodes } = useReactFlow();
//   const [showEditDeleteBtns, setShowEditDeleteBtns] = useState(false);
//   return (
//     <>
//       <div className="relative flex flex-col justify-center items-center group align-middle group">
//         <button
//           type="button"
//           title="click for menu"
//           onClick={() => setShowEditDeleteBtns(!showEditDeleteBtns)}
//           className={`relative mb-2 align-middle border-4 border-white text-white bg-gradient-to-r  rounded-full text-center w-16 h-16 grid items-center justify-center ${
//             data.triggerType == "triggers"
//               ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
//               : "from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80"
//           }`}
//         >
//           <data.iconName className="w-7 h-7 text-center align-middle" />
//         </button>

//         <p
//           className={`z-10 group-hover:hidden block animate-fade-down absolute -bottom-11 w-max px-3 py-1.5 text-sm font-medium text-gray-800 rounded-lg shadow-sm duration-300 bg-white ${
//             data.triggerType == "triggers" ? "mb-0" : "mb-2"
//           }`}
//         >
//           {data.trigger_Name}
//         </p>
//         {showEditDeleteBtns && (
//           <div className="z-10 mb-0 animate-fade-up absolute left-12 -top-8 w-max px-2 py-1 text-sm font-medium text-gray-800 rounded-lg shadow-sm duration-100 bg-white">
//             <div className="flex justify-center items-center gap-2 relative z-[9999]">
//               <PencilSquareIcon
//                 onClick={() => console.log("Nodes Edit icon")}
//                 className="w-5 h-5 text-black cursor-pointer transition-all relative z-50 hover:text-blue-500"
//               />
//               <XMarkIcon
//                 onClick={() =>
//                   setNodes((prevNodes) =>
//                     prevNodes.filter((node) => node.id != id)
//                   )
//                 }
//                 className="w-5 h-5 hover:text-blue-500 transition-all text-black cursor-pointer relative z-50"
//               />
//             </div>
//           </div>
//         )}
//         {data.triggerType == "triggers" && (
//           <CustomeHandle
//             type="source"
//             position={Position.Bottom}
//             isConnectable={1}
//           />
//         )}
//         {data.triggerType == "actions" && (
//           <>
//             <CustomeHandle
//               type="target"
//               position={Position.Top}
//               isConnectable={1}
//             />
//             <CustomeHandle
//               type="source"
//               position={Position.Left}
//               isConnectable={1}
//             />
//             <CustomeHandle
//               type="source"
//               position={Position.Right}
//               isConnectable={1}
//             />
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default TriggerComponent;

import React, { useState } from "react";
import dynamic from "next/dynamic";
import ReactFlow, {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
} from "reactflow";
import CustomeHandle from "./CustomeHandle";

const PencilSquareIcon = dynamic(
  import("@heroicons/react/24/solid/PencilSquareIcon")
);
const XMarkIcon = dynamic(import("@heroicons/react/24/solid/XMarkIcon"));
const TriggerComponent = ({ data, id }) => {
  const { setNodes } = useReactFlow();
  const [showEditDeleteBtns, setShowEditDeleteBtns] = useState(false);
  return (
    <div className="relative flex flex-col justify-center items-center group align-middle">
      <button
        type="button"
        title="click for menu"
        onClick={() => setShowEditDeleteBtns(!showEditDeleteBtns)}
        className={`relative mb-2 align-middle border-4 border-white text-white bg-gradient-to-r  rounded-full text-center w-16 h-16 grid items-center justify-center ${
          data.triggerType === "triggers"
            ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
            : "from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80"
        }`}
      >
        <data.iconName className="w-7 h-7 text-center align-middle" />
      </button>

      <p
        className={`z-10 group-hover:hidden block animate-fade-down absolute -bottom-11 w-max px-3 py-1.5 text-sm font-medium text-gray-800 rounded-lg shadow-sm duration-300 bg-white ${
          data.triggerType === "triggers" ? "mb-0" : "mb-2"
        }`}
      >
        {data.trigger_Name}
      </p>

      {showEditDeleteBtns && (
        <div className="z-10 mb-0 animate-fade-up absolute left-12 -top-8 w-max px-2 py-1 text-sm font-medium text-gray-800 rounded-lg shadow-sm duration-100 bg-white">
          <div className="flex justify-center items-center gap-2 relative z-[9999]">
            <PencilSquareIcon
              onClick={() => console.log("Nodes Edit icon")}
              className="w-5 h-5 text-black cursor-pointer transition-all relative z-50 hover:text-blue-500"
            />
            <XMarkIcon
              onClick={() =>
                setNodes((prevNodes) =>
                  prevNodes.filter((node) => node.id !== id)
                )
              }
              className="w-5 h-5 hover:text-blue-500 transition-all text-black cursor-pointer relative z-50"
            />
          </div>
        </div>
      )}

      {data.triggerType === "triggers" && (
        <CustomeHandle
          type="source"
          position={Position.Bottom}
          isConnectable={1}
        />
      )}

      {data.triggerType === "actions" && (
        <>
          <CustomeHandle
            type="target"
            position={Position.Top}
            isConnectable={1}
          />
          <CustomeHandle
            type="source"
            position={Position.Left}
            isConnectable={1}
          />
          <CustomeHandle
            type="source"
            position={Position.Right}
            isConnectable={1}
          />
        </>
      )}
    </div>
  );
};

export default TriggerComponent;
