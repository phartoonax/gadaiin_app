import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @description Komponen ini digunakan untuk menampilkan AppBar dengan fitur pencarian. Pengguna dapat memasukkan teks pencarian dan menghapusnya. Komponen ini juga mengelola fungsi navigasi dan klik tombol.
 * @param {string} placeholder Teks placeholder untuk input pencarian.
 * @param {function} handlerBackButton Fungsi yang akan dipanggil saat tombol kembali diklik. Jika tidak disediakan, fungsi default akan digunakan untuk navigasi kembali.
 * @param {function} onSearchChange Fungsi yang akan dipanggil saat teks input pencarian berubah.
 * @param {function} onClearSearch Fungsi yang akan dipanggil saat teks input pencarian dihapus.
 * @returns {*} AppBar dengan fitur pencarian.
 * @author Henry
 * @date 30/11/2023 - 4:31:00 PM
 */
//TODO: TAMBAH DATA RETURN UNTUK API BACKEND
function AppBarWithSearch({
  placeholder,
  handlerBackButton,
  onSearchChange,
  onClearSearch,
}) {
  const navigate = useNavigate();
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
          sx={{ padding: "0px" }}
          onClick={() => {
            handlerBackButton ? handlerBackButton() : navigate(-1);
          }}
          className="text-white pr-1"
        >
          <Icon
            className="text-neutral-90"
            icon="feather:arrow-left"
            style={{ fontSize: "24px" }}
          />
        </IconButton>
        <div className="flex w-full items-center bg-white rounded-full">
          {renderSearchBar()}
        </div>
      </div>
    </>
  );
}

export default AppBarWithSearch;
