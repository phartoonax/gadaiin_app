import { Icon } from "@iconify/react";
import { Divider, Stack } from "@mui/material";
import React from "react";

/**
 * @description Menampilkan informasi pelanggan: nama, nomor telepon, dan nomor identifikasi.
 * @author Henry
 * @date 28/11/2023 - 11:09:04 AM
 * @returns {*} Komponen React.
 */
const ItemCustomerForm = () => {
  return (
    <Stack gap={"10px"}>
      <p className="font-normal text-base leading-[18px] text-neutral-100">
        Bayu Herlambang Simanjutak
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
          <p>+6285489456145</p>
        </Stack>
        <Stack
          gap={"4px"}
          className="px-0.5"
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Icon icon={"heroicons-outline:identification"} fontSize={"16px"} />
          <p>3578263150950099</p>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ItemCustomerForm;
