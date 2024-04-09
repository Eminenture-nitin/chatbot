import { useLiveChatData } from "@/context/livechatContext";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AssistantCheckForm from "./AssistantCheckForm";
import TableSkeleton from "../Loders/TableSkeleton";
import ReactCountryFlag from "react-country-flag";
import UserNameEmailAvatar from "../miniComponants/UserNameEmailAvatar";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const MagnifyingGlassIcon = dynamic(
  import("@heroicons/react/24/outline/MagnifyingGlassIcon")
);
const ChevronDownIcon = dynamic(
  import("@heroicons/react/24/outline/ChevronDownIcon")
);
const ArrowsUpDownIcon = dynamic(
  import("@heroicons/react/24/outline/ArrowsUpDownIcon")
);
const UserGroupIcon = dynamic(
  import("@heroicons/react/24/solid/UserGroupIcon")
);
const LiveUsersList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { users, getLiveChatUsers, joinedChatAssistant, activeChat } =
    useLiveChatData();
  const [showForm, setShowForm] = useState(false);
  const [showFormUser, setShowFormUser] = useState({});
  const { authJWTToken, userId } = useAuth();
  const { setActiveChat } = useLiveChatData();
  const router = useRouter();

  const handleSubmit = () => {};
  useEffect(() => {
    if (authJWTToken && userId) getLiveChatUsers(authJWTToken, userId);
  }, [authJWTToken, userId]);
  return (
    <div className="relative overflow-x-hidden shadow-md sm:rounded-lg w-full">
      <div className="flex items-center justify-between gap-4 pb-4 bg-white px-2 pt-4">
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5" />
          <h1 className="font-semibold">Users List</h1>
        </div>
        <div className="flex items-center gap-2">
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
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-10"
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
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
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
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <ArrowsUpDownIcon className="w-5 h-5 cursor-pointer" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Visited Page
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {users?.map((elem) => (
            <tr
              key={elem._id}
              className="bg-white border-b hover:bg-gray-50"
            >
              <td className="w-4 p-4">
                <div className="flex items-center justify-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      elem?.status == true ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
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
                />
              </th>
              <td className="px-6 py-4"> {elem?.userEmail}</td>
              <td className="px-6 py-4 flex items-center justify-start gap-2">
                <ReactCountryFlag
                  countryCode={elem?.location?.country_code}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  title={elem?.location?.country_code}
                />

                <span className="font-medium text-blue-600 hover:underline">
                  {`${elem?.location?.region}, ${elem?.location?.country_name}`}
                </span>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={elem.visitedPage}
                  target="_blank"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {`/${elem?.visitedPage.split("/").pop()}`}
                </Link>
              </td>
              <td className="px-6 py-4">
                {elem?.joinedExecutive?.status == false ? (
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setShowFormUser(elem);
                    }}
                    className="font-medium bg-blue-200 px-2 py-1 rounded-md text-blue-600 hover:underline"
                  >
                    Join Chat
                  </button>
                ) : joinedChatAssistant?._id ==
                  elem?.joinedExecutive?.executive?._id ? (
                  <button
                    onClick={() => {
                      setActiveChat({ status: true, data: elem });
                      router.push("/auth/dashboard/inbox");
                    }}
                    className="font-medium bg-green-200 px-2 py-1 rounded-md text-green-600 hover:underline"
                  >
                    resume
                  </button>
                ) : (
                  <button
                    title={`${elem?.joinedExecutive?.executive?.userName} is joined with ${elem?.userName}`}
                    className="flex items-center justify-center font-medium bg-orange-200 px-2 py-1 rounded-md text-orange-600 hover:underline"
                  >
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-sm">
                      {`${elem?.joinedExecutive?.executive?.userName}`}
                    </span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users?.length == 0 && <TableSkeleton />}
      {showForm && (
        <AssistantCheckForm setShowForm={setShowForm} user={showFormUser} />
      )}
    </div>
  );
};

export default LiveUsersList;
