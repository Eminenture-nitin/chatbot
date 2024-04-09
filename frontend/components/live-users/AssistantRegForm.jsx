import { useAuth } from "@/context/AuthContext";
import { useLiveChatData } from "@/context/livechatContext";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InlineLoader from "../Loders/InlineLoader";
import OtpInput from "../OtpInput";
const UserPlusIcon = dynamic(import("@heroicons/react/24/solid/UserPlusIcon"));
const XMarkIcon = dynamic(import("@heroicons/react/24/solid/XMarkIcon"));
const AssistantRegForm = ({ setShowForm }) => {
  const { authJWTToken, userId } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    location: {},
    userId: userId,
    adminPin: "",
  });
  const [location, setLocation] = useState({});
  const { getLiveChatAssistants } = useLiveChatData();
  const [isLoading, setIsLoading] = useState(false);

  //tracking location
  const getLocation = () => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          ...formData,
          location: {
            country_code: data?.country_code,
            ip: data?.ip,
            country_name: data?.country_name,
            region: data?.region,
            timezone: data?.timezone,
            longitude: data?.longitude,
            latitude: data?.latitude,
            city: data?.city,
          },
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log(formData);
    setIsLoading(true);
    // ${process.env.NEXT_PUBLIC_EMBOT_API}
    const API_PATH = `${process.env.NEXT_PUBLIC_EMBOT_API}/live/create-assistant`;
    fetch(API_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == "success") {
          toast.success(data.message);
          getLiveChatAssistants(authJWTToken, userId);
          setIsLoading(false);
          setShowForm(false);
          setFormData({
            userName: "",
            userEmail: "",
            location: {},
            userId: "",
            adminPin: "",
          });
          e.target.reset();
          setShowForm(false);
        } else {
          toast.error(data.message);
          setIsLoading(false);
          setFormData({
            userName: "",
            userEmail: "",
            location: {},
            userId: "",
            adminPin: "",
          });
          e.target.reset();
          setShowForm(false);
        }
      })
      .catch((e) => {
        toast.error(e);
        console.log(e);
        setIsLoading(false);
      });
  };
  const handlePinChange = (newPinValue) => {
    setFormData((prevData) => ({ ...prevData, adminPin: newPinValue }));
  };
  useEffect(() => {
    getLocation();
    // tracking last page
    // console.log(window.location.href.split("/").pop());
  }, [location]);
  useEffect(() => {
    if (userId) {
      setFormData({ ...formData, userId: userId });
    }
  }, [userId]);
  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full inset-0 bg-gray-500 bg-opacity-75 transition-opacity min-w-fit max-w-full p-4 grid place-content-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <XMarkIcon className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white flex gap-2 items-center">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                <UserPlusIcon className="h-6 w-6 text-cyan-600" />
              </div>
              <span>Add Assistant</span>
            </h3>
            {isLoading && <InlineLoader />}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="userName"
                  placeholder="Enter Assistant Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="userEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter Assistant Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Admin Secret Pin
                </label>
                <OtpInput
                  pinValue={formData.adminPin}
                  onPinChange={handlePinChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantRegForm;
