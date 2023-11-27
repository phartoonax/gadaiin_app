import { Icon } from "@iconify/react";
import { AppBar, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * @description Komponen AppBar sederhana yang menampilkan placeholder dan ikon tombol. Komponen ini juga mengelola fungsi navigasi dan klik tombol.
 * @param {string} placeholder Teks yang akan ditampilkan di AppBar
 * @param {string} iconButton Ikon yang akan ditampilkan di tombol
 * @param {function} buttonOnClick Fungsi yang akan dipanggil saat tombol diklik. Jika kosong, maka function akan menjadi null
 * @returns {*} AppBar dengan placeholder dan ikon tombol, serta fungsi navigasi dan klik tombol
 * @author Henry
 * @date 27/11/2023 - 16:03:00 PM
 */
const AppBarPlain = ({ placeholder, iconButton, buttonOnClick }) => {
  const navigate = useNavigate();
  return (
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
          {placeholder}
        </p>
        {iconButton && (
          <IconButton
            sx={{ padding: "0px" }}
            onClick={buttonOnClick ? buttonOnClick : null}
          >
            <Icon
              className="text-neutral-100"
              icon={iconButton}
              style={{ fontSize: "24px" }}
            />
          </IconButton>
        )}
      </toolbar>
    </AppBar>
  );
};

export default AppBarPlain;
