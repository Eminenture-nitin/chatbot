import LiveUsersList from "@/components/live-users/LiveUsersList";
import { useLinksData } from "@/context/LinksDataContext";
import React, { useEffect } from "react";

const LiveUsers = () => {
  const { subLinks, setSubLinks } = useLinksData();
  useEffect(() => {
    setSubLinks({
      MainHeading: "Users",
      data: [
        { label: "All users", path: "" },
        { label: "Our Assistant", path: "our-assistants" },
      ],
      path: "/auth/dashboard/live-users",
    });
  }, []);

  return (
    <>
      <LiveUsersList />
    </>
  );
};

export default LiveUsers;
