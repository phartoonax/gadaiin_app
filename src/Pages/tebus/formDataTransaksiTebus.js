import React, { useEffect } from "react";
import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContentText, Paper, Stack } from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import ChipKelengkapanForm from "../../components/form/chipKelengkapanForm";
import { useState } from "react";
import IsiTglAwalAkhirDurasiForm from "../../components/form/isiTglAwalAkhirDurasiForm";
import IsiBungaForm from "../../components/form/isiBungaForm";
import { pemisahRibuan } from "../../functionGlobal";
import PageKelengkapanForm from "../../components/form/pageKelengkapanForm";
import CheckBoxInputCashback from "../../components/form/checkBoxInputCashback";

function FormDataTransaksiTebus() {
  const Navigate = useNavigate();
  const location = useLocation();
  const dataPelanggan = location?.state?.dataPelangganPerpanjang || null;

  const [valueImageBuktiPembayaran, setValueImageBuktiPembayaran] = useState(
    JSON.parse(
      localStorage.getItem("savedImage-Bukti-" + dataPelanggan?.noCustomer)
    ) || null
  );

  const [valueBunga, setValueBunga] = useState();

  const [valueNominal, setValueNominal] = useState();

  const [showFullPageModal, setShowFullPageModal] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [isDialogOpenConfirmationPass, setIsDialogOpenConfirmationPass] =
    useState(false);

  const clearFormData = () => {
    // Clear state

    setValueImageBuktiPembayaran(null);

    // Clear localStorage
    localStorage.removeItem("valueJaminan");
    localStorage.removeItem("kelengkapanValues");
    localStorage.removeItem("valueNoSeri");
    localStorage.removeItem("valueBunga");
    localStorage.removeItem("valueNilaiPinjaman");
    localStorage.removeItem("savedImage-tempBarang");
    localStorage.removeItem("savedImage-Bukti-" + dataPelanggan?.noCustomer);
  };

  const setDurasiDanBungaValue = (durasi, bunga) => {
    setValueBunga(bunga);
  };
  const handleNavigateToBack = () => {
    clearFormData();
    Navigate(-1);
  };

  const handleConfirmSubmitData = () => {
    clearFormData();
    Navigate("/main");
  };

  useEffect(() => {
    // Calculate nominal value
    if (valueBunga) {
      const bunga = parseFloat(valueBunga) / 100;
      const nominal = Number(dataPelanggan?.harga.replace(/\./g, ""));
      const hasil = bunga * nominal;

      setValueNominal(pemisahRibuan(Math.round(hasil)));
    }

    // Check if form is complete
    if (valueImageBuktiPembayaran) {
      setIsFormComplete(true);
    }
  }, [dataPelanggan?.harga, valueBunga, valueImageBuktiPembayaran]);

  const [valueAlasanCashback, setValueAlasanCashback] = useState();

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <div className="fixed top-0 z-50">
          <AppBarPlain
            placeholder={"Tebus Gadai"}
            handlerBackButton={handleNavigateToBack}
          />
          <ProgressIndicatorForm isFirstDone={true} />
        </div>
        <div className="bg-white px-4 pt-[112px] w-full pb-[82px]">
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
              valueForm={dataPelanggan?.noGadai || undefined}
            />
            <IsiFormDefault
              enabled={false}
              title={"Jaminan"}
              isRequired={true}
              valueForm={dataPelanggan?.jaminan || undefined}
            />
            <ChipKelengkapanForm
              title={"Kelengkapan"}
              chipValues={dataPelanggan?.kelengkapan || undefined}
              SelectedChipValues={dataPelanggan?.kelengkapan || undefined}
              handleChipClick={null}
              setShowFullPageModal={setShowFullPageModal}
              isRequired={true}
              enabled={false}
            />
            <IsiFormDefault
              enabled={false}
              title={"IMEI / No. Seri"}
              isRequired={true}
              valueForm={dataPelanggan?.noSeri || undefined}
            />
            <IsiTglAwalAkhirDurasiForm
              tglKreditLama={dataPelanggan?.tglKredit}
              durasiGadaiLama={dataPelanggan?.lamaGadai}
              setDurasiDanBungaValue={setDurasiDanBungaValue}
              enabled={false}
            />
            <IsiFormDefault
              enabled={false}
              title={"Nilai Pinjaman"}
              isRequired={true}
              valueForm={dataPelanggan?.harga || undefined}
            />
            <IsiBungaForm valueBunga={valueBunga} valueNominal={valueNominal} />
            <CheckBoxInputCashback
              textboxValue={valueAlasanCashback}
              setTextboxValue={setValueAlasanCashback}
            />
            <PhotoCameraForm
              title={"Bukti Pembayaran Non Tunai"}
              savedImage={valueImageBuktiPembayaran}
              setSavedImage={setValueImageBuktiPembayaran}
              idPelanggan={"Bukti-" + dataPelanggan?.noCustomer}
              enabled={true}
              type={"bukti"}
            />
            <PhotoCameraForm
              title={"Foto Barang"}
              savedImage={dataPelanggan?.fotoBarang}
              setSavedImage={null}
              idPelanggan={dataPelanggan?.noCustomer}
              enabled={false}
            />
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
          <Stack direction={"row"} gap={"10px"} className="">
            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
                color: "neutral.10",
                width: "100%",
                paddingY: "10px",
              }}
              disabled={false}
              className="bg-neutral-10 text-neutral-100 hover:bg-neutral-10 border border-neutral-40 font-bold text-sm"
              onClick={() => handleNavigateToBack()}
            >
              Sebelumnya
            </Button>
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
  hover:bg-themeColor  font-bold text-sm`}
              onClick={() => setIsDialogOpenConfirmationPass(true)}
            >
              Simpan
            </Button>
          </Stack>
        </Paper>
        {showFullPageModal && (
          <PageKelengkapanForm
            setShowFullPageModal={setShowFullPageModal}
            presetKelengkapanArray={dataPelanggan?.kelengkapan || undefined}
            enabled={false}
          />
        )}
        <Dialog
          sx={{ borderRadius: "8px" }}
          open={isDialogOpenConfirmationPass}
          onClose={() => setIsDialogOpenConfirmationPass(false)}
          PaperProps={{
            sx: { borderRadius: "8px", marginX: "16px", padding: "16px" },
          }}
        >
          <DialogContentText className="text-center text-sm font-semibold leading-[18px] text-black ">
            Apakah anda yakin data gadai yang anda masukkan sudah benar?
          </DialogContentText>
          <Stack
            direction="row"
            gap={"10px"}
            className="w-full justify-between pt-4"
          >
            <Button
              variant="contained"
              className="text-neutral-10 bg-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold hover:bg-success-Main"
              onClick={() => handleConfirmSubmitData()}
            >
              Ya
            </Button>
            <Button
              variant="outlined"
              className="text-success-Main border-success-Main hover:border-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold"
              onClick={() => setIsDialogOpenConfirmationPass(false)}
            >
              Tidak
            </Button>
          </Stack>
        </Dialog>
      </div>
    </>
  );
}

export default FormDataTransaksiTebus;
