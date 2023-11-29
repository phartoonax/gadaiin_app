import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Paper,
  Stack,
} from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @description Komponen ini menampilkan formulir Gadai. Formulir ini mencakup bidang seperti Nama, Telpon, Alamat Sesuai KTP, No. Identitas Sesuai KTP, dan Foto Pelanggan. Ada juga indikator kemajuan dan tombol 'Selanjutnya' di bagian bawah.
 * @author Henry
 * @date 27/11/2023 - 3:10:08 PM
 * @return {*} Komponen React yang menampilkan formulir Gadai.
 */
const FormDataPelangganGadai = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dataPelanggan = location?.state?.dataPelanggan || null;
  console.log("idPelanggan", dataPelanggan);
  const [savedImage, setSavedImage] = useState(
    JSON.parse(
      localStorage.getItem("savedImage-" + dataPelanggan?.noCustomer)
    ) || null
  );

  const [isFormComplete, setIsFormComplete] = useState(false);

  const [isDialogOpenConfirmationPass, setIsDialogOpenConfirmationPass] =
    useState(false);
  useEffect(() => {
    if (
      dataPelanggan?.name &&
      dataPelanggan?.phoneNumber &&
      dataPelanggan?.address &&
      dataPelanggan?.noCustomer &&
      savedImage
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [dataPelanggan, savedImage]);

  const handleSetCustomerData = () => {
    navigation("/form/gadai/transaksi");
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <div className="fixed top-0 z-50">
          <AppBarPlain placeholder={"Tambah Gadai"} />
          <ProgressIndicatorForm />
        </div>
        <div className="bg-white px-4 pt-[112px] w-full">
          <Stack gap={"20px"}>
            <IsiFormDefault
              enabled={true}
              title={"Nama"}
              isRequired={true}
              type={"button"}
              valueForm={dataPelanggan?.name || undefined}
            />
            <IsiFormDefault
              enabled={true}
              title={"Telpon"}
              type={"number"}
              isRequired={true}
              valueForm={dataPelanggan?.phoneNumber || undefined}
            />
            <IsiFormDefault
              enabled={true}
              title={"Alamat Sesuai KTP"}
              isRequired={true}
              valueForm={dataPelanggan?.address || undefined}
            />
            <IsiFormDefault
              enabled={true}
              title={"No. Identitas Sesuai KTP"}
              isRequired={true}
              valueForm={dataPelanggan?.noCustomer || undefined}
            />
            <PhotoCameraForm
              title={"Foto Pelanggan"}
              
              savedImage={savedImage}
              setSavedImage={setSavedImage}
              idPelanggan={dataPelanggan?.noCustomer}
            />
            <div className="h-16" />
          </Stack>
        </div>
        <Dialog
          sx={{ borderRadius: "8px" }}
          open={isDialogOpenConfirmationPass}
          onClose={() => setIsDialogOpenConfirmationPass(false)}
          PaperProps={{
            sx: { borderRadius: "8px", marginX: "16px", padding: "16px" },
          }}
        >
          <DialogContentText className="text-center text-base font-semibold leading-[18px] text-neutral-100 ">
            Apakah anda yakin data pelanggan yang anda masukkan sudah benar?
          </DialogContentText>
          <Stack
            direction="row"
            gap={"10px"}
            className="w-full justify-between pt-4"
          >
            <Button
              variant="outlined"
              className="text-success-Main border-success-Main hover:border-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold"
              onClick={() => setIsDialogOpenConfirmationPass(false)}
            >
              Tidak
            </Button>
            <Button
              variant="contained"
              className="text-neutral-10 bg-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold hover:bg-success-Main"
              onClick={handleSetCustomerData}
            >
              Ya
            </Button>
          </Stack>
        </Dialog>
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
            disabled={!isFormComplete}
            className={`${
              isFormComplete
                ? "bg-themeColor text-neutral-10"
                : "bg-neutral-30 text-neutral-70"
            }
            hover:bg-themeColor`}
            onClick={() => setIsDialogOpenConfirmationPass(true)}
          >
            Selanjutnya
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default FormDataPelangganGadai;
