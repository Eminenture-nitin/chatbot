import { useLiveChatData } from "@/context/livechatContext";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TableSkeleton from "../Loders/TableSkeleton";
import AssistantRegForm from "./AssistantRegForm";
import ReactCountryFlag from "react-country-flag";
import UserNameEmailAvatar from "../miniComponants/UserNameEmailAvatar";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const MagnifyingGlassIcon = dynamic(
  import("@heroicons/react/24/outline/MagnifyingGlassIcon")
);
const UsersIcon = dynamic(import("@heroicons/react/24/solid/UsersIcon"));
const UserPlusIcon = dynamic(import("@heroicons/react/24/solid/UserPlusIcon"));
const ChevronDownIcon = dynamic(
  import("@heroicons/react/24/outline/ChevronDownIcon")
);
const OurAssistantList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { assistants, getLiveChatAssistants } = useLiveChatData();
  const [showForm, setShowForm] = useState(false);
  const { authJWTToken, userId } = useAuth();
  const updateAssistantStatus = (payload, token) => {
    fetch(`${process.env.NEXT_PUBLIC_EMBOT_API}/live/check-assistant`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status == "error") {
          toast.error(res.message);
        } else {
          getLiveChatAssistants(authJWTToken, userId);
          toast.success(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (authJWTToken && userId) {
      getLiveChatAssistants(authJWTToken, userId);
    }
  }, [authJWTToken, userId, assistants]);
  // console.log("assistants", assistants);
  return (
    <div className="relative overflow-x-hidden shadow-md sm:rounded-lg w-full">
      <div className="flex items-center justify-between gap-4 pb-4 bg-white px-2 pt-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />
          <h1 className="font-semibold">Assistance List</h1>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowForm(true)}
            className="relative inline-flex items-center justify-center p-0.5 mb-0 mr-0 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
          >
            <UserPlusIcon className="w-4 h-4 text-white mx-1" />
            <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Add Assistant
            </span>
          </button>
          <div className="">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
              type="button"
            >
              <span className="sr-only">Action button</span>
              Action
              <ChevronDownIcon className="w-2.5 h-2.5 ml-2.5" />
            </button>

            {showDropdown && (
              <div className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
                <ul
                  className="py-1 text-sm text-gray-700"
                  aria-labelledby="dropdownActionButton"
                >
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Reward
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Activate account
                    </Link>
                  </li>
                </ul>

                <div className="py-1">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete User
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative overflow-hidden w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 " />
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {assistants?.map((elem) => (
            <tr key={elem?._id} className="bg-white border-b hover:bg-gray-50">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center text-gray-900 whitespace-nowrap px-6 py-4"
              >
                <UserNameEmailAvatar
                  letter={elem?.userName[0]}
                  userName={elem?.userName}
                  userEmail={elem?.userEmail}
                  assistantImage={elem?.assistantImage}
                />
              </th>
              <td className="px-6 py-4"> {elem?.userEmail}</td>
              <td className="px-6 py-4">
                <button
                  title={`${
                    elem?.status == "click to go Online"
                      ? "click to go Offline"
                      : elem?.status == "Busy"
                      ? `Busy with ${elem?.joinedWith?.user?.userEmail}`
                      : "Online"
                  }`}
                  onClick={() => {
                    elem.status == "Busy"
                      ? toast.warn(
                          "Log out from the current chat session to update your status."
                        )
                      : updateAssistantStatus(
                          {
                            status:
                              elem?.status == "Online" ? "Offline" : "Online",
                            email: elem?.userEmail,
                          },
                          authJWTToken
                        );
                  }}
                  type="button"
                  className="text-gray-900 relative bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  {elem?.status == "Online" ? (
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  ) : (
                    <div
                      className={`h-2.5 w-2.5 rounded-full mr-2 cursor-pointer ${
                        elem.status === "Offline"
                          ? "bg-red-500"
                          : "bg-orange-500"
                      }`}
                    ></div>
                  )}
                  {elem?.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {assistants.length == 0 && <TableSkeleton />}
      {showForm && <AssistantRegForm setShowForm={setShowForm} />}
    </div>
  );
};

export default OurAssistantList;
