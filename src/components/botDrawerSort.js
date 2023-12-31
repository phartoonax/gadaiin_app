import { Button, IconButton, Stack, SwipeableDrawer } from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import SwitcherSortItem from "./sort/switcherSortItem";
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

  const isiSortItem = [
    { Nama: "Nilai Gadai", keyValue: "harga" },
    { Nama: "Nomer Gadai", keyValue: "idtransaksi" },
    { Nama: "Tanggal Transaksi", keyValue: "tglkredit" },
  ];

  const resetFields = () => {
    //TODO: GANTI DENGAN VALUE SORT
    setValueStatusSort({});
  };

  const handleApply = () => {
    const filters = {
      valueStatusSort,
    };

    const isEmpty = Object.keys(valueStatusSort).length === 0;

    onSortSubmit(isEmpty ? {} : filters);
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
        onClose={() => {
          setOpenDrawer(false);
          resetFields();
        }}
        PaperProps={{ style: drawerStyle }}
        swipeAreaWidth={"38px"}
        disableSwipeToOpen={true}
      >
        <div className="w-full pt-[5px] pb-[12px] flex-col justify-center items-center gap-[10px] inline-flex">
          <div className="w-[38px] h-[2px] bg-success-Pressed rounded-md"></div>
        </div>
        <Stack
          className="px-4 pb-[19px]"
          direction="row"
          justifyContent="space-between"
        >
          <IconButton
            onClick={() => setOpenDrawer(false)}
            style={{
              width: "62px",
              justifyContent: "flex-start",
              padding: "0px",
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
            className="text-success-Main font-semibold text-xs leading-[14px]"
            onClick={resetFields}
            sx={{ paddingRight: "0px", justifyContent: "flex-end" }}
          >
            Reset
          </Button>
        </Stack>
        <Stack direction="column" sx={{ px: "16px", mb: "72px" }}>
          <SwitcherSortItem
            isiSortItem={isiSortItem}
            handleSortStatusChange={handleSortStatusChange}
            valueStatusSort={valueStatusSort}
          />
        </Stack>

        {openDrawer && (
          <div className="fixed bottom-0 w-full flex justify-between px-4 py-2 mt-4 space-x-2.5 bg-white  shadow-customForFilter z-[2000]">
            <button
              className="bg-neutral-10 text-success-Main w-full px-3.5 py-2 rounded-xl shadow h-[52px] border border-success-Main text-base font-bold"
              onClick={() => {
                resetFields();
                setOpenDrawer(false);
              }}
            >
              Batal
            </button>
            <button
              className="bg-success-Main text-white w-full  px-3.5   py-2 rounded-xl shadow h-[52px] text-base font-bold"
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
