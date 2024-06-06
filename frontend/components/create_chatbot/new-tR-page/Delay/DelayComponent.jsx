import React, { useState } from "react";

const DelayComponent = () => {
  const [delayTime, setDelayTime] = useState(5);
  const [unit, setUnit] = useState("seconds");

  const handleChange = (event) => {
    setDelayTime(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Delay time: ${delayTime} ${unit}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <label
        htmlFor="delayTime"
        className="block text-sm font-medium text-gray-700"
      >
        Delay time:
      </label>
      <div className="flex items-center">
        <input
          type="number"
          id="delayTime"
          className="px-3 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={delayTime}
          onChange={handleChange}
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className="ml-2 text-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option className="text-sm" value="seconds">seconds(s)</option>
          <option className="text-sm" value="minutes">minute(s)</option>
          <option className="text-sm" value="hours">hour(s)</option>
          <option className="text-sm" value="days">day(s)</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default DelayComponent;
