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
        className="text-black text-base font-bold"
        onClick={() => onClickFunctions[title]()}
      >
        {title}
      </Button>
    </>
  );
};

export default ButtonOpsiItem;
