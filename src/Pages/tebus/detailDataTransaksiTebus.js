import React from "react";
import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorDetail from "../../components/detail/progressIndicatorDetail";
import { Button, Paper, Stack } from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import ChipKelengkapanForm from "../../components/form/chipKelengkapanForm";
import IsiTglAwalAkhirDurasiForm from "../../components/form/isiTglAwalAkhirDurasiForm";
import IsiBungaForm from "../../components/form/isiBungaForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import PageKelengkapanForm from "../../components/form/pageKelengkapanForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { pemisahRibuan } from "../../functionGlobal";
import CheckBoxInputCashback from "../../components/form/checkBoxInputCashback";

function DetailDataTransaksiTebus() {
  const Navigate = useNavigate();
  const location = useLocation();
  const dataPelanggan = location?.state?.dataDetailPelangganGadai || null;

  const [valueBunga, setValueBunga] = useState();
  const [valueNominal, setValueNominal] = useState();

  const handleNavigateToBack = () => {
    Navigate(-1);
  };
  const setDurasiDanBungaValue = (durasi, bunga) => {
    setValueBunga(bunga);
  };

  const [showFullPageModal, setShowFullPageModal] = useState(false);

  useEffect(() => {
    // Calculate nominal value
    if (valueBunga) {
      const bunga = parseFloat(valueBunga) / 100;
      const nominal = Number(dataPelanggan?.harga.replace(/\./g, ""));
      const hasil = bunga * nominal;

      setValueNominal(pemisahRibuan(Math.round(hasil)));
    }
  }, [dataPelanggan?.harga, valueBunga]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <div className="fixed top-0 z-50">
          <AppBarPlain
            placeholder={"Detail Gadai"}
            handlerBackButton={handleNavigateToBack}
          />
          <ProgressIndicatorDetail isFirstDone={true} />
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
            <CheckBoxInputCashback enabled={false} />
            <PhotoCameraForm
              title={"Bukti Pembayaran Non Tunai"}
              savedImage={dataPelanggan?.fotoBarang}
              setSavedImage={null}
              idPelanggan={dataPelanggan?.noCustomer}
              enabled={false}
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
            {" "}
            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
                color: "neutral.10",
                width: "100%",
                paddingY: "10px",
              }}
              disabled={false}
              className="bg-themeColor text-neutral-10 hover:bg-themeColor border border-neutral-40 text-sm font-bold"
              onClick={() => handleNavigateToBack()}
            >
              Sebelumnya
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
      </div>
    </>
  );
}

export default DetailDataTransaksiTebus;
