import React, { useState } from "react";

const SearchBar = ({ city, setCity, handleSearch, darkMode }) => {
  const [input, setInput] = useState(city);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setCity(input);
      handleSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-3 rounded-md shadow-md w-full max-w-lg bg-white dark:bg-gray-900">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name..."
        className="flex-grow p-2 border-none outline-none bg-transparent text-black dark:text-white"
      />
      <button type="submit" className="bg-[#FFA500] text-white px-4 py-2 rounded-md dark:bg-orange-600">Search</button>
    </form>
  );
};

export default SearchBar;
