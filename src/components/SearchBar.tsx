import React from "react";

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
  theme: string; 
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, theme }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Users..."
      value={search}
      onChange={handleSearchChange}
      className={` w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2 border rounded mb-4 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}
    />
  );
};

export default SearchBar;