import { Icon } from "@iconify/react";
import { Divider, IconButton, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import BotDrawerOpsi from "./botDrawerOpsi";
import {
  getTextIconColor,
  getDateColor,
  getCardBorderColor,
  pemisahRibuan,
  hitungBunga,
  formatTanggal,
  convertLamaGadai,
} from "../functionGlobal";

/**
 * @description Komponen untuk menampilkan item dalam daftar. Setiap item berisi informasi seperti ID transaksi, nama, nomor telepon, detail barang, harga, periode gadai, dan tanggal kredit dan jatuh tempo.
 * Komponen ini juga mengelola status dan fungsi dari Drawer Options.
 * @param {object} data Objek yang berisi data yang akan ditampilkan
 * @returns {*} Item dalam daftar dengan informasi yang ditentukan dan Drawer Options
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
const ListItem = ({ data, usedIn }) => {
  const status = data.status;

  const [isDrawerOpsiOpen, setDrawerOpsirOpen] = useState(false);

  return (
    <div
      className={`border  ${getCardBorderColor(
        status
      )}  border-solid border-t-4 rounded-md my-[20px] text-neutral-100 `}
    >
      <div className="px-4 py-2">
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <p className="font-bold text-base">{data.kode}</p>
          <Stack direction="row">
            <div className="rounded-lg bg-neutral-100 text-neutral-10 px-2.5 text-sm font-bold flex items-center">
              {data.kodelokasi}
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
        <Stack gap={"0px"} className="pb-1">
          <p className="text-ellipsis font-bold text-sm leading-[18px] overflow-hidden whitespace-nowrap py-[3px]">
            {data.namacustomer}
          </p>
          <p
            className="text-xs font-semibold text-neutral-60 leading-[14px] pt-[3px]
pb-1"
          >
            +{data.telp}
          </p>
        </Stack>
        <Stack
          className="py-1 text-neutral-100 text-base leading-[18px] font-normal"
          direction="row"
        >
          <Icon
            fontSize={"16px"}
            icon={"heroicons-solid:shopping-bag"}
            className={`${getTextIconColor(status)} mr-1`}
          ></Icon>
          <p className="text-sm font-normal">{data.jaminanbarang}</p>
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
          <p className="text-sm font-normal">
            Rp{pemisahRibuan(data.nilaipinjaman)} ({data.bunga}% | Rp
            {pemisahRibuan(hitungBunga(data.nilaipinjaman, data.bunga))})
          </p>
        </Stack>
        <Stack
          className="pt-1 text-neutral-100 text-base leading-[18px] font-normal"
          direction="row"
        >
          <Icon
            fontSize={"16px"}
            icon={"heroicons-outline:clock"}
            className={`${getTextIconColor(status)} } mr-1`}
          ></Icon>
          <p className="text-sm font-normal">
            {convertLamaGadai(data.lamagadai)}
          </p>
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
              variant={"fullWidth"}
              className="h-10 mx-auto my-auto"
            />
          </div>
        }
        justifyContent="space-between"
        alignItems="center"
        className={getDateColor(status)}
      >
        <Stack
          direction="column"
          gap={"4px"}
          className=" pl-4 pt-1 pb-2 text-start"
        >
          <div className="text-xs font-normal text-neutral-70">Tgl Kredit</div>
          <div className="text-sm font-bold">
            {formatTanggal(data.tglkredit)}
          </div>
        </Stack>
        <Stack
          direction="column"
          gap={"4px"}
          className=" pr-4 pt-1 pb-2 text-end"
        >
          <div className="text-xs font-normal text-neutral-70">Jatuh Tempo</div>
          <div className="text-sm font-bold">
            {formatTanggal(data.tgljatuhtempo)}
          </div>
        </Stack>
      </Stack>
      <BotDrawerOpsi
        openDrawer={isDrawerOpsiOpen}
        setOpenDrawer={setDrawerOpsirOpen}
        data={data}
        usedIn={usedIn}
      ></BotDrawerOpsi>
    </div>
  );
};

export default ListItem;
