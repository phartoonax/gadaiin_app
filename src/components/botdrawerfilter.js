import React, { useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Icon } from "@iconify/react";

const BotDrawerFilter = ({ open, setOpen }) => {
  const drawerStyle = {
    width: "100%",
    height: "300px",
    backgroundColor: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    position: "fixed",
    bottom: 0,
    zIndex: 999,
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
  };

  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState(new dayjs("2022-04-17"));

  const handleOpen = () => {
    setOpen2(true);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: drawerStyle }}
        swipeAreaWidth={"38px"}
        disableSwipeToOpen={true}
      >
        <div className="w-full pt-[5px] pb-[12px] flex-col justify-center items-center gap-[10px] inline-flex">
          <div className="w-[38px] h-[2px] bg-green-600 rounded-md"></div>
        </div>
        <Stack className="px-4" direction="row" justifyContent="space-between">
          <IconButton
            onClick={() => setOpen(false)}
            style={{ width: "62px", justifyContent: "flex-start" }}
          >
            <Icon
              icon={"feather:x"}
              className="text-success-Main"
              style={{ fontSize: "24px" }}
            ></Icon>
          </IconButton>
          <div className="text-base leading-[18px] font-bold text-success-Main text-center items-center flex ">
            Filter
          </div>
          <Button
            variant="text"
            className="text-success-Main font-semibold text-sm leading-[14px]"
            onClick={null}
          >
            Reset
          </Button>
        </Stack>
        <Stack
          direction="column"
          divider={
            <Divider variant="fullWidth" sx={{ marginY: "10px" }}></Divider>
          }
          sx={{ px: "16px" }}
        >
          <Stack gap={"10px"}>
            <div>{"Tanggal Transaksi"}</div>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <div onClick={handleOpen}>TEST</div>
              <div>{"S/D"}</div>
              <div>TES</div>
            </Stack>
          </Stack>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {" "}
            <MobileDatePicker
              open={open2}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              onClose={() => setOpen2(false)}
              slotProps={{ textField: { size: "small",  } }}
            />
          </LocalizationProvider>
          <div>again</div>
        </Stack>
      </SwipeableDrawer>
    </>
  );
};

export default BotDrawerFilter;
