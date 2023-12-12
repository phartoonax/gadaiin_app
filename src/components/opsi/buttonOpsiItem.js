import { Button } from "@mui/material";
import React from "react";

/**
 * @description Komponen untuk menampilkan tombol dengan judul dan fungsi onClick yang ditentukan.
 * @param {string} title Judul tombol
 * @param {object} onClickFunctions Objek yang berisi fungsi onClick berdasarkan judul
 * @returns {*} Tombol dengan judul dan fungsi onClick yang ditentukan
 * @author Henry
 * @date 27/11/2023 - 11:00:00 AM
 */
const ButtonOpsiItem = ({ title, onClickFunctions }) => {
  return (
    <>
      <Button
        sx={{
          textTransform: "capitalize",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        className="text-black text-sm font-bold px-0 py-1 -ml-[1px]"
        onClick={() => onClickFunctions[title]()}
      >
        {title}
      </Button>
    </>
  );
};

export default ButtonOpsiItem;
