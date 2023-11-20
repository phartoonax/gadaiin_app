import React from "react";
import Drawer from "@mui/material/Drawer";

const BotDrawerFilter = ({ open, setOpen }) => {
  const drawerStyle = {
    width: "100%",
    height: "300px",
    backgroundColor: "white",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    position: "fixed",
    bottom: 0,
    zIndex: 999,
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
  };
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ style: drawerStyle }}
    >
      {/* Drawer content goes here */}
    </Drawer>
  );
};

export default BotDrawerFilter;
