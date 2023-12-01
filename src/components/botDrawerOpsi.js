import { Icon } from "@iconify/react";
import { Divider, IconButton, Stack, SwipeableDrawer } from "@mui/material";
import React from "react";
import ButtonOpsiItem from "./opsi/buttonOpsiItem";
import { useNavigate } from "react-router-dom";
import { drawerStyle } from "../variableGlobal";
import { pemisahRibuan } from "../functionGlobal";

/**
 * @description Komponen untuk menampilkan Bottom Drawer yang berisi berbagai opsi seperti Detail, Tebus Gadai, Perpanjang Gadai, Cetak Ulang, Batal, dan History.
 * @param {boolean} openDrawer Status tampilan Drawer
 * @param {function} setOpenDrawer Fungsi untuk mengubah status tampilan Drawer
 * @param {object} data Objek yang berisi data yang akan ditampilkan
 * @returns {*} Bottom Drawer yang berisi berbagai opsi
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
const BotDrawerOpsi = ({ openDrawer, setOpenDrawer, data, usedIn }) => {
  const Navigate = useNavigate();

  const tempPerpanjangData = {
    name: data.nama,
    phoneNumber: data.notelp,
    address: data.alamat,
    noCustomer: data.noktp,
    fotoCustomer: JSON.parse(localStorage.getItem("savedImage-Profile")),

    noGadai: data.idtransaksi.substring(3),
    jaminan: data.barang,
    kelengkapan: [
      "Sertifikat",
      "Ktp",
      "Kartu Keluarga",
      "Buku Tabungan",
      "STNK",
      "BPKB",
    ],
    noSeri: data.noSeri,
    tglKredit: data.tglkredit,
    lamaGadai: data.periodegadai,
    harga: pemisahRibuan(data.harga),
    fotoBarang: JSON.parse(localStorage.getItem("savedImage-Profile")),
  };
  let route;

  switch (usedIn) {
    case "Perpanjang":
      route = "/detail/perpanjang/pelanggan";
      break;
    case "Tebus":
      route = "/detail/tebus/pelanggan";
      break;
    // Add more cases as needed
    default:
      route = "/detail/gadai/pelanggan";
  }
  // Unique functions to console.log for each option
  const handleDetailClick = () => {
    console.log("Clicked option: Detail");
    Navigate(route, {
      state: { dataDetailPelangganGadai: tempPerpanjangData },
    });
  };

  const handleTebusGadaiClick = () => {
    console.log("Clicked option: Tebus Gadai");
    Navigate("/form/tebus/pelanggan", {
      state: { dataPelangganPerpanjang: tempPerpanjangData },
    });
  };

  const handlePerpanjangGadaiClick = () => {
    console.log("Clicked option: Perpanjang Gadai");
    Navigate("/form/perpanjang/pelanggan", {
      state: { dataPelangganPerpanjang: tempPerpanjangData },
    });
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
