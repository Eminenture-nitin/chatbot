import { useLiveChatData } from "@/context/livechatContext";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { toast } from "react-toastify";
import FileUploaderLiveChat from "./FileUploaderLiveChat";
import ImagePreview from "./ImagePreview";
const PaperClipIcon = dynamic(
  import("@heroicons/react/24/outline/PaperClipIcon")
);
const FaceSmileIcon = dynamic(
  import("@heroicons/react/24/outline/FaceSmileIcon")
);
const PaperAirplaneIcon = dynamic(
  import("@heroicons/react/24/solid/PaperAirplaneIcon")
);
const ChatFromInput = ({
  socket,
  msgsData,
  setMsgsData,
  arrivalMsg,
  setArrivalMsg,
}) => {
  const { activeChat, joinedChatAssistant } = useLiveChatData();
  const [showEmojis, setShowEmojis] = useState(false);
  // const [formData, setFormData] = useState({ from: "", to: "", message: "" });
  const [textMessage, setTextMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const addEomoji = (e) => {
    setTextMessage(`${textMessage + e.native}`);
  };

  const addMsg = (TextMsgdata) => {
    const msgNew = {
      myself: true,
      message: textMessage,
      attachmentImage: selectedFile
        ? {
            link: URL.createObjectURL(selectedFile),
          }
        : { link: "", id: "" },
    };

    socket.current.emit("sendMsg", {
      from: joinedChatAssistant?._id ? joinedChatAssistant?._id : "",
      to: activeChat?.status == true ? activeChat?.data?._id : "",
      message: textMessage,
      attachmentImage: selectedFile
        ? {
            link: URL.createObjectURL(selectedFile),
          }
        : { link: "", id: "" },
    });
    const API_PATH = `${process.env.NEXT_PUBLIC_EMBOT_API}/live/addmsg`;
    fetch(API_PATH, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: TextMsgdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == "success") {
          // toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((e) => {
        console.error(e);
      });

    setMsgsData(msgsData.concat(msgNew));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (joinedChatAssistant?._id == undefined) {
      toast.warn("Assistant Not joined!");
    } else {
      // const payload = {
      //   from: joinedChatAssistant?._id ? joinedChatAssistant?._id : "",
      //   to: activeChat?.status == true ? activeChat?.data?._id : "",
      //   message: textMessage,
      // };
      const msgToSend = new FormData();
      selectedFile && msgToSend.append("attachmentImage", selectedFile);
      joinedChatAssistant?._id &&
        msgToSend.append("from", joinedChatAssistant?._id);
      activeChat?.status == true &&
        msgToSend.append("to", activeChat?.data?._id);
      textMessage && msgToSend.append("message", textMessage);
      //console.log("msgToSend", Object.fromEntries(msgToSend));
      addMsg(msgToSend);
      setTextMessage("");
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      {selectedFile && (
        <FileUploaderLiveChat
          handleSubmit={handleSubmit}
          setTextMessage={setTextMessage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div>
            {/* <button className="flex items-center justify-center text-gray-500 hover:text-gray-600">
              <PaperClipIcon className="w-6 h-6" />
            </button> */}
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="fileInput"
              accept="image/*" // Specify accepted file types here
            />

            {/* Button to trigger file input */}
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center text-gray-500 hover:text-gray-600 cursor-pointer"
            >
              <PaperClipIcon className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <div>
                <input
                  required
                  onChange={(e) => setTextMessage(e.target.value)}
                  value={textMessage}
                  name="message"
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
              </div>
              <div>
                {showEmojis && (
                  <div
                    id="EmojiPicker"
                    className={`absolute -top-[21rem] shadow-md rounded-lg -right-[7.5rem] h-80 overflow-hidden animate-fade-up`}
                  >
                    <Picker
                      data={data}
                      emojiSize={20}
                      onEmojiSelect={addEomoji}
                      maxFrequentRows={0}
                      perLine={8}
                      previewPosition={"none"}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <FaceSmileIcon className="w-6 h-6 hover:bg-gray-50 hover:rounded-full" />
                </button>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <button
              type="submit"
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            >
              <span>Send</span>
              <span className="ml-2">
                <PaperAirplaneIcon className="w-4 h-4 transform -rotate-45 -mt-px" />
              </span>
            </button>
          </div>
        </div>
      </form>
      <style>{`
        #EmojiPicker em-emoji-picker {
          height: 20rem;
          max-width: fit-content;
        }
      `}</style>
    </>
  );
};

export default ChatFromInput;
