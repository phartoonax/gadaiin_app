import { Icon } from "@iconify/react";
import { Divider, IconButton, Stack, SwipeableDrawer } from "@mui/material";
import React from "react";
import ButtonOpsiItem from "./opsi/buttonopsiitem";
import { useNavigate } from "react-router-dom";

const BotDrawerOpsi = ({ open: openDrawer, setOpen: setOpenDrawer, data }) => {
  const Navigate = useNavigate();
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

  // Unique functions to console.log for each option
  const handleDetailClick = () => {
    console.log("Clicked option: Detail");
  };

  const handleTebusGadaiClick = () => {
    console.log("Clicked option: Tebus Gadai");
  };

  const handlePerpanjangGadaiClick = () => {
    console.log("Clicked option: Perpanjang Gadai");
  };

  const handleCetakUlangClick = () => {
    console.log("Clicked option: Cetak Ulang");
  };

  const handleBatalClick = () => {
    console.log("Clicked option: Batal");
  };

  const handleHistoryClick = () => {
    Navigate("/history", { state: { data: data } });
  };

  const optionHandlers = {
    Detail: handleDetailClick,
    "Tebus Gadai": handleTebusGadaiClick,
    "Perpanjang Gadai": handlePerpanjangGadaiClick,
    "Cetak Ulang": handleCetakUlangClick,
    Batal: handleBatalClick,
    History: handleHistoryClick,
  };

  const options =
    data.status === "Aktif"
      ? [
          "Detail",
          "Tebus Gadai",
          "Perpanjang Gadai",
          "Cetak Ulang",
          "Batal",
          "History",
        ]
      : ["Detail", "History"];

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
        <Stack
          className="px-4"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
            Opsi
          </div>
          <div style={{ width: "62px" }}></div>{" "}
          {/* Empty div to push the second item to the middle */}
        </Stack>
        <Stack
          direction="column"
          divider={
            <Divider
              variant="fullWidth"
              sx={{ marginY: "4px" }}
              color="#EEEEEE"
            ></Divider>
          }
          sx={{ px: "16px", mb: "8px" }}
        >
          {options.map((name) => (
            <ButtonOpsiItem title={name} onClickFunctions={optionHandlers} />
          ))}
        </Stack>
      </SwipeableDrawer>
    </>
  );
};

export default BotDrawerOpsi;
