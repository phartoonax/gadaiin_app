import React, { useState } from "react";
import AppBarWithSearch from "../appBarWithSearch";
import { Chip, Divider, Grid, IconButton, Stack } from "@mui/material";
import CheckboxStatus from "../filters/checkBoxStatus";
import { Icon } from "@iconify/react";

/**
 * @description Komponen ini digunakan untuk menampilkan dan mengelola form kelengkapan. Pengguna dapat memilih item kelengkapan dari daftar yang disediakan dan item yang dipilih akan ditampilkan sebagai chip. Pengguna juga dapat mencari item kelengkapan menggunakan fitur pencarian.
 * @author Henry
 * @date 30/11/2023 - 4:28:47 PM
 * @param {function} setShowFullPageModal Fungsi yang dipanggil untuk menampilkan atau menyembunyikan modal.
 * @param {function} setKelengkapanValues Fungsi yang dipanggil untuk mengatur nilai kelengkapan.
 * @param {boolean} enabled Menentukan apakah isi dari kelengkapan dapat diubah atau tidak
 * @param {array} presetKelengkapanArray Array berisi nilai-nilai kelengkapan yang sudah dipilih sebelumnya. Hanya akan dipakai jika enabled bernilai false.
 * @return {*} Komponen React yang menampilkan form kelengkapan.
 */
function PageKelengkapanForm({
  setShowFullPageModal,
  setKelengkapanValues,
  enabled,
  presetKelengkapanArray,
}) {
  const isEnabled =
    typeof enabled !== "undefined" && enabled !== null ? enabled : true;

  const [templateKelengkapanArray, setTemplateKelengkapanArray] = useState(
    isEnabled
      ? [
          "Surat Keterangan Hak Milik",
          "Surat Keterangan Hak Guna Bangunan Sementara",
          "Kardus",
          "STNK",
          "BPKB",
          "Charger",
          "Ijazah",
          "Ijazah SNI",
          "Ijazah SMA",
          "Ijazah S1",
          "Ijazah S2",
        ]
      : presetKelengkapanArray
  );

  const [searchInput, setSearchInput] = useState("");
  const [isAddFilled, setIsAddFilled] = useState(false);
  const [isAddFocused, setIsAddFocused] = useState(false);
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setIsAddFilled(event.target.value !== "");
  };

  const [selectedKelengkapanArray, setSelectedKelengkapanArray] = useState(
    isEnabled ? [] : presetKelengkapanArray
  );
  const handleCloseModal = () => {
    setShowFullPageModal(false);
  };

  const handleApplyChipsChange = () => {
    if (setKelengkapanValues) {
      setKelengkapanValues(selectedKelengkapanArray);
    }
    handleCloseModal();
  };

  const handleCheckboxChange = (event) => {
    if (isEnabled) {
      const newArray = [...selectedKelengkapanArray];
      if (event.target.checked) {
        newArray.push(event.target.name);
      } else {
        const index = newArray.indexOf(event.target.name);
        if (index > -1) {
          newArray.splice(index, 1);
        }
      }

      setSelectedKelengkapanArray(newArray);
    }
  };

  const handleChipClick = (value) => {
    setSelectedKelengkapanArray((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((v) => v !== value);
      } else {
        return [...prevValues, value];
      }
    });
  };
  const handleAddKelengkapan = () => {
    setTemplateKelengkapanArray((prevValues) => {
      if (prevValues.includes(searchInput)) {
        return prevValues;
      } else {
        return [...prevValues, searchInput];
      }
    });
    setSearchInput("");
    setIsAddFilled(false);
    setSelectedKelengkapanArray((prevValues) => {
      if (prevValues.includes(searchInput)) {
        return prevValues.filter((v) => v !== searchInput);
      } else {
        return [...prevValues, searchInput];
      }
    });
  };

  return (
    <>
      <div className="fixed h-screen w-screen top-0 left-0 z-[99999] bg-white">
        <AppBarWithSearch
          placeholder={"Cari Kelengkapan"}
          handlerBackButton={handleApplyChipsChange}
        />
        <div className="bg-white px-4 pt-4 w-full max-w-md rounded-md">
          <Stack
            divider={
              <Divider
                variant="fullWidth"
                className="border-neutral-100"
                sx={{
                  marginY: "10px",
                  borderBottomWidth: "2px",
                }}
              />
            }
          >
            {isEnabled && selectedKelengkapanArray.length > 0 && (
              <Stack gap={"8px"}>
                <div className="font-bold text-xs">Kelengkapan</div>
                <Grid
                  container
                  direction="row"
                  wrap="wrap"
                  spacing={1}
                  className="max-h-40 overflow-auto hide-scrollbar"
                >
                  {selectedKelengkapanArray.map((value) => (
                    <Grid item key={value}>
                      <Chip
                        label={value}
                        variant={"solid"}
                        className="font-normal text-sm px-0.5 py-[7px] max-w-[150px] overflow-ellipsis focus:bg-themeColor bg-themeColor
                        text-neutral-10"
                        onClick={() => handleChipClick(value)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            )}
            <CheckboxStatus
              needDivider={true}
              arrayCheckBox={templateKelengkapanArray}
              checkBoxValues={selectedKelengkapanArray}
              checkBoxHandler={handleCheckboxChange}
            />
          </Stack>
          {isEnabled && (
            <div className="fixed bottom-0 w-full flex justify-between px-4 py-2.5 mt-4 space-x-2.5 bg-white  shadow-customForFilter z-[2000] -right-0  ">
              <Stack gap="8px" width={"100%"}>
                <div
                  className={`flex items-center bg-white rounded-lg p-4 h-12 w-full flex-grow border ${
                    isAddFocused
                      ? "border-neutral-100"
                      : isAddFilled
                      ? "border-neutral-100"
                      : "border-neutral-60"
                  }`}
                >
                  <input
                    className="bg-transparent text-neutral-100 outline-none w-full focus:w-full pr-3"
                    type="text"
                    placeholder={"tambah Kelengkapan"}
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    onFocus={() => setIsAddFocused(true)}
                    onBlur={() => setIsAddFocused(false)}
                  />
                  <IconButton
                    className={`rounded-lg   p-1 ${
                      isAddFilled
                        ? "bg-success-Main focus:bg-success-Main"
                        : "focus:bg-neutral-60 bg-neutral-60"
                    }`}
                    onClick={() =>
                      isAddFilled ? handleAddKelengkapan() : null
                    }
                  >
                    <Icon
                      icon={"heroicons-solid:plus"}
                      fontSize={"22px"}
                      className="text-neutral-10"
                    />
                  </IconButton>
                </div>
              </Stack>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PageKelengkapanForm;
