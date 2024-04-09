import HeroComponent from "@/components/dashborad/HeroComponent";
import { useAuth } from "@/context/AuthContext";
import { useLinksData } from "@/context/LinksDataContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CreateChatbot = () => {
  const { hashedId } = useAuth();
  const router = useRouter();
  const { subLinks, setSubLinks } = useLinksData();
  useEffect(() => {
    setSubLinks({
      MainHeading: "Create Chatbot",
      data: [
        { label: "My chatbots", path: "" },
        { label: "Set Triggers & Response", path: "set-triggers-&-response" },
        { label: "Installation", path: "installation" },
      ],
      path: "/auth/dashboard/create-chatbot",
    });
  }, []);

  return (
    <div className="h-[85.5vh] overflow-auto">
      <HeroComponent />
      <div className="relative w-full max-w-screen-xl mx-auto">
        <img
          src="https://www.chatbot.com/integrations/chat-widget/header-image_huf319aa7c6d0a0516a785a2cbf8c1ba47_441075_1560x0_resize_lanczos_3.png"
          alt="hero"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default CreateChatbot;
