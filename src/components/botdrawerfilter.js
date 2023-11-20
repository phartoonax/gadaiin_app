import React from "react";
import { Button, IconButton, Stack, SwipeableDrawer } from "@mui/material";
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
  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: drawerStyle }}
      >
        <div className="w-full pt-[5px] pb-[12px] flex-col justify-center items-center gap-[10px] inline-flex">
          <div className="w-[38px] h-[2px] bg-green-600 rounded-md"></div>
        </div>
        <Stack className="px-4" direction="row" justifyContent="space-between">
          <IconButton onClick={() => setOpen(false)} style={{ width: "50px" }}>
            <Icon
              icon={"feather:x"}
              className="text-success-Main"
              style={{ fontSize: "24px" }}
            ></Icon>
          </IconButton>
          <p className="text-base leading-[18px] font-bold text-success-Main text-center items-center flex ">
            Filter
          </p>
          <Button
            variant="text"
            className="text-success-Main font-semibold text-sm leading-[14px]"
            onClick={null}
            style={{ width: "50px" }}
          >
            Reset
          </Button>
        </Stack>
      </SwipeableDrawer>
    </>
  );
};

export default BotDrawerFilter;
