import dynamic from "next/dynamic";
import React, { createContext, useContext, useEffect, useState } from "react";
const HomeIcon = dynamic(import("@heroicons/react/20/solid/HomeIcon"));
const SwatchIcon = dynamic(import("@heroicons/react/20/solid/SwatchIcon"));
const InboxArrowDownIcon = dynamic(
  import("@heroicons/react/20/solid/InboxArrowDownIcon")
);
const Cog8ToothIcon = dynamic(
  import("@heroicons/react/20/solid/Cog8ToothIcon")
);
const UserCircleIcon = dynamic(
  import("@heroicons/react/20/solid/UserCircleIcon")
);
const ChatBubbleLeftRightIcon = dynamic(
  import("@heroicons/react/20/solid/ChatBubbleLeftRightIcon")
);
const UserGroupIcon = dynamic(
  import("@heroicons/react/20/solid/UserGroupIcon")
);
const UserIcon = dynamic(import("@heroicons/react/20/solid/UserIcon"));
const LinksDataContest = createContext();

export function useLinksData() {
  return useContext(LinksDataContest);
}

export function LinksDataProvider({ children }) {
  const LinksData = [
    { name: "Dashboard", icon: HomeIcon, path: "", id: 1 },
    {
      name: "ChatBot",
      icon: ChatBubbleLeftRightIcon,
      path: "create-chatbot",
      id: 2,
    },
    {
      name: "Live Users",
      icon: UserGroupIcon,
      path: "live-users",
      id: 3,
    },
    { name: "Inbox", icon: InboxArrowDownIcon, path: "inbox", id: 4 },
    { name: "Profile", icon: UserCircleIcon, path: "profile", id: 6 },
    { name: "Theme", icon: SwatchIcon, path: "themes", id: 7 },
  ];

  const [open, setOpen] = useState(false);
  const [subLinks, setSubLinks] = useState({
    MainHeading: "Inbox",
    data: [],
    path: "",
  });
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    if (subLinks?.data?.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [subLinks]);
  return (
    <LinksDataContest.Provider
      value={{
        active,
        setActive,
        LinksData,
        subLinks,
        setSubLinks,
        open,
        setOpen,
      }}
    >
      {children}
    </LinksDataContest.Provider>
  );
}
