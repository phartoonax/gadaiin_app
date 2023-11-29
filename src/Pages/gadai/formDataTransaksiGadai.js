import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { Stack } from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import React, { useState } from "react";
import IsiTglAwalAkhirDurasiForm from "../../components/form/isiTglAwalAkhirDurasiForm";

const FormDataTransaksiGadai = () => {
  const [savedImage, setSavedImage] = useState(
    JSON.parse(localStorage.getItem("savedImage-tempBarang")) || null
  );
  return (
    <>
      {" "}
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <div className="fixed top-0 z-50">
          <AppBarPlain placeholder={"Tambah Gadai"} />
          <ProgressIndicatorForm isFirstDone={true} />
        </div>
        <div className="bg-white px-4 pt-[112px] w-full">
          <Stack gap={"20px"}>
            <IsiFormDefault
              enabled={false}
              title={"Lokasi"}
              isRequired={false}
              valueForm={"Jabodetabek" || undefined}
            />
            <IsiFormDefault
              enabled={false}
              title={"No. Gadai"}
              isRequired={false}
              valueForm={undefined}
            />
            <IsiFormDefault
              enabled={true}
              title={"Jaminan"}
              isRequired={true}
              valueForm={undefined}
            />
            {/**TODO: ISI SATU LAGI FORM CHIP */}
            <IsiFormDefault
              enabled={true}
              title={"IMEI / No. Seri"}
              isRequired={true}
              valueForm={undefined}
            />
            <IsiTglAwalAkhirDurasiForm />
            <IsiFormDefault
              enabled={true}
              title={"Nilai Pinjaman"}
              isRequired={true}
              valueForm={undefined}
            />
            {/**TODO: ISI DENGAN KOMBINASI BUNGA DAN NOMINAL */}
            <PhotoCameraForm
              title={"Foto Barang"}
              savedImage={savedImage}
              setSavedImage={setSavedImage}
              idPelanggan={"tempBarang"}
            />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default FormDataTransaksiGadai;
