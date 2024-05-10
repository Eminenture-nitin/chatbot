import React, { useEffect, useState } from "react";

const Services = () => {
  const data = [
    {
      id: 1,
      Test: "1",
      c1: "pink",
      c2: "Blue",
      c3: "Yellow",
      created_at: "2024-05-06 21:47:29",
      updated_at: "2024-05-06 21:47:29",
    },
    {
      id: 2,
      Test: "1",
      c1: "Red",
      c2: "Purple",
      c3: "Orange",
      created_at: "2024-05-06 21:48:30",
      updated_at: "2024-05-06 21:48:30",
    },
  ];
  const data2 = [
    {
      id: 3,
      Project1: "pname",
      T1: 5,
      T2: 4,
      T3: 4,
      T4: 5,
      created_at: "2024-05-06 21:48:30",
      updated_at: "2024-05-06 21:48:30",
    },
    {
      id: 4,
      Project1: "1",
      T1: "pink",
      T2: "Blue",
      T3: "Yellow",
      T4: "Purple",
      created_at: "2024-05-06 21:47:29",
      updated_at: "2024-05-06 21:47:29",
    },
  ];

  const [mainData, setMainData] = useState([]);
  useEffect(() => {
    setMainData([...data, ...data2]);
  }, []);

  console.log(mainData);

  const headers = [...new Set(mainData.flatMap((item) => Object.keys(item)))];
  console.log(headers);
  return (
    <div className="m-24">
      <h1 className="font-semibold text-lg mb-4">
        Welcome to Services - public route
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              {headers.map((header) => (
                <th className="border border-gray-500 px-4 py-2 bg-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mainData.map((item, index) => (
              <tr>
                {headers.map((header) => (
                  <td className="border border-gray-500 px-4 py-2">
                    {item[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
