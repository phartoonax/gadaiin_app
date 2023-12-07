import { Icon } from "@iconify/react";
import { Stack } from "@mui/material";
import React from "react";

/**
 * @description Komponen ini menampilkan indikator kemajuan dalam formulir. Ada dua langkah dalam indikator ini: 'Data Pelanggan' dan 'Data Transaksi'.
 * @author Henry
 * @date 27/11/2023 - 4:30:20 PM
 * @param {boolean} isFirstDone Menentukan apakah langkah 'Data Pelanggan' telah selesai
 * @return {*} Komponen React yang menampilkan indikator kemajuan dalam formulir
 */
const ProgressIndicatorDetail = ({ isFirstDone }) => {
  return (
    <>
      <Stack
        className="px-4 bg-neutral-20 w-screen py-[11px] h-[50px]"
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack spacing={"12px"} direction="row" alignItems="center">
          <div
            className={`flex items-center text-sm rounded-full border border-success-Main h-[26px] ${
              isFirstDone
                ? "pl-2 pr-[9px] text-success-Main"
                : "text-neutral-10 pl-2 pr-[9px] bg-success-Main"
            }`}
          >
            {1}
          </div>
          <div className=" text-sm font-medium text-neutral-100">
            Data Pelanggan
          </div>
        </Stack>
        <Icon
          fontSize={"22px"}
          className="text-neutral-70"
          icon={"feather:chevron-right"}
        />
        <Stack spacing={"12px"} direction="row" alignItems="center">
          <div
            className={`flex items-center ${
              !isFirstDone
                ? "text-success-Main"
                : "text-neutral-10 bg-success-Main"
            } border-success-Main rounded-full text-sm border  pl-[7px] pr-2 h-[26px]`}
          >
            2
          </div>
          <div
            className={` text-sm  font-normal ${
              isFirstDone ? "text-neutral-100 " : "text-neutral-100 "
            }`}
          >
            Data Transaksi
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default ProgressIndicatorDetail;
