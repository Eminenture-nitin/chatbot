import dynamic from "next/dynamic";
import { useState } from "react";
const AcademicCapIcon = dynamic(() =>
  import("@heroicons/react/24/solid/AcademicCapIcon")
);
const EnvelopeIcon = dynamic(() =>
  import("@heroicons/react/24/solid/EnvelopeIcon")
);
const UserIcon = dynamic(() => import("@heroicons/react/24/solid/UserIcon"));
const PhoneIcon = dynamic(() => import("@heroicons/react/24/solid/PhoneIcon"));
const LinkIcon = dynamic(() => import("@heroicons/react/24/solid/LinkIcon"));

const AskAQuestion = ({ onConfigSubmit }) => {
  const [config, setConfig] = useState({
    question: "",
    validationType: "None",
    errorMessage: "",
    retryAttempts: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(config);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 border rounded shadow bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="block text-sm text-gray-700 font-semibold">
          Ask a question for the user
        </p>
        <div className="grid items-center border-b border-blue-500 py-2 ">
          <textarea
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="question"
            id="question"
            value={config.question}
            onChange={handleChange}
            placeholder="What would you like to ask?"
          />
        </div>
        <div>
          <label
            htmlFor="validationType"
            className="block text-sm font-medium text-gray-700"
          >
            Select validation type
          </label>
          <div className="relative mt-1">
            <select
              name="validationType"
              id="validationType"
              value={config.validationType}
              onChange={handleChange}
              className="block w-full border border-blue-300 rounded-md shadow-sm p-2 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option className="flex items-start gap-2" value="None">
                <AcademicCapIcon className="w-6 h-6 inline mr-2" />
                <span> None</span>
              </option>
              <option className="flex items-start gap-2" value="Name">
                <UserIcon className="w-6 h-6 inline mr-2" /> <span> Name</span>
              </option>
              <option className="flex items-start gap-2" value="Email">
                <EnvelopeIcon className="w-6 h-6 inline mr-2" />
                <span>Email</span>
              </option>
              <option className="flex items-start gap-2" value="Phone Number">
                <PhoneIcon className="w-6 h-6 inline mr-2" />
                <span>Phone Number</span>
              </option>
              <option className="flex items-start gap-2" value="URL">
                <LinkIcon className="w-6 h-6 inline mr-2" /> <span>URL</span>
              </option>
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="errorMessage"
            className="block text-sm font-medium text-gray-700"
          >
            Enter the message displayed to visitor when there is a validation
            error
          </label>
          <input
            type="text"
            name="errorMessage"
            id="errorMessage"
            value={config.errorMessage}
            onChange={handleChange}
            placeholder="Enter the validation message"
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="retryAttempts"
            className="block text-sm font-medium text-gray-700"
          >
            Number of repeats
          </label>
          <input
            type="number"
            name="retryAttempts"
            id="retryAttempts"
            value={config.retryAttempts}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
};

export default AskAQuestion;
