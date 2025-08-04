import React from "react";

const RecentSearches = ({ recentCities, setCity }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4">
      <h3 className="font-semibold text-gray-700">📌 Recent Searches</h3>
      <div className="flex gap-2 flex-wrap mt-2">
        {recentCities.map((city, index) => (
          <button
            key={index}
            className="bg-[#8749f2] text-white px-3 py-1 rounded-md"
            onClick={() => setCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
