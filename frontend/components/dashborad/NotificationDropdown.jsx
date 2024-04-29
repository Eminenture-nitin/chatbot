import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import UserNameEmailAvatar from "../miniComponants/UserNameEmailAvatar";
import TimeAgo from "../TimeAgo";
import useSound from "use-sound";
const BellAlertIcon = dynamic(
  import("@heroicons/react/24/solid/BellAlertIcon")
);
import notificationSound from "@/ringtones/notificationringtone.mp3";
import { useRouter } from "next/router";
import { useSocket } from "@/context/SocketContext";
function NotificationDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAllNotification, setShowAllNotification] = useState(false);
  // const socket = useRef();
  const { socket } = useSocket();
  const [notificationsData, setNotificationsData] = useState([]);
  const { userId, authJWTToken } = useAuth();
  const [play, { stop }] = useSound(notificationSound);
  const router = useRouter();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // useEffect(() => {
  //   socket.current = io(`${process.env.NEXT_PUBLIC_EMBOT_API}`);
  //   // Connect as admin
  //   if (userId) {
  //     socket.current.emit("adminConnect", userId);
  //   }
  //   // return () => {
  //   //   socket.current.disconnect();
  //   // };
  // }, [userId]);

  const getNotificationsData = async () => {
    try {
      const API_URL = `${process.env.NEXT_PUBLIC_EMBOT_API}/notify/get-notifications/${userId}`;
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authJWTToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.status === "success") {
        setNotificationsData(data.data);
      } else {
        console.error("API returned an error:", data.message);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error.message);
    }
  };

  const updateNotificationStatus = async (id) => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_EMBOT_API}/notify/update-notification/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authJWTToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await res.json();
      router.push(`/auth/dashboard/inbox`);
      getNotificationsData();
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("newNotification", (notifyData) => {
        if (notifyData) {
          setDropdownOpen(true);
          play();
          setNotificationsData((prev) => [...prev, notifyData]);
        }
      });
    }
    return () => socket.current.off();
  }, [notificationsData, socket]);

  useEffect(() => {
    if (authJWTToken && userId) {
      getNotificationsData();
    }
  }, [authJWTToken, userId]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`p-2 rounded-full bg-white focus:outline-none hover:bg-gray-50 ${
          dropdownOpen && "bg-orange-100"
        }`}
      >
        {/* <BellIcon className="h-6 w-6 text-gray-800" /> */}
        <BellAlertIcon className="h-6 w-6 text-gray-800" />
      </button>

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-800 opacity-50"
          onClick={toggleDropdown}
        ></div>
      )}

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-50 animate-fade-down`}
          style={{ width: "20rem" }}
        >
          <div className="max-h-[26.5rem] overflow-y-auto overflow-x-hidden">
            {notificationsData?.length > 0 ? (
              notificationsData
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((elem, index) => (
                  <div key={index}>
                    <div
                      onClick={() => {
                        updateNotificationStatus(elem._id);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2 cursor-pointer ${
                        !elem?.seenStatus ? "bg-blue-50" : "bg-white"
                      }`}
                    >
                      <div>
                        <UserNameEmailAvatar
                          letter={elem?.userInfo?.userName[0]}
                          size={true}
                        />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm mx-2">
                          <span className="font-bold">
                            {elem?.userInfo?.userName}
                          </span>
                          &nbsp;{elem?.notificationMsg}&nbsp;
                          <span className="font-bold text-blue-500">
                            {elem?.userInfo?.visitedPage.split("/").pop()}
                          </span>
                          &nbsp;page. <TimeAgo timestamp={elem?.createdAt} />{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex items-center justify-center gap-2 p-2">
                <div className="text-center">
                  <BellAlertIcon className="w-12 h-12 text-gray-500 mx-auto animate-pulse" />
                  <p className="text-gray-600">No notifications</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <div
              onClick={() => setShowAllNotification(true)}
              className="block cursor-pointer bg-gray-800 text-white text-center font-bold py-2"
            >
              See all notifications
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
