import React from "react";
import { SearchBarProps } from "./SearchBar.type";
import { useThemeStore } from "../../../stores/theme"; 

export const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  const { theme } = useThemeStore(); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Users..."
      value={search}
      onChange={handleSearchChange}
      className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2 border rounded mb-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black"
      }`}
    />
  );
};
