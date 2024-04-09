import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Accordium from "../Accordium";
import { useLinksData } from "@/context/LinksDataContext";

const ArrowLeftCircleIcon = dynamic(
  import("@heroicons/react/20/solid/ArrowLeftCircleIcon")
);
const AdjustmentsHorizontalIcon = dynamic(
  import("@heroicons/react/20/solid/AdjustmentsHorizontalIcon")
);

const poppins = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
const DashbordSidebar = () => {
  const router = useRouter();
  const { LinksData, active, setActive, subLinks, open, setOpen } =
    useLinksData();

  return (
    <>
      <div className={`${poppins.className} flex`}>
        <div
          className={`min-w-64 h-[100vh] bg-[#0a3244] transition-all ease-in-out duration-300 relative z-50 ${
            open ? "w-64" : "w-14"
          }`}
        >
          <div className="my-5 grid place-items-center">
            {open ? (
              <div className="flex items-center justify-center transform scale-x-1 transition-transform">
                <Image
                  src={require("../../images/embotLogo.png")}
                  width={100}
                  alt="Embot Logo"
                />
              </div>
            ) : (
              <AdjustmentsHorizontalIcon
                onClick={() => setOpen(!open)}
                className="cursor-pointer p-1 group-hover:shadow-lg group-hover:text-[#0a3244] shadow-soft-2xl flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#354869]"
              />
            )}
          </div>
          <div className="subMenu flex gap-2 border-t border-gray-700">
            <ul
              className={`w-14 bg-[#0a2532] ${
                open ? "h-[88.4vh]" : "h-[90.6vh]"
              }`}
            >
              {LinksData &&
                LinksData?.map((elem, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActive(elem.name);
                      router.push(`/auth/dashboard/${elem.path}`);
                    }}
                    className={`h-12 cursor-pointer group relative grid place-items-center mb-2 w-full hover:bg-[#123e52] ${
                      active == elem.name &&
                      "bg-[#123e52] border-l-2 border-blue-400"
                    }`}
                  >
                    <div className="">
                      <elem.icon className="w-7 h-7 bg-white rounded-md shadow-sm p-1 text-[#13262f]" />
                    </div>
                    <div className="animate-zoom-in group-hover:block hidden absolute -right-20 w-20 text-center rounded-sm text-white bg-[#123e52] shadow-sm z-50">
                      {elem.name}
                    </div>
                  </li>
                ))}
            </ul>
            <div
              className={`w-48 mt-3 ${
                !open
                  ? "hidden opacity-0 transition-opacity ease-in-out duration-500"
                  : "block opacity-100 transition-opacity ease-in duration-500"
              } `}
            >
              <Accordium
                MainHeading={subLinks.MainHeading}
                data={subLinks.data}
                path={subLinks.path}
              />
            </div>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className={`absolute cursor-pointer -right-2 bottom-4`}
          >
            <div className="border border-x-white w-[11rem] absolute bottom-4 -left-[11rem]"></div>
            <span>
              <ArrowLeftCircleIcon
                className={`w-8 h-8 text-white ${
                  open ? "rotate-0" : "rotate-180"
                }`}
              />
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .rotate-180 {
          animation: rotate180 0.1s ease;
          transform-origin: center;
        }
      `}</style>
    </>
  );
};

export default DashbordSidebar;
