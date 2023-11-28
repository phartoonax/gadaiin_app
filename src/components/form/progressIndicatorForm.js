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
const ProgressIndicatorForm = (isFirstDone) => {
  return (
    <Stack
      className="px-4 bg-neutral-20 w-screen py-3 h-[50px]"
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack spacing={"12px"} direction="row" alignItems="center">
        <div className="text-success-Main rounded-full border border-success-Main pl-2 pr-[9px] h-[26px]">
          1
        </div>
        <div className="text-base font-medium text-neutral-100">
          Data Pelanggan
        </div>
      </Stack>
      <Icon
        fontSize={"22px"}
        className="text-neutral-70"
        icon={"feather:chevron-right"}
      />
      <Stack spacing={"12px"} direction="row" alignItems="center">
        <div className="text-neutral-60 rounded-full border border-neutral-60 pl-[7px] pr-2 h-[26px]">
          2
        </div>
        <div className="text-base font-normal text-neutral-60">
          Data Transaksi
        </div>
      </Stack>
    </Stack>
  );
};

export default ProgressIndicatorForm;
