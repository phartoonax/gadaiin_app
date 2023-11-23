import { Icon } from "@iconify/react";
import { AppBar, IconButton } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PageHistoryGadai() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
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
      <h1>Welcome to the Page History Gadai!</h1>
      <p>
        This is the default page for your React.js application named accordingly
        to the filename.
      </p>
      <p>Id: {data.nogadai}</p>
      <p>Age: {data.status}</p>
    </div>
  );
}

export default PageHistoryGadai;
