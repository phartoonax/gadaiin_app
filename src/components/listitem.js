import { Icon } from "@iconify/react";
import { Divider, Stack } from "@mui/material";
import React from "react";

const ListItem = ({ data }) => {
  const colorStatus = data.status;
  const getCardBorderColor = () => {
    switch (colorStatus) {
      case "Aktif":
        return "border-t-success-Main";
      case "Batal":
        return "border-t-danger-Main";
      case "Tebus":
        return "border-t-warning-Main";
      case "Lelang":
        return "border-t-lelang-Main";
      case "Jual":
        return "border-t-primary-Main";
      default:
        return "border-none";
    }
  };

  const getIconColor = () => {
    switch (colorStatus) {
      case "Aktif":
        return "text-success-Main";
      case "Batal":
        return "text-danger-Main";
      case "Tebus":
        return "text-warning-Main";
      case "Lelang":
        return "text-lelang-Main";
      case "Jual":
        return "text-primary-Main";
      default:
        return "text-neutral-500";
    }
  };

  const getDateColor = () => {
    switch (colorStatus) {
      case "Aktif":
        return "bg-success-Surface";
      case "Batal":
        return "bg-danger-Surface";
      case "Tebus":
        return "bg-warning-Surface";
      case "Lelang":
        return "bg-lelang-Surface";
      case "Jual":
        return "bg-primary-Surface";
      default:
        return "bg-neutral-100";
    }
  };

  const hitungBunga = (harga, bunga) => {
    const bunga1 = parseInt(bunga);
    const harga1 = parseInt(harga);
    const hitung = Math.round(harga1 * (bunga1 / 100));
    return hitung;
  };

  const pemisahRibuan = (harga) => {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div
      className={`border  ${getCardBorderColor()}  border-solid border-t-4 rounded-md my-[10px] text-neutral-100`}
    >
      <div className="px-4 py-2">
        {" "}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <p className="font-bold">{data.idtransaksi}</p>
          <div className="rounded-lg bg-neutral-100 text-neutral-10 px-2.5 ">
            {data.lokasi}
          </div>
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
            className={`${getIconColor()} mr-1`}
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
            className={`${getIconColor()} } mr-1`}
          ></Icon>
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
            className={`${getIconColor()} } mr-1`}
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
        className={getDateColor()}
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
    </div>
  );
};

export default ListItem;
