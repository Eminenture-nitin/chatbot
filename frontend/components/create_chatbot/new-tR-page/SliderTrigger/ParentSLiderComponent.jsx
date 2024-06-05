import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import WFSliderTriggerForm from "./WFSliderTriggerForm";
import dynamic from "next/dynamic";
const XMarkIcon = dynamic(import("@heroicons/react/24/outline/XMarkIcon"));
const PlusIcon = dynamic(import("@heroicons/react/24/solid/PlusIcon"));

const ParentSLiderComponent = () => {
  const splideRef = useRef(null);
  const [mainData, setMainData] = useState({});
  const [slideCards, setSlideCards] = useState([{ id: uuidv4() }]);
  const [isLastSlideActive, setIsLastSlideActive] = useState(false);

  const addSlideCard = () => {
    setSlideCards((prevCards) => [...prevCards, { id: uuidv4() }]);
    console.log("splideRef", splideRef);
    if (splideRef.current) {
      const splide = splideRef.current.splide;
      const lastIndex = splide.length - 1;

      // Check if Splide instance exists and has slides
      if (lastIndex >= 0) {
        // Move to the last slide
        splide.go(lastIndex);
      }
    }
  };
  const removeSlideCard = (id) => {
    const updatedData = slideCards.filter((elem) => elem.id !== id);
    setSlideCards(updatedData);
  };
  const goToLastSlide = () => {
    if (splideRef.current) {
      const splide = splideRef.current.splide;
      const lastIndex = splide.length - 1;

      // Check if Splide instance exists and has slides
      if (lastIndex >= 0) {
        // Move to the last slide
        splide.go(lastIndex);
      }
    }
  };

  useEffect(() => {
    if (splideRef.current) {
      const splide = splideRef.current.splide;

      // Add event listener to check when the slider moves
      splide.on("moved", () => {
        const activeIndex = splide.index;
        const totalSlides = splide.length;

        // Check if the active slide is the last slide
        setIsLastSlideActive(activeIndex === totalSlides - 1);
      });
    }
  }, []);

  useEffect(() => {
    // After the state has been updated with the new slide, navigate to the last slide
    if (splideRef.current && slideCards.length > 0) {
      const splide = splideRef.current.splide;
      const lastIndex = splide.length - 1;

      // Check if Splide instance exists and has slides
      if (lastIndex >= 0) {
        // Move to the last slide
        splide.go(lastIndex);
      }
    }
    if (slideCards.length == 1) {
      setIsLastSlideActive(true);
    }
  }, [slideCards]);

  useEffect(() => {
    console.log("mainData", mainData);
  }, [mainData]);
  return (
    <>
      <Splide
        aria-label="slider"
        options={{
          rewind: false,
          arrows: true,
          pagination: false,
        }}
        hasTrack={false}
        ref={splideRef}
      >
        <SplideTrack>
          {slideCards?.map((card, index) => (
            <SplideSlide key={index}>
              {slideCards?.length >= 2 && (
                <button
                  type="button"
                  onClick={() =>
                    slideCards?.length >= 2 && removeSlideCard(card?.id)
                  }
                  className="text-red-500 bg-gray-200 absolute right-0 top-0 w-5 h-5 cursor-pointer pointer-events-auto z-50"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
              <WFSliderTriggerForm
                mainData={mainData}
                setMainData={setMainData}
                idx={index}
              />
            </SplideSlide>
          ))}
        </SplideTrack>
        {isLastSlideActive && (
          <button
            type="button"
            onClick={() => addSlideCard()}
            className="bg-gray-300 text-gray-700 rounded-full absolute -right-9 transform top-1/2 -translate-y-1/2 z-50"
          >
            <PlusIcon className="w-7 h-7 text-gray-700 font-bold" />
          </button>
        )}
        <style>{`
          .splide__arrow--prev {
            left: -37.5px;
            backgroudn: white;
          }
          .splide__arrow--next {
            right: -38px;
            backgroudn: white;
          }
        `}</style>
      </Splide>
    </>
  );
};

export default ParentSLiderComponent;
