import React, { useState } from "react";
import AppBarWithSearch from "../appBarWithSearch";
import { Chip, Divider, Grid, Stack } from "@mui/material";
import CheckboxStatus from "../filters/checkBoxStatus";

function PageKelengkapanForm({ setShowFullPageModal, setKelengkapanValues }) {
  const templateKelengkapanArray = [
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
  ];

  const [selectedKelengkapanArray, setSelectedKelengkapanArray] = useState([]);
  const handleCloseModal = () => {
    setShowFullPageModal(false);
  };

  const handleApplyChipsChange = () => {
    setKelengkapanValues(selectedKelengkapanArray);
    handleCloseModal();
  };

  const handleCheckboxChange = (event) => {
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

  

  return (
    <>
      <div className="fixed h-screen w-screen top-0 left-0 z-[99999] bg-white">
        <AppBarWithSearch placeholder={"Cari Kelengkapan"} />
        <div className="bg-white px-4 pt-4 w-full max-w-md rounded-md">
          <Stack
            divider={
              <Divider
                variant="fullWidth"
                className="border-neutral-100"
                sx={{
                  marginY: "10px",
                  borderBottomWidth: "3px",
                }}
              />
            }
          >
            {selectedKelengkapanArray.length > 0 && (
              <Grid container direction="row" wrap="wrap" spacing={1}>
                {selectedKelengkapanArray.map((value) => (
                  <Grid item key={value}>
                    <Chip
                      label={value}
                      variant={"solid"}
                      color={"success"}
                      className="font-normal text-sm px-0.5 py-[7px] max-w-[150px] overflow-ellipsis"
                      onClick={() => handleChipClick(value)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            <CheckboxStatus
              needDivider={true}
              arrayCheckBox={templateKelengkapanArray}
              checkBoxValues={selectedKelengkapanArray}
              checkBoxHandler={handleCheckboxChange}
            />
          </Stack>
          <div className="fixed bottom-0 w-full flex justify-between px-4 py-2 mt-4 space-x-2.5 bg-white  shadow-customForFilter z-[2000] -right-0">
            <button
              className="bg-neutral-10 text-success-Main w-full px-3.5 py-2 rounded-xl shadow h-[52px] border border-success-Main text-lg font-bold"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Batal
            </button>
            <button
              className="bg-success-Main text-white w-full  px-3.5   py-2 rounded-xl shadow h-[52px] text-lg font-bold"
              onClick={handleApplyChipsChange}
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageKelengkapanForm;
