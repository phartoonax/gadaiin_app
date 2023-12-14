import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { Button, Dialog, DialogContentText, Paper, Stack } from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @description Komponen ini menampilkan formulir Gadai. Formulir ini mencakup bidang seperti Nama, Telpon, Alamat Tinggal, No. Identitas Sesuai KTP, dan Foto Pelanggan. Ada juga indikator kemajuan dan tombol 'Selanjutnya' di bagian bawah.
 * @author Henry
 * @date 27/11/2023 - 3:10:08 PM
 * @return {*} Komponen React yang menampilkan formulir Gadai.
 */
const FormDataPelangganGadai = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataPelanggan = location?.state?.dataPelanggan || null;
  const [savedImage, setSavedImage] = useState(() => {
    if (dataPelanggan && dataPelanggan.noCustomer) {
      return (
        JSON.parse(
          localStorage.getItem("savedImage-" + dataPelanggan.noCustomer)
        ) || null
      );
    }
    return JSON.parse(localStorage.getItem("savedImage-TempCustomer")) || null;
  });
  const [valueName, setValueName] = useState(dataPelanggan?.name || undefined);
  const [valuePhoneNumber, setValuePhoneNumber] = useState(
    dataPelanggan?.phoneNumber || undefined
  );
  const [valueAddress, setValueAddress] = useState(
    dataPelanggan?.address || undefined
  );
  const [valueNoCustomer, setValueNoCustomer] = useState(
    dataPelanggan?.noCustomer || undefined
  );

  const [isFormComplete, setIsFormComplete] = useState(false);

  const [isDialogOpenConfirmationPass, setIsDialogOpenConfirmationPass] =
    useState(false);
  useEffect(() => {
    if (
      valueName &&
      valuePhoneNumber &&
      valueAddress &&
      valueNoCustomer &&
      savedImage
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [savedImage, valueAddress, valueName, valueNoCustomer, valuePhoneNumber]);

  const handleSetCustomerData = () => {
    navigate("/form/gadai/transaksi");
  };

  function handlerBackButton() {
    navigate("/list/gadai", { replace: true });
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <div className="fixed top-0 z-50">
          <AppBarPlain
            handlerBackButton={handlerBackButton}
            placeholder={"Tambah Gadai"}
          />
          <ProgressIndicatorForm />
        </div>
        <div className="bg-white px-4 pt-[112px] w-full pb-[82px]">
          <Stack gap={"20px"}>
            <IsiFormDefault
              enabled={true}
              title={"Nama"}
              isRequired={true}
              type={"button"}
              valueForm={valueName}
              valueFormChange={(e) => setValueName(e.target.value)}
            />
            <IsiFormDefault
              enabled={true}
              title={"Telpon"}
              type={"number"}
              isRequired={true}
              valueForm={valuePhoneNumber}
              valueFormChange={(e) => setValuePhoneNumber(e.target.value)}
            />
            <IsiFormDefault
              enabled={true}
              title={"Alamat Tinggal"}
              isRequired={true}
              valueForm={valueAddress}
              valueFormChange={(e) => setValueAddress(e.target.value)}
            />
            <IsiFormDefault
              enabled={dataPelanggan?.noCustomer ? false : true}
              title={"No. Identitas Sesuai KTP"}
              type={"number"}
              isRequired={true}
              valueForm={valueNoCustomer}
              valueFormChange={(e) => setValueNoCustomer(e.target.value)}
            />
            <PhotoCameraForm
              title={"Foto Pelanggan"}
              savedImage={savedImage}
              setSavedImage={setSavedImage}
              idPelanggan={dataPelanggan?.noCustomer ?? "TempCustomer"}
              enabled={true}
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
          <DialogContentText className="text-center text-sm font-semibold leading-[18px] text-black ">
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
            }}
            disabled={!isFormComplete}
            className={`${
              isFormComplete
                ? "bg-themeColor text-neutral-10"
                : "bg-neutral-30 text-neutral-70"
            }
            hover:bg-themeColor text-sm font-bold`}
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
