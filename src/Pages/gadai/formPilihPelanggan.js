import React from "react";
import AppBarWithSearch from "../../components/appBarWithSearch";
import { Divider, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import ItemCustomerForm from "../../components/form/itemCustomerForm";

/**
 * @description
 * @author Henry
 * @date 28/11/2023 - 12:00:48 PM
 * @return {*} 
 */
const FormPilihPelanggan = () => {
  return (
    <div className=" font-inter">
      <AppBarWithSearch placeholder={"Cari Nama Pelanggan"} />

      <Stack
        className="px-4 pt-4 w-full"
        divider={
          <Divider
            variant="fullWidth"
            className="border-neutral-100"
            sx={{
              marginY: "15px",
              borderBottomWidth: "1px",
            }}
          />
        }
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <p>Buat Nama Pelanggan Baru</p>
          <IconButton>
            <Icon
              fontSize={"22px"}
              className="text-neutral-100"
              icon={"fa6-solid:square-plus"}
            ></Icon>
          </IconButton>
        </Stack>
        <ItemCustomerForm />
        <ItemCustomerForm />
        <div /> {/** last div to make the last divider out*/}
      </Stack>
    </div>
  );
};

export default FormPilihPelanggan;
