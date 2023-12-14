import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorDetail from "../../components/detail/progressIndicatorDetail";
import { Button, Paper, Stack } from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import ChipKelengkapanForm from "../../components/form/chipKelengkapanForm";
import { useState } from "react";
import PageKelengkapanForm from "../../components/form/pageKelengkapanForm";
import IsiTglAwalAkhirDurasiForm from "../../components/form/isiTglAwalAkhirDurasiForm";
import IsiBungaForm from "../../components/form/isiBungaForm";
import { useEffect } from "react";
import { pemisahRibuan } from "../../functionGlobal";
import PhotoCameraForm from "../../components/form/photoCameraForm";

function DetailDataTransaksiGadai() {
  const Navigate = useNavigate();
  const location = useLocation();
  const dataPelanggan = location?.state?.dataDetailPelangganGadai || null;

  const [valueBunga, setValueBunga] = useState(
    dataPelanggan?.bunga || undefined
  );
  const [valueNominal, setValueNominal] = useState();

  const handleNavigateToBack = () => {
    Navigate(-1);
  };
  const setDurasiDanBungaValue = (durasi, bunga) => {
    // setValueBunga(bunga);
  };

  const convertLamaGadai = (lamaGadai) => {
    const daysInYear = 365;
    const daysInMonth = 30;
    const daysInWeek = 7;

    if (lamaGadai >= daysInYear) {
      const years = Math.floor(lamaGadai / daysInYear);
      return years + " Tahun";
    } else if (lamaGadai >= daysInMonth) {
      const months = Math.floor(lamaGadai / daysInMonth);
      return months + " Bulan";
    } else if (lamaGadai >= daysInWeek) {
      const weeks = Math.floor(lamaGadai / daysInWeek);
      return weeks + " Minggu";
    } else {
      return lamaGadai + " Hari";
    }
  };

  const [showFullPageModal, setShowFullPageModal] = useState(false);

  useEffect(() => {
    // Calculate nominal value
    if (valueBunga && dataPelanggan?.nilaipinjaman) {
      const bunga = parseFloat(valueBunga) / 100;
      const nominal = Number(
        String(dataPelanggan?.nilaipinjaman).replace(/\./g, "")
      );
      const hasil = bunga * nominal;

      setValueNominal(pemisahRibuan(Math.round(hasil)));
    }
  }, [dataPelanggan?.nilaipinjaman, valueBunga]);

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
              valueForm={dataPelanggan?.kodegadai || undefined}
            />
            <IsiFormDefault
              enabled={false}
              title={"Jaminan"}
              isRequired={true}
              valueForm={dataPelanggan?.jaminanbarang || undefined}
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
              valueForm={dataPelanggan?.noseri || undefined}
            />
            <IsiTglAwalAkhirDurasiForm
              tglKreditLama={dataPelanggan?.tglkredit}
              durasiGadaiLama={convertLamaGadai(dataPelanggan?.lamagadai)}
              setDurasiDanBungaValue={setDurasiDanBungaValue}
              enabled={false}
            />
            <IsiFormDefault
              enabled={false}
              title={"Nilai Pinjaman"}
              isRequired={true}
              valueForm={
                pemisahRibuan(dataPelanggan?.nilaipinjaman) || undefined
              }
            />
            <IsiBungaForm valueBunga={valueBunga} valueNominal={valueNominal} />
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
                fontWeight: 500,
                fontSize: "15px",
              }}
              disabled={false}
              className="bg-themeColor text-neutral-10 hover:bg-themeColor border border-neutral-40"
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

export default DetailDataTransaksiGadai;
