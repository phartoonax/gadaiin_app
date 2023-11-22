import {
  Button,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";

const BotDrawerSort = ({
  open: openDrawer,
  setOpen: setOpenDrawer,
  onSortSubmit,
}) => {
  const drawerStyle = {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    position: "fixed",
    bottom: 0,
    zIndex: 999,
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
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
            onClick={null}
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
        ></Stack>
      </SwipeableDrawer>
    </>
  );
};

export default BotDrawerSort;
