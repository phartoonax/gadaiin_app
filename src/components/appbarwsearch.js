import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

//TODO: TAMBAH DATA RETURN UNTUK API BACKEND
function AppBarWithSearch({ placeholder, onSearchChange, onClearSearch }) {
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setIsSearchFilled(event.target.value !== "");
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setIsSearchFilled(false);
  };

  const renderSearchBar = () => (
    <div
      className={`flex items-center bg-white rounded-lg px-1 pl-2 pr-4 h-12 w-full flex-grow border ${
        isSearchFilled ? "border-neutral-100" : "border-neutral-60"
      }`}
    >
      <Icon
        className="text-themeColor mr-2"
        icon="uil:search"
        style={{ fontSize: "24px" }}
      />
      <input
        className="bg-transparent text-neutral-100 outline-none w-full focus:w-full transition-width duration-200 ease-in-out"
        type="text"
        placeholder={placeholder}
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {isSearchFilled && (
        <IconButton onClick={handleClearSearch}>
          <Icon
            className="text-neutral-60"
            icon="carbon:close"
            style={{ fontSize: "20px" }}
          />
        </IconButton>
      )}
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between bg-neutral-10 text-white px-4 py-1 border-b-2 border-neutral-30">
        <IconButton
          onClick={() => window.history.back()}
          className="text-white"
        >
          <Icon
            className="text-neutral-90"
            icon="feather:arrow-left"
            style={{ fontSize: "24px" }}
          />
        </IconButton>
        <div className="flex w-full items-center bg-white rounded-full py-2">
          {renderSearchBar()}
        </div>
      </div>
    </>
  );
}

export default AppBarWithSearch;
