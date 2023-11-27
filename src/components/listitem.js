import { Icon } from "@iconify/react";
import { Divider, IconButton, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import BotDrawerOpsi from "./botdraweropsi";
import {
  getTextIconColor,
  getDateColor,
  getCardBorderColor,
  pemisahRibuan,
  hitungBunga,
} from "../functionGlobal";

/**
 * @description Komponen untuk menampilkan item dalam daftar. Setiap item berisi informasi seperti ID transaksi, nama, nomor telepon, detail barang, harga, periode gadai, dan tanggal kredit dan jatuh tempo.
 * Komponen ini juga mengelola status dan fungsi dari Drawer Options.
 * @param {object} data Objek yang berisi data yang akan ditampilkan
 * @returns {*} Item dalam daftar dengan informasi yang ditentukan dan Drawer Options
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
const ListItem = ({ data }) => {
  const status = data.status;

  const [isDrawerOpsiOpen, setDrawerOpsirOpen] = useState(false);

  return (
    <div
      className={`border  ${getCardBorderColor(
        status
      )}  border-solid border-t-4 rounded-md my-[10px] text-neutral-100 `}
    >
      <div className="px-4 py-2">
        {" "}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <p className="font-bold">{data.idtransaksi}</p>
          <Stack direction="row">
            <div className="rounded-lg bg-neutral-100 text-neutral-10 px-2.5 ">
              {data.lokasi}{" "}
            </div>
            <IconButton
              sx={{ padding: 0, marginRight: "-8px" }}
              onClick={() => setDrawerOpsirOpen(true)}
            >
              <Icon
                fontSize={"20px"}
                className="text-neutral-100"
                icon={"heroicons-outline:dots-vertical"}
              ></Icon>
            </IconButton>
          </Stack>
        </Stack>
        <Divider className="pt-2"></Divider>
        <p className="text-ellipsis font-bold text-base leading-[18px] overflow-hidden whitespace-nowrap py-[4px]">
          {data.nama}
        </p>
        <p
          className="text-sm font-semibold text-neutral-60 leading-[14px] pt-[3px]
pb-1"
        >
          +{data.notelp}
        </p>
        <Stack
          className="py-1 text-neutral-100 text-base leading-[18px] font-normal"
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
          className="py-1 text-neutral-100 text-base leading-[18px] font-normal"
          direction="row"
        >
          <Icon
            fontSize={"16px"}
            icon={"heroicons-solid:cash"}
            className={`${getTextIconColor(status)} } mr-1`}
          />
          <p>
            Rp{pemisahRibuan(data.harga)} ({data.bunga} | Rp
            {pemisahRibuan(hitungBunga(data.harga, data.bunga))})
          </p>
        </Stack>
        <Stack
          className="py-1 text-neutral-100 text-base leading-[18px] font-normal"
          direction="row"
        >
          <Icon
            fontSize={"16px"}
            icon={"heroicons-outline:clock"}
            className={`${getTextIconColor(status)} } mr-1`}
          ></Icon>
          <p>{data.periodegadai}</p>
        </Stack>
      </div>
      <Stack
        direction="row"
        spacing={2}
        divider={
          <div className="flex items-center">
            <Divider
              orientation="vertical"
              flexItem
              variant={"middle"}
              className="h-10 mx-auto my-auto"
            />
          </div>
        }
        justifyContent="space-between"
        alignItems="center"
        className={getDateColor(status)}
      >
        <Stack direction="column" className=" pl-4 pt-1 pb-2 text-start">
          <div className="text-sm leading-5 font-normal text-neutral-70">
            Tgl Kredit
          </div>
          <div className="text-base leading-[18px] font-bold">
            {data.tglkredit}
          </div>
        </Stack>
        <Stack direction="column" className=" pr-4 pt-1 pb-2 text-end">
          <div className="text-sm leading-5 font-normal text-neutral-70">
            Jatuh Tempo
          </div>
          <div className="text-base leading-[18px] font-bold">
            {data.tgljatuhtempo}
          </div>
        </Stack>
      </Stack>
      <BotDrawerOpsi
        openDrawer={isDrawerOpsiOpen}
        setOpenDrawer={setDrawerOpsirOpen}
        data={data}
      ></BotDrawerOpsi>
    </div>
  );
};

export default ListItem;
