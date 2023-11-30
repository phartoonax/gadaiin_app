import React from "react";
import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const FormDataTransaksiPerpanjang = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const dataPelanggan = location?.state?.dataPelangganPerpanjang || null;
  console.log("idPelanggan", dataPelanggan);

  const clearFormData = () => {
    // Clear state

    // setValueJaminan("");
    // setKelengkapanValues([]);
    // setValueNoSeri("");
    // setValueBunga("");
    // setValueNilaiPinjaman("");
    // setValueNominal("");
    // setValueSavedImage(null);

    // Clear localStorage
    localStorage.removeItem("valueJaminan");
    localStorage.removeItem("kelengkapanValues");
    localStorage.removeItem("valueNoSeri");
    localStorage.removeItem("valueBunga");
    localStorage.removeItem("valueNilaiPinjaman");
    localStorage.removeItem("savedImage-tempBarang");
  };
  const handleNavigateToBack = () => {
    clearFormData();
    Navigate(-1);
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
      <div className="fixed top-0 z-50">
        <AppBarPlain
          placeholder={"Tambah Gadai"}
          handlerBackButton={handleNavigateToBack}
        />
        <ProgressIndicatorForm isFirstDone={true} />
      </div>
      <div className="bg-white px-4 pt-[112px] w-full pb-[82px]">
        <Stack gap={"20px"}></Stack>
      </div>
    </div>
  );
};

export default FormDataTransaksiPerpanjang;
