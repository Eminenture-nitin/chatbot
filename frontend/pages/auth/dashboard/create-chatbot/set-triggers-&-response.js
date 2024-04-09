import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useChatBotData } from "@/context/ChatBotContest";
import { useAuth } from "@/context/AuthContext";
import SuggestedTriggersList from "@/components/create_chatbot/SuggestedTriggersList";
import MultipleResponsePreveiw from "@/components/create_chatbot/MultipleResponsePreveiw";
const Preview = dynamic(import("@/components/create_chatbot/Preview"));
const TriggersResForm = dynamic(
  import("@/components/create_chatbot/TriggersResForm")
);
const Loder = dynamic(import("@/components/Loder"));

const SetTriggersRes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showST, setShowST] = useState(false);
  const { botData, getChatBotData } = useChatBotData();
  const { authJWTToken } = useAuth();
  const [enableMultipleRes, setEnableMultipleRes] = useState(false);
  const [formData, setFormData] = useState({
    triggerText: [],
    responseMsg: "",
    suggestedTrigger: [],
    urlLabels: [],
    attachmentImage: null,
    commonData: false,
    initialResponse: false,
    title: "",
    format: "slider",
  });
  const [mlp, setMLP] = useState({});
  const getparticularMultipleResponse = async (MulResponseId) => {
    const token = localStorage.getItem("EM_Token");
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_EMBOT_API}/chatbot/get-multiple-presponse/${MulResponseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await res.json();
      setMLP(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authJWTToken) {
      getChatBotData(authJWTToken);
    }
  }, [authJWTToken]);
  useEffect(() => {
    const MulResponseId = localStorage.getItem("MulResponseId");
    if (MulResponseId) {
      getparticularMultipleResponse(MulResponseId);
    }
  }, []);
  return (
    <>
      <div className="flex justify-between items-start w-full gap-1">
        <div className="w-1/2 max-w-lg pr-0">
          <TriggersResForm
            formData={formData}
            setFormData={setFormData}
            toast={toast}
            botData={botData}
            setIsLoading={setIsLoading}
            getChatBotData={getChatBotData}
            authJWTToken={authJWTToken}
            showST={showST}
            setShowST={setShowST}
            enableMultipleRes={enableMultipleRes}
            setEnableMultipleRes={setEnableMultipleRes}
            getparticularMultipleResponse={getparticularMultipleResponse}
          />
        </div>

        <div className="w-1/2 max-w-lg">
          {enableMultipleRes ? (
            <MultipleResponsePreveiw formData={formData} mlp={mlp} />
          ) : (
            <Preview
              initialResponses={botData}
              authJWTToken={authJWTToken}
              setIsLoading={setIsLoading}
              getChatBotData={getChatBotData}
            />
          )}
        </div>
      </div>
      {isLoading && <Loder />}

      {showST && (
        <SuggestedTriggersList showST={showST} setShowST={setShowST} />
      )}
    </>
  );
};

export default SetTriggersRes;
