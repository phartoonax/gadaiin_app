import { Divider, Slider, Stack, alpha } from "@mui/material";
import React from "react";

/**
 * @description Komponen untuk menampilkan 2 Slider dalam 1 rel dengan textbox masing-masing untuk nilai gadai.
 * @param {string} title Judul komponen
 * @param {array} valueDisplaySlider Array berisi nilai yang ditampilkan pada textbox
 * @param {function} handleChangeDisplaySlider Fungsi untuk menangani perubahan nilai pada textbox
 * @param {array} valueSlider Array berisi nilai slider
 * @param {function} handleChangeSlider Fungsi untuk menangani perubahan nilai slider
 * @returns {*} Tampilan Slider dengan textbox untuk nilai gadai
 * @author Henry
 * @date 27/11/2023 - 10:30:00 AM
 */
const SliderWithTextboxNilaiGadai = ({
  title,
  valueDisplaySlider,
  handleChangeDisplaySlider,
  valueSlider,
  handleChangeSlider,
}) => {
  return (
    <>
      <Stack gap={"10px"}>
        <div className="text-sm text-[15px] font-bold">{title}</div>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          className="flex"
        >
          <div className="flex-1 flex  rounded-lg border border-neutral-100 w-full ">
            <input
              type="text"
              value={valueDisplaySlider[0]}
              onChange={(event) =>
                handleChangeDisplaySlider(0, event.target.value)
              }
              className="w-full mx-2.5 my-[15px] focus:outline-none"
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <Divider
            variant="fullWidth"
            color="neutral.100"
            className="flex-1 w-full max-w-[32px] flex"
          ></Divider>
          <div className="flex-1 flex  rounded-lg border border-neutral-100 w-full">
            <input
              type="text"
              value={valueDisplaySlider[1]}
              onChange={(event) =>
                handleChangeDisplaySlider(1, event.target.value)
              }
              className="w-full text-right mx-2.5 my-[15px] focus:border-none focus:outline-none"
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        </Stack>
        <div className="mx-1.5">
          <Slider
            value={valueSlider}
            onChange={handleChangeSlider}
            disableSwap
            max={5000000}
            min={0}
            sx={{
              color: "#AAAAAA",
              "& .MuiSlider-thumb": {
                backgroundColor: "#FFFFFF",
                border: "1px solid #BDBDBD",
              },
              "& .MuiSlider-track": {
                backgroundColor: "success.main",
              },
              "& .MuiSlider-rail": {
                opacity: 0.5,
                backgroundColor: "#AAAAAA",
              },
              "& .MuiSlider-valueLabel": {
                color: "black",
                "& *": {
                  background: "transparent",
                  color: "inherit",
                },
              },
              "&:hover, &.Mui-focusVisible": {
                "& .MuiSlider-thumb": {
                  backgroundColor: "#FFFFFF",
                  boxShadow: `0px 0px 0px 8px ${alpha("#AAAAAA", 0.16)}`,
                },
              },
            }}
          />
        </div>
      </Stack>
    </>
  );
};

export default SliderWithTextboxNilaiGadai;
