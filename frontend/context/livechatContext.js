import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// Live Chat context
const LiveChatContest = createContext();

//custom hook to access the chat state
export function useLiveChatData() {
  return useContext(LiveChatContest);
}

// ChatDataProvider component
export function LiveChatDataProvider({ children }) {
  const socket = useRef();
  const [users, setUsers] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [joinedChatAssistant, setJoinedChatAssistant] = useState({});
  const [activeChat, setActiveChat] = useState({ status: false, data: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const getLiveChatUsers = async (token, userId) => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_EMBOT_API}/live/get-users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        setUsers(res.data);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };
  const getLiveChatAssistants = async (token, userId) => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_EMBOT_API}/live/get-assistants/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAssistants(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const localStorageValue = localStorage.getItem("joinedChatAssistant");
    if (localStorageValue) {
      setJoinedChatAssistant(JSON.parse(localStorageValue));
    }
  }, []);

  return (
    <LiveChatContest.Provider
      value={{
        socket,
        users,
        getLiveChatUsers,
        assistants,
        setJoinedChatAssistant,
        joinedChatAssistant,
        getLiveChatAssistants,
        activeChat,
        setActiveChat,
        isLoading,
        isSoundPlaying,
        setIsSoundPlaying,
      }}
    >
      {children}
    </LiveChatContest.Provider>
  );
}
