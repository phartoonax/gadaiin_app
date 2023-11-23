import { Button } from "@mui/material";
import React from "react";

const ButtonOpsiItem = ({ title, onClickFunctions }) => {
  return (
    <>
      <Button
        sx={{
          textTransform: "capitalize",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        className="text-black text-base font-bold"
        onClick={() => onClickFunctions[title]()}
      >
        {title}
      </Button>
    </>
  );
};

export default ButtonOpsiItem;
