import React, { createContext, useContext, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
// Live Chat Socket context
const SocketContest = createContext();

//custom hook to access the chat Socket
export function useSocket() {
  return useContext(SocketContest);
}
const { userId, authJWTToken } = useAuth();
// SocketProvider component
export function LiveChatDataProvider({ children }) {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_EMBOT_API}`);
    // Connect as admin
    if (userId) {
      socket.current.emit("adminConnect", userId);
    }
    // return () => {
    //   socket.current.disconnect();
    // };
  }, [userId]);

  return (
    <SocketContest.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContest.Provider>
  );
}
