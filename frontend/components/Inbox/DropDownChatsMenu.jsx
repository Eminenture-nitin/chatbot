import { act, useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
const EllipsisVerticalIcon = dynamic(
  import("@heroicons/react/24/solid/EllipsisVerticalIcon")
);

const DropDownChatsMenu = ({ activeChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { authJWTToken } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const deleteUserMsgs = (userId, authJWTToken) => {
    fetch(
      `${process.env.NEXT_PUBLIC_EMBOT_API}/live/deleteAllMessages/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authJWTToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((response) => toast.success(response.message))
      .catch((error) => console.error("Error deleting messages:", error));
  };
  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownMenuIconButton"
        onClick={toggleDropdown}
        className="inline-flex items-center p-2"
        type="button"
      >
        <EllipsisVerticalIcon className="w-6 h-6 cursor-pointer text-gray-700" />
      </button>

      {isOpen && (
        <div
          id="dropdownDots"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li
              className="cursor-pointer"
              onClick={() => {
                activeChat?.data?.userId &&
                  deleteUserMsgs(activeChat?.data?.userId, authJWTToken);
              }}
            >
              <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Delete Chat
              </span>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              User Info
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownChatsMenu;
