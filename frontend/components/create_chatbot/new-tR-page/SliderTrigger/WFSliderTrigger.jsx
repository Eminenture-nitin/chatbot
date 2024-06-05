import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import WFSliderImageTag from "./WFSliderImageTag";
import { v4 as uuidv4 } from "uuid";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const XMarkIcon = dynamic(import("@heroicons/react/24/outline/XMarkIcon"));
const PlusIcon = dynamic(import("@heroicons/react/24/solid/PlusIcon"));
const ShareIcon = dynamic(import("@heroicons/react/24/outline/ShareIcon"));
const LinkIcon = dynamic(import("@heroicons/react/24/outline/LinkIcon"));

export default function WFSliderTrigger() {
  const [formData, setFormData] = useState({
    subTriggers: [],
    responseText: "",
  });
  const splideRef = useRef(null);
  const [isLastSlideActive, setIsLastSlideActive] = useState(false);
  const [slideCards, setSlideCards] = useState([
    { id: uuidv4() },
    { id: uuidv4() },
  ]);
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubTriggerChange = (index, name, value) => {
    const newSubTriggers = [...formData.subTriggers];

    newSubTriggers[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      subTriggers: newSubTriggers,
    }));
  };

  const addSubTrigger = (type) => {
    if (formData.subTriggers.length < 3) {
      const newTrigger =
        type === "link" ? { type, label: "", url: "" } : { type, value: "" };
      setFormData((prevData) => ({
        ...prevData,
        subTriggers: [...prevData.subTriggers, newTrigger],
      }));
    }
  };

  const removeSubTrigger = (index) => {
    const newSubTriggers = formData.subTriggers.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      subTriggers: newSubTriggers,
    }));
  };

  const handleResponseTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= 280) {
      setFormData((prevData) => ({
        ...prevData,
        responseText: value,
      }));
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
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
  }, [slideCards]);
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
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
              <div className="relative animate-fade-up">
                {slideCards?.length >= 2 && (
                  <button
                    type="button"
                    onClick={() =>
                      slideCards?.length >= 2 && removeSlideCard(card?.id)
                    }
                    className="text-red-500 bg-gray-200 absolute right-0.5 top-0.5 w-5 h-5 cursor-pointer pointer-events-auto z-50"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                )}

                <div className="mb-2 relative w-full h-auto">
                  <WFSliderImageTag handleChange={handleInputChange} />
                </div>
                <div className="mb-2 relative w-full h-auto">
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Title"
                    name="title"
                    onChange={handleInputChange}
                    maxLength={60}
                  />
                </div>
                <div className="mb-2 relative w-full h-auto">
                  <textarea
                    name="descriptionText"
                    value={formData.responseText}
                    onChange={handleResponseTextChange}
                    placeholder="Enter description text (max 280 characters)"
                    maxLength="280"
                    className="w-full p-2 border rounded"
                  />
                  <div className="text-right text-xs text-gray-500">
                    {formData.responseText.length}/280
                  </div>
                </div>
                <div className="mb-2 w-full">
                  {formData.subTriggers.map((trigger, index) => (
                    <div
                      key={index}
                      className="mb-2 flex items-center relative w-full"
                    >
                      {trigger.type === "link" ? (
                        <>
                          <input
                            type="text"
                            value={trigger.label}
                            onChange={(e) =>
                              handleSubTriggerChange(
                                index,
                                "label",
                                e.target.value
                              )
                            }
                            name="label"
                            placeholder={`Link Label ${index + 1}`}
                            className="w-full p-2 border rounded"
                          />
                          <input
                            type="text"
                            name="url"
                            value={trigger.url}
                            onChange={(e) =>
                              handleSubTriggerChange(
                                index,
                                "url",
                                e.target.value
                              )
                            }
                            placeholder={`Link URL ${index + 1}`}
                            className="w-full p-2 border rounded"
                          />
                        </>
                      ) : (
                        <input
                          type="text"
                          value={trigger.value}
                          onChange={(e) =>
                            handleSubTriggerChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                          placeholder={`Trigger ${index + 1}`}
                          className="w-full p-2 border rounded"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeSubTrigger(index)}
                        className="text-red-500 bg-gray-200 absolute -right-10 top-1/2 -translate-y-1/2"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {formData.subTriggers.length < 3 && (
                    <div className="mt-2 flex">
                      <button
                        type="button"
                        onClick={() => addSubTrigger("action")}
                        className="flex items-center justify-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <ShareIcon className="w-5 h-5 rotate-90" />
                        <span>Add Action</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => addSubTrigger("link")}
                        className="flex items-center justify-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        <LinkIcon className="w-5 h-5" />
                        <span>Add URL</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
        {isLastSlideActive && (
          <button
            type="button"
            onClick={addSlideCard}
            className="bg-gray-200 text-gray-700 rounded-full absolute -right-9 transform top-1/2 -translate-y-1/2 z-50"
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
      <button
        type="submit"
        className="px-4 w-full py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
