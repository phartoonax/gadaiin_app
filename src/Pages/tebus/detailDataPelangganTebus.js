import { Button, Paper, Stack } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import ProgressIndicatorDetail from "../../components/detail/progressIndicatorDetail";
import AppBarPlain from "../../components/appBarPlain";

function DetailDataPelangganTebus() {
  const navigation = useNavigate();
  const location = useLocation();
  const dataPelanggan = location?.state?.dataDetailPelangganGadai || null;
  const isFormComplete = true;

  const handleSetCustomerData = () => {
    navigation("/detail/tebus/transaksi", {
      state: { dataDetailPelangganGadai: dataPelanggan },
    });
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <div className="fixed top-0 z-50">
          <AppBarPlain placeholder={"Detail Gadai"} />
          <ProgressIndicatorDetail />
        </div>
        <div className="bg-white px-4 pt-[112px] w-full pb-[82px]">
          <Stack gap={"20px"}>
            <IsiFormDefault
              enabled={false}
              title={"Nama"}
              isRequired={true}
              type={"button"}
              valueForm={dataPelanggan?.namacustomer || undefined}
            />
            <IsiFormDefault
              enabled={false}
              title={"Telpon"}
              type={"number"}
              isRequired={true}
              valueForm={dataPelanggan?.telp || undefined}
            />
            <IsiFormDefault
              enabled={false}
              title={"Alamat Tinggal"}
              isRequired={true}
              valueForm={dataPelanggan?.address || undefined}
            />
            <IsiFormDefault
              enabled={false}
              title={"No. Identitas Sesuai KTP"}
              isRequired={true}
              valueForm={dataPelanggan?.noidentitas || undefined}
            />
            <PhotoCameraForm
              title={"Foto Pelanggan"}
              savedImage={dataPelanggan?.fotoCustomer}
              setSavedImage={null}
              idPelanggan={dataPelanggan?.uuidcustomer}
              enabled={false}
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
            }}
            disabled={!isFormComplete}
            className={`${
              isFormComplete
                ? "bg-themeColor text-neutral-10"
                : "bg-neutral-30 text-neutral-70"
            }
            hover:bg-themeColor text-sm font-bold`}
            onClick={() => handleSetCustomerData()}
          >
            Selanjutnya
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default DetailDataPelangganTebus;
