import {
  Button,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import SwitcherSortItem from "./sort/switchersortitem";
import { drawerStyle } from "../variableGlobal";

/**
 * @description Komponen untuk menampilkan laci bawah yang berisi opsi pengurutan seperti Nilai Gadai, Nomer Gadai, dan Tanggal Transaksi.
 * @param {boolean} openDrawer Status tampilan laci
 * @param {function} setOpenDrawer Fungsi untuk mengubah status tampilan laci
 * @param {function} onSortSubmit Fungsi yang dipanggil saat pengurutan diterapkan
 * @returns {*} Laci bawah yang berisi opsi pengurutan
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
const BotDrawerSort = ({ openDrawer, setOpenDrawer, onSortSubmit }) => {
  const [valueStatusSort, setValueStatusSort] = useState({});

  const isiSortItem = ["Nilai Gadai", "Nomer Gadai", "Tanggal Transaksi"];

  const resetFields = () => {
    //TODO: GANTI DENGAN VALUE SORT
    setValueStatusSort({});
  };

  const handleApply = () => {
    const filters = {
      StatusSort: valueStatusSort,
    };

    const isEmpty = Object.values(filters).every(
      (val) => !val || val === 0 || val === "" || val.length === 0
    );

    // onFilterSubmit(isEmpty ? {} : filters);
    const senttest = isEmpty ? {} : filters;
    console.log(senttest);
    setOpenDrawer(false);
  };

  const handleSortStatusChange = (newSortStatus) => {
    setValueStatusSort(newSortStatus);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ style: drawerStyle }}
        swipeAreaWidth={"38px"}
        disableSwipeToOpen={true}
      >
        <div className="w-full pt-[5px] pb-[12px] flex-col justify-center items-center gap-[10px] inline-flex">
          <div className="w-[38px] h-[2px] bg-green-600 rounded-md"></div>
        </div>
        <Stack className="px-4" direction="row" justifyContent="space-between">
          <IconButton
            onClick={() => setOpenDrawer(false)}
            style={{
              width: "62px",
              justifyContent: "flex-start",
              paddingLeft: "0px",
            }}
          >
            <Icon
              icon={"feather:x"}
              className="text-success-Main"
              style={{ fontSize: "24px" }}
            ></Icon>
          </IconButton>
          <div className="text-base leading-[18px] font-bold text-success-Main text-center items-center flex ">
            Sort
          </div>
          <Button
            variant="text"
            className="text-success-Main font-semibold text-sm leading-[14px]"
            onClick={resetFields}
            sx={{ paddingRight: "0px", justifyContent: "flex-end" }}
          >
            Reset
          </Button>
        </Stack>
        <Stack
          direction="column"
          divider={
            <Divider variant="fullWidth" sx={{ marginY: "10px" }}></Divider>
          }
          sx={{ px: "16px", mb: "72px" }}
        >
          {" "}
          <SwitcherSortItem
            isiSortItem={isiSortItem}
            handleSortStatusChange={handleSortStatusChange}
            valueStatusSort={valueStatusSort}
          />
        </Stack>

        {openDrawer && (
          <div className="fixed bottom-0 w-full flex justify-between px-4 py-2 mt-4 space-x-2.5 bg-white  shadow-customForFilter z-[2000]">
            <button
              className="bg-neutral-10 text-success-Main w-full px-3.5 py-2 rounded-xl shadow h-[52px] border border-success-Main text-lg font-bold"
              onClick={() => {
                resetFields();
                setOpenDrawer(false);
              }}
            >
              Batal
            </button>
            <button
              className="bg-success-Main text-white w-full  px-3.5   py-2 rounded-xl shadow h-[52px] text-lg font-bold"
              onClick={handleApply}
            >
              Terapkan
            </button>
          </div>
        )}
      </SwipeableDrawer>
    </>
  );
};

export default BotDrawerSort;
