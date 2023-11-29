import { Icon } from "@iconify/react";
import { Divider, Stack } from "@mui/material";
import React from "react";

/**
 * @description Menampilkan informasi pelanggan: nama, nomor telepon, dan nomor identifikasi.
 * @author Henry
 * @date 29/11/2023 - 11:39:04 AM
 * @param {string} name - Nama pelanggan
 * @param {string} phoneNumber - Nomor telepon pelanggan
 * @param {string} noCustomer - Nomor identifikasi pelanggan
 * @param {function} onClickHandler - Fungsi yang dipanggil ketika komponen diklik
 * @returns {*} Komponen React.
 */
const ItemCustomerForm = ({
  name,
  phoneNumber,
  noCustomer,
  onClickHandler,
}) => {
  <>
    return (
    <Stack gap={"10px"} onClick={onClickHandler}>
      <p className="font-medium text-base leading-[18px] text-neutral-100 font-inter">
        {name}
      </p>
      <Stack
        className="font-normal text-sm leading-[14px] text-neutral-100"
        direction={"row"}
        gap={"4px"}
        divider={
          <Divider
            variant="fullWidth"
            className="border-neutral-70"
            orientation="vertical"
            flexItem
            sx={{
              marginY: "2px",
            }}
          />
        }
      >
        <Stack
          className="px-0.5"
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          gap={"4px"}
        >
          <Icon icon={"heroicons-outline:phone"} fontSize={"16px"} />
          <p>+{phoneNumber}</p>
        </Stack>
        <Stack
          gap={"4px"}
          className="px-0.5"
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Icon icon={"heroicons-outline:identification"} fontSize={"16px"} />
          <p>{noCustomer}</p>
        </Stack>
      </Stack>
    </Stack>
    );
  </>;
};

export default ItemCustomerForm;
