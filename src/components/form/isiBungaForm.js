import { Stack } from "@mui/material";
import React from "react";

/**
 * @description Komponen ini digunakan untuk menampilkan form isi bunga.
 * @author Henry
 * @date 30/11/2023 - 4:23:32 PM
 * @param {string} valueBunga Nilai bunga yang akan ditampilkan.
 * @param {string} valueNominal Nilai nominal yang akan ditampilkan.
 * @return {*} Komponen React yang menampilkan form isi bunga.
 */
const IsiBungaForm = ({ valueBunga, valueNominal }) => {
  return (
    <>
      <Stack gap="8px">
        <Stack direction="row" gap={"2px"}>
          <span className="text-neutral-100 text-base font-bold">
            {"Bunga"}
          </span>
        </Stack>
        <Stack gap="20px" direction="row">
          {" "}
          <div className="relative ">
            <input
              type={"text"}
              disabled={true}
              value={valueBunga}
              className={`w-[100px] rounded-md border p-[11px] border-neutral-40 bg-neutral-20 text-neutral-60 focus:outline-black text-sm leading-[18px] py-4 font-medium`}
            />
            <span className="absolute right-0 h-full top-1/2 transform -translate-y-1/2 px-[15px]  py-2.5 bg-neutral-30 text-neutral-70 rounded-r-md border border-neutral-40 font-bold text-sm flex items-center overflow-hidden">
              %
            </span>
          </div>
          <div className="relative w-full">
            <input
              type={"text"}
              disabled={true}
              value={valueNominal}
              className={`w-full  rounded-md border p-[11px] border-neutral-40 bg-neutral-20 text-neutral-60 focus:outline-black  text-sm leading-[18px] py-4 font-medium pl-14`}
            />
            <span className="absolute left-0 h-full top-1/2 transform -translate-y-1/2 px-[15px]  py-2.5 bg-neutral-30 text-neutral-70 rounded-l-md border border-neutral-40 font-bold text-sm flex items-center overflow-hidden">
              Rp
            </span>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default IsiBungaForm;
