import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
const ArrowDownTrayIcon = dynamic(
  import("@heroicons/react/24/outline/ArrowDownTrayIcon")
);
const FromMsg = ({ letter, textMsg, attachmentFile, createdAt }) => {
  // console.log(createdAt, "createdAt");
  console.log(attachmentFile, "attachmentFile");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const handleClosePreview = () => {
    setIsOpenPreview(false);
  };
  function isImageFileName(filename) {
    // List of common image file extensions
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

    // Extract the file extension from the filename
    const parts = filename.split(".");
    const extension = parts[parts.length - 1].toLowerCase();

    // Check if the extension is in the list of image extensions
    return imageExtensions.includes(extension);
  }
  //  console.log(attachmentImage);
  const getBackgroundColor = (letter) => {
    const colors = [
      "rgb(255, 159, 0)",
      "rgb(0, 180, 108)",
      "rgb(34, 102, 221)",
      "rgb(255, 62, 47)",
      "rgb(104, 109, 224)",
      "rgb(196, 58, 34)",
      "rgb(0, 166, 153)",
      "rgb(19, 77, 173)",
      "rgb(255, 87, 34)",
      "rgb(63, 81, 181)",
      "rgb(255, 133, 0)",
      "rgb(0, 150, 136)",
      "rgb(13, 71, 161)",
      "rgb(255, 47, 60)",
      "rgb(83, 109, 254)",
    ];
    const letterCode = letter?.charCodeAt(0) - 65; // Assuming uppercase letters
    const colorIndex = letterCode % colors.length;
    return colors[colorIndex];
  };

  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg rounded-tl-none">
      <div className="flex items-center justify-start flex-row-reverse">
        <div
          style={{ backgroundColor: getBackgroundColor(letter) }}
          className="flex text-white items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
        >
          {letter}
        </div>

        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl rounded-tr-none">
          <div>{textMsg}</div>
          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
            seen
          </div>
          {attachmentFile?.length > 0 && (
            <div className="w-28 h-auto relative group">
              {isImageFileName(attachmentFile) ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_EMBOT_API}/images/live_chat_attachements/${attachmentFile}`}
                  width={125}
                  height={125}
                  className="group cursor-pointer"
                  onClick={() => setIsOpenPreview(true)}
                />
              ) : (
                <iframe
                  src={`${process.env.NEXT_PUBLIC_EMBOT_API}/images/live_chat_attachements/${attachmentFile}`}
                  width="125px"
                  height="125px"
                  style={{ overflow: "hidden" }}
                ></iframe>
              )}
              <div className="absolute bottom-0 right-0 w-7 h-7 group-hover:block hidden">
                <button
                  onClick={() => handleDownload(attachmentImage)}
                  download
                  className="bg-white z-50 border border-gray-800 overflow-hidden w-6 h-6 p-1 flex place-items-center rounded-md"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 text-gray-800 font-semibold" />
                </button>
              </div>
            </div>
          )}
          {isOpenPreview && (
            <ImagePreview
              isOpenPreview={isOpenPreview}
              imgUrl={`${process.env.NEXT_PUBLIC_EMBOT_API}/images/live_chat_attachements/${attachmentFile}`}
              onClose={handleClosePreview}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FromMsg;
