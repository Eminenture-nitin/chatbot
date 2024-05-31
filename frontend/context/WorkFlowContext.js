import React, { createContext, useContext, useEffect, useState } from "react";

// WorkFlowContext context
const WorkFlowContext = createContext();

//custom hook to access the WorkFlowContext state
export function useWorkFlowContextData() {
  return useContext(WorkFlowContext);
}

// ChatDataProvider component
export function WorkFlowContextProvider({ children }) {
  const [isOpenBottomSubMenusTR, setIsOpenBottomSubMenusTR] = useState(false);
  const [isActiveBottomTRForm, setIsActiveBottomTRForm] = useState({
    status: false,
    label: "",
  });
  return (
    <WorkFlowContext.Provider
      value={{
        isActiveBottomTRForm,
        setIsActiveBottomTRForm,
        isOpenBottomSubMenusTR,
        setIsOpenBottomSubMenusTR,
      }}
    >
      {children}
    </WorkFlowContext.Provider>
  );
}
