import { useLinksData } from "@/context/LinksDataContext";
import React, { useEffect } from "react";

const Themes = () => {
  const { setSubLinks } = useLinksData();
  useEffect(() => {
    setSubLinks({
      MainHeading: "Themes",
      data: [],
    });
  }, []);
  return <div>Themes</div>;
};

export default Themes;
