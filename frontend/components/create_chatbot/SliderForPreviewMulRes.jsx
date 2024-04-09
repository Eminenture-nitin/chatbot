import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const InformationCircleIcon = dynamic(
  import("@heroicons/react/24/solid/InformationCircleIcon")
);
const SliderForPreviewMulRes = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  useEffect(() => {
    if (data?.length == 0) {
      data = localStorage.getItem("multpleResponse");
    }
  }, [data]);
  // const data = [];
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <InformationCircleIcon className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-gray-600 mb-2">
            No data available. Add some trigger response data.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="px-2 py-1">
        <Slider {...settings}>
          {data?.map((elem, index) => (
            <div key={index}>
              <div className="w-full" key={index}>
                {elem?.attachmentImage && (
                  <div className="w-full h-auto grid place-items-center rounded-md overflow-hidden">
                    <img
                      className="w-full h-auto"
                      src={elem?.attachmentImage}
                    />
                  </div>
                )}
                <div className="w-full">
                  <h3 className="text-md font-semibold my-1">{elem?.title}</h3>
                  <p className="text-justify">{elem?.responseMsg}</p>
                  <ul className="flex flex-wrap place-items-center gap-4">
                    {elem?.urlLabels?.map((item, index) => (
                      <li className="" key={index}>
                        <Link
                          title={item?.link}
                          href={item?.link}
                          className="text-md text-blue-500 font-semibold underline"
                        >
                          {item?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <style>{`
          .slick-arrow {
            background: #000 !important;
            border-radius:50% !important;
          }
          .slick-arrow:hover{
            background:#000 !important;
          }
        `}</style>
      </div>
    );
  }
};

export default SliderForPreviewMulRes;
