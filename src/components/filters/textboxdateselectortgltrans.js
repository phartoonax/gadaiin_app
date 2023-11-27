import { Stack, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers/";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Icon } from "@iconify/react";

/**
 * @description Komponen untuk menampilkan dua date picker untuk memilih rentang tanggal transaksi.
 * @param {string} title Judul komponen
 * @param {function} setValueDatePicker1 Fungsi untuk mengatur nilai date picker pertama
 * @param {date} valueDatePicker1 Nilai date picker pertama
 * @param {function} setValueDatePicker2 Fungsi untuk mengatur nilai date picker kedua
 * @param {date} valueDatePicker2 Nilai date picker kedua
 * @returns {*} Dua date picker untuk memilih rentang tanggal transaksi
 * @author Henry
 * @date 27/11/2023 - 11:00:00 AM
 */
const TextboxDateSelectorTglTrans = ({
  title,
  setValueDatePicker1,
  valueDatePicker1,
  setValueDatePicker2,
  valueDatePicker2,
}) => {
  const [openDatePicker1, setOpenDatePicker1] = useState(false);
  const [openDatePicker2, setOpenDatePicker2] = useState(false);

  const handleOpenDatePicker1 = () => {
    setOpenDatePicker1(true);
  };
  const handleOpenDatePicker2 = () => {
    setOpenDatePicker2(true);
  };

  return (
    <>
      <Stack gap={"10px"}>
        <div className="text-sm text-[15px] font-bold">{title}</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" justifyContent="space-between" width="100%">
            {" "}
            <MobileDatePicker
              open={openDatePicker1}
              value={valueDatePicker1}
              onChange={(newValue) => {
                setValueDatePicker1(newValue);
              }}
              onClose={() => setOpenDatePicker1(false)}
              format="DD MMM YYYY"
              slotProps={{
                textField: {
                  size: "medium",
                  InputProps: {
                    placeholder: "Awal",
                    sx: {
                      paddingLeft: "0px",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: valueDatePicker1
                        ? "neutral.100"
                        : "neutral.40",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={handleOpenDatePicker1}>
                          <Icon
                            icon={"uil:calendar-alt"}
                            className="text-[#50555B]"
                            style={{ fontSize: "24px" }}
                          ></Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
            <div className="px-1.5 font-bold text-xs tracking-wider flex items-center justify-center">
              {"S/D"}
            </div>
            <MobileDatePicker
              open={openDatePicker2}
              value={valueDatePicker2}
              onChange={(newValue) => {
                setValueDatePicker2(newValue);
              }}
              onClose={() => setOpenDatePicker2(false)}
              format="DD MMM YYYY"
              slotProps={{
                textField: {
                  size: "medium",
                  InputProps: {
                    placeholder: "Akhir",
                    sx: {
                      paddingLeft: "0px",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: valueDatePicker2
                        ? "neutral.100"
                        : "neutral.40",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={handleOpenDatePicker2}>
                          <Icon
                            icon={"uil:calendar-alt"}
                            className="text-[#50555B]"
                            style={{ fontSize: "24px" }}
                          ></Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Stack>
        </LocalizationProvider>
      </Stack>
    </>
  );
};

export default TextboxDateSelectorTglTrans;
