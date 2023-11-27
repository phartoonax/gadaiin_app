import { Icon } from "@iconify/react";
import { Fab, IconButton } from "@mui/material";
import React, { useState } from "react";
import BotDrawerFilter from "./botdrawerfilter";
import BotDrawerSort from "./botdrawersort";
import PagePeriodeGadai from "./filters/pageperiodegadai";

/**
 * @description Komponen untuk menampilkan Bottom Navigation dan Action Button (FAB) dengan ikon dan fungsi yang ditentukan. Komponen ini juga mengelola status dan fungsi dari laci filter dan sort.
 * @param {object} iconKiri Ikon untuk tombol navigasi kiri
 * @param {object} iconKanan Ikon untuk tombol navigasi kanan
 * @param {object} iconFab Ikon untuk Action Button (FAB)
 * @param {function} onFabClick Fungsi yang dipanggil saat Action Button (FAB) diklik
 * @param {function} onFilterChange Fungsi yang dipanggil saat terjadi perubahan filter
 * @param {function} onSortChange Fungsi yang dipanggil saat terjadi perubahan pengurutan
 * @returns {*} Bottom Navigation dan Action Button (FAB) dengan ikon dan fungsi yang ditentukan, serta laci filter dan sort
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
function BotNavBarNFab({
  iconKiri,
  iconKanan,
  iconFab,
  onFabClick,
  onFilterChange,
  onSortChange,
}) {
  const [isDrawerFilterOpen, setDrawerFilterOpen] = useState(false);
  const [isDrawerSortOpen, setDrawerSortrOpen] = useState(false);

  const [isFilterApplied, setFilterApplied] = useState(false);
  const [isSortApplied, setSortApplied] = useState(false);

  const handleFilterChange = (newArray) => {
    console.log(newArray);
    setFilterApplied(Object.keys(newArray).length > 0);
    onFilterChange(newArray);
  };

  const handleSortChange = (newArray) => {
    console.log(newArray);
    setSortApplied(Object.keys(newArray).length > 0);
    onSortChange(newArray);
  };

  const [showFullPageModal, setShowFullPageModal] = useState(false);

  const [periodeGadaiValues, setPeriodeGadaiValues] = useState([]);

  return (
    <>
      <div>
        <div className="fixed inset-x-0 bottom-0 w-full bg-transparent flex z-50">
          {" "}
          <div className="relative w-full z-50 -mr-1">
            {" "}
            <svg
              className="w-full h-14 z-50  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
              viewBox="0 0 118 56"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M120 0H8.69995C6.39257 0 4.17966 0.916621 2.5481 2.54819C0.916529 4.17975 0 6.39263 0 8.70001V55.656H120V0Z"
                fill="white"
              />
            </svg>
            <div className="absolute bottom-3 right-[45%] transform translate-x-1/2">
              <IconButton onClick={() => setDrawerFilterOpen(true)}>
                {" "}
                <Icon
                  className={
                    isFilterApplied ? "text-success-Main" : "text-neutral-100"
                  }
                  icon={iconKiri}
                  style={{ fontSize: "24px" }}
                />
              </IconButton>{" "}
            </div>
          </div>
          <div className="z-[60]">
            {" "}
            <svg
              className="w-32 h-14 drop-shadow-[0_-3px_10px_ 0px_rgba(0,0,0,0.3)] z-10"
              viewBox="0 0 128 56"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 128 0 C 119.816 0.0033 116.108 1.1373 113.059 3.2322 C 110.009 5.3272 107.781 8.2706 106.708 11.6226 C 103.969 20.1027 98.312 27.544 90.582 32.8363 C 82.852 38.1287 73.462 40.9884 63.814 40.9889 C 54.166 40.9886 44.776 38.129 37.045 32.8366 C 29.315 27.5443 23.658 20.1029 20.919 11.6226 C 19.846 8.2707 17.618 5.3273 14.568 3.2324 C 11.518 1.1375 7.811 0.0035 0 0 V 56 H 128 V 0 Z"
                fill="white"
              />
            </svg>
            <div className="relative">
              <Fab
                size="large"
                sx={{
                  position: "absolute",
                  border: 1,
                }}
                children={
                  <Icon
                    className="text-neutral-10"
                    icon={iconFab}
                    style={{ fontSize: "36px" }}
                  />
                }
                onClick={onFabClick}
                className="w-[76px] h-[76px] bottom-5 border-4 border-neutral-10 left-1/2 transform -translate-x-1/2 bg-success-Main hover:bg-success-Main shadow-[0_12px_17px_0px_rgba(0,0,0,0.16)] "
              ></Fab>
            </div>
          </div>
          <div className="relative w-full z-50 -ml-1">
            <svg
              className="flex-grow w-full h-14 z-50 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
              viewBox="0 0 121 56"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H111.3C113.608 0 115.82 0.916621 117.452 2.54819C119.083 4.17975 120 6.39263 120 8.70001V55.656H0V0Z"
                fill="white"
              />
            </svg>
            <div className="absolute bottom-3 right-[55%] transform translate-x-1/2 z-50">
              <IconButton onClick={() => setDrawerSortrOpen(true)}>
                <Icon
                  className={
                    isSortApplied ? "text-success-Main" : "text-neutral-100"
                  }
                  icon={iconKanan}
                  style={{ fontSize: "24px" }}
                />
              </IconButton>
            </div>
          </div>
        </div>
        <BotDrawerFilter
          openDrawer={isDrawerFilterOpen}
          setOpenDrawer={setDrawerFilterOpen}
          onFilterSubmit={handleFilterChange}
          setShowFullPageModal={setShowFullPageModal}
          ChangedPeriodeGadaiValues={periodeGadaiValues}
        />
        <BotDrawerSort
          openDrawer={isDrawerSortOpen}
          setOpenDrawer={setDrawerSortrOpen}
          onSortSubmit={handleSortChange}
        />
        {showFullPageModal && (
          <PagePeriodeGadai
            setShowFullPageModal={setShowFullPageModal}
            setPeriodeGadaiValues={setPeriodeGadaiValues}
          />
        )}
      </div>
    </>
  );
}

export default BotNavBarNFab;
