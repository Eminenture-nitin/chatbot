import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
const PhotoIcon = dynamic(import("@heroicons/react/24/outline/PhotoIcon"));

const WFImageInputTag = ({
  setFormData,
  formData,
  showImg,
  setShowImg,
  need,
}) => {
  return (
    <>
      <div className={`md:flex md:items-center animate-fade-up`}>
        <div className="md:w-full px-2 py-4 rounded-lg border-2 border-dashed border-red-400 grid place-items-center">
          <label className="block gap-2 justify-center items-center">
            <div className="grid place-items-center">
              {!showImg ? (
                <PhotoIcon className="h-8 w-8 mx-auto text-gray-400 hover:text-blue-500" />
              ) : (
                <div className="relative">
                  <Image
                    alt="Selected"
                    src={showImg}
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                SVG, PNG, JPG, JPEG or WEBP
              </p>
            </div>
            <div className="bg-white rounded-sm shadow-sm">
              <input
                required={need && true}
                onChange={(e) => {
                  e.target.files &&
                    setShowImg(URL.createObjectURL(e.target.files[0]));
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.files[0],
                  });
                }}
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                name="attachmentFile"
                className=" mt-2 block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-100
              "
              />
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default WFImageInputTag;
