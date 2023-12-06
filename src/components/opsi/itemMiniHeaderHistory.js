import { Icon } from "@iconify/react";
import { Divider, Stack } from "@mui/material";
import React from "react";
import {
  pemisahRibuan,
  getCardBorderColor,
  getTextIconColor,
} from "../../functionGlobal";

/**
 * @description Komponen untuk menampilkan header mini dalam History secara singkat seperti id transaksi, lokasi, nama, barang, dan harga.
 * @param {object} data Objek yang berisi data item
 * @returns {*} Header mini dalam History secara singkat seperti id transaksi, lokasi, nama, barang, dan harga
 * @author Henry
 * @date 27/11/2023 - 11:00:00 AM
 */
const ItemMiniHeaderHistory = ({ data }) => {
  const status = data.status;

  return (
    <div
      className={`border  ${getCardBorderColor(
        status
      )}  border-solid border-t-4 rounded-md my-[10px] text-neutral-100 `}
    >
      <div className="px-4 py-2 font-inter">
        {" "}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <p className="font-bold text-base">{data.idtransaksi}</p>
          <Stack direction="row">
            <div className="flex items-center justify-center rounded-lg bg-neutral-100 text-sm text-neutral-10 px-2.5">
              {data.lokasi}
            </div>
          </Stack>
        </Stack>
        <Divider className="pt-2"></Divider>
        <p className="text-ellipsis font-bold text-sm overflow-hidden whitespace-nowrap py-[4px]">
          {data.nama}
        </p>
        <Stack
          className="py-1 text-neutral-100 text-sm font-normal items-center"
          direction="row"
        >
          <Icon
            fontSize={"16px"}
            icon={"heroicons-solid:shopping-bag"}
            className={`${getTextIconColor(status)} mr-1`}
          ></Icon>
          <p>{data.barang}</p>
        </Stack>
        <Stack
          className="py-1 text-neutral-100 text-base leading-[18px] font-normal items-center"
          direction="row"
        >
          <Icon
            fontSize={"16px"}
            icon={"heroicons-solid:cash"}
            className={`${getTextIconColor(status)} } mr-1`}
          ></Icon>
          <p>Rp{pemisahRibuan(data.harga)}</p>
        </Stack>
      </div>
    </div>
  );
};

export default ItemMiniHeaderHistory;
