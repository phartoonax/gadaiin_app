import { Icon } from "@iconify/react";
import { Divider, Stack } from "@mui/material";
import React from "react";

const ItemMiniHeaderHistory = ({ data }) => {
  const status = data.status;
  const getCardBorderColor = () => {
    switch (status) {
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
    switch (status) {
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

  const pemisahRibuan = (harga) => {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div
      className={`border  ${getCardBorderColor()}  border-solid border-t-4 rounded-md my-[10px] text-neutral-100 `}
    >
      <div className="px-4 py-2">
        {" "}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <p className="font-bold">{data.idtransaksi}</p>
          <Stack direction="row">
            <div className="rounded-lg bg-neutral-100 text-neutral-10 px-2.5 ">
              {data.lokasi}{" "}
            </div>
          </Stack>
        </Stack>
        <Divider className="pt-2"></Divider>
        <p className="text-ellipsis font-bold text-base leading-[18px] overflow-hidden whitespace-nowrap py-[4px]">
          {data.nama}
        </p>
        <Stack
          className="py-1 text-neutral-100 text-base leading-[18px] font-normal items-center"
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
          className="py-1 text-neutral-100 text-base leading-[18px] font-normal items-center"
          direction="row"
        >
          <Icon
            fontSize={"16px"}
            icon={"heroicons-solid:cash"}
            className={`${getIconColor()} } mr-1`}
          ></Icon>
          <p>Rp{pemisahRibuan(data.harga)}</p>
        </Stack>
      </div>
    </div>
  );
};

export default ItemMiniHeaderHistory;
