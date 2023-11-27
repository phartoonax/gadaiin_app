import { Icon } from "@iconify/react";
import { AppBar, Divider, IconButton, Stack } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ItemMiniHeaderHistory from "./itemminiheaderhistory";
import ItemListHistory from "./itemlisthistory";

/**
 * @description Komponen untuk menampilkan halaman History gadai Sesuai dengan data yang telah di ambil dari data state.
 * @returns {*} Halaman History gadai dengan header mini dan daftar item History Sesuai dengan data yang telah di ambil dari data state
 * @author Henry
 * @date 27/11/2023 - 1:30:00 PM
 */
function PageHistoryGadai() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  return (
    <div>
      <AppBar position="static" className="bg-neutral-10 p-4" elevation={1}>
        <toolbar className="flex justify-start items-center">
          <IconButton
            sx={{ paddingY: "0px", paddingX: "6px" }}
            onClick={() => navigate(-1)}
          >
            <Icon
              className="text-neutral-70"
              icon="feather:arrow-left"
              style={{ fontSize: "24px" }}
            />
          </IconButton>
          <p className="h-full text-base font-bold text-neutral-100 ml-3 grow">
            History
          </p>
        </toolbar>
      </AppBar>
      <div className="bg-white px-4 pt-4 w-full max-w-md rounded-md">
        <Stack
          divider={
            <Divider
              variant="fullWidth"
              className="border-neutral-70"
              sx={{
                marginY: "10px",
              }}
            ></Divider>
          }
        >
          <ItemMiniHeaderHistory data={data}></ItemMiniHeaderHistory>
          <ItemListHistory data={data}></ItemListHistory>
        </Stack>
      </div>
    </div>
  );
}

export default PageHistoryGadai;
