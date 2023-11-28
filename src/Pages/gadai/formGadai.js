import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { Button, Paper, Stack } from "@mui/material";
import IsiForm from "../../components/form/isiForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import React, { useState } from "react";

/**
 * @description Komponen ini menampilkan formulir Gadai. Formulir ini mencakup bidang seperti Nama, Telpon, Alamat Sesuai KTP, No. Identitas Sesuai KTP, dan Foto Pelanggan. Ada juga indikator kemajuan dan tombol 'Selanjutnya' di bagian bawah.
 * @author Henry
 * @date 27/11/2023 - 3:10:08 PM
 * @return {*} Komponen React yang menampilkan formulir Gadai.
 */
const FormGadai = () => {
  const idPelanggan = "test";
  const [savedImage, setSavedImage] = useState(
    JSON.parse(localStorage.getItem("savedImage-" + idPelanggan)) || null
  );
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
      <div className="fixed top-0 z-50">
        <AppBarPlain placeholder={"Tambah Gadai"} />
        <ProgressIndicatorForm />
      </div>
      <div className="bg-white px-4 pt-[112px] w-full">
        <Stack gap={"20px"}>
          <IsiForm title={"Nama"} isRequired={true} type={"button"} />
          <IsiForm title={"Telpon"} type={"number"} isRequired={true} />
          <IsiForm title={"Alamat Sesuai KTP"} isRequired={true} />
          <IsiForm title={"No. Identitas Sesuai KTP"} isRequired={true} />
          <PhotoCameraForm
            title={"Foto Pelanggan"}
            savedImage={savedImage}
            setSavedImage={setSavedImage}
            idPelanggan={idPelanggan}
          />
          <div className="h-16" />
        </Stack>
      </div>
      <Paper
        className="w-full px-4 py-3"
        sx={{
          position: "fixed",
          bottom: "0px",
          left: 0,
          right: 0,

          borderRadius: "0px",
        }}
        elevation={5}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "8px",
            color: "neutral.10",
            width: "100%",
            paddingY: "10px",
            fontWeight: 500,
            fontSize: "15px",
          }}
          className={`${"bg-neutral-30 text-neutral-70"}`}
        >
          Selanjutnya
        </Button>
      </Paper>
    </div>
  );
};

export default FormGadai;
