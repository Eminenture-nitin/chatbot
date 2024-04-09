import { useChatData } from "@/context/ChatBotContest";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PreviewCard from "./PreviewCard";
import EditTriggerAndResponse from "./EditTriggerAndResponse";

const Preview = ({
  initialResponses,
  authJWTToken,
  setIsLoading,
  getChatBotData,
}) => {
  const chatBotContainerRef = useRef(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedData, setShowEditedData] = useState();
  const [tRData, setTRData] = useState({});

  const getParticularData = async (id) => {
    setIsLoading(true);
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_EMBOT_API}/chatbot/get-particular-data/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authJWTToken}`,
          },
        }
      );
      let data = await res.json();
      setTRData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleEditResponse = (id) => {
    getParticularData(id);
    setShowEditForm(true);
  };
  const handleDeleteResponse = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EMBOT_API}/chatbot/delete-data/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authJWTToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        toast.success(data.message, { theme: "dark" });
        setIsLoading(false);
        getChatBotData(authJWTToken);
      } else {
        toast.error(data.message, { theme: "dark" });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatBotContainerRef.current.scrollTop =
      chatBotContainerRef.current.scrollHeight;
  }, [initialResponses]);

  return (
    <>
      <div
        className="overflow-y-auto h-[80vh] rounded-md p-4"
        ref={chatBotContainerRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {initialResponses &&
          initialResponses?.map((response, index) => (
            <PreviewCard
              key={response._id}
              response={response}
              index={index}
              handleDeleteResponse={handleDeleteResponse}
              handleEditResponse={handleEditResponse}
              setIsLoading={setIsLoading}
            />
          ))}
      </div>

      {showEditForm && (
        <EditTriggerAndResponse
          setShowEditForm={setShowEditForm}
          tRData={tRData}
          setIsLoading={setIsLoading}
          authJWTToken={authJWTToken}
        />
      )}
    </>
  );
};

export default Preview;
