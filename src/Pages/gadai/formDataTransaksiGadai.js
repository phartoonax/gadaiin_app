import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { Stack } from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import React, { useState } from "react";
import IsiTglAwalAkhirDurasiForm from "../../components/form/isiTglAwalAkhirDurasiForm";
import ChipKelengkapanForm from "../../components/form/chipKelengkapanForm";
import PangeKelengkapanForm from "../../components/form/pageKelengkapanForm";
import IsiBungaForm from "../../components/form/isiBungaForm";
import { useEffect } from "react";
import { pemisahRibuan } from "../../functionGlobal";

const FormDataTransaksiGadai = () => {
  const [savedImage, setSavedImage] = useState(
    JSON.parse(localStorage.getItem("savedImage-tempBarang")) || null
  );

  const [kelengkapanValues, setKelengkapanValues] = useState([]);
  const [showFullPageModal, setShowFullPageModal] = useState(false);

  const [valueBunga, setValueBunga] = useState();
  const [valueNilaiPinjaman, setValueNilaiPinjaman] = useState();
  const [valueNominal, setValueNominal] = useState();

  const defaultChipValues = [
    "Surat Keterangan Hak Milik",
    "BPKB",
    "STNK",
    "Kardus",
    "Charger",
  ];

  useEffect(() => {
    if (valueBunga && valueNilaiPinjaman) {
      const bunga = parseFloat(valueBunga) / 100;
      const nominal = Number(valueNilaiPinjaman.replace(/\./g, ""));
      const hasil = bunga * nominal;

      setValueNominal(pemisahRibuan(Math.round(hasil)));
    }
  }, [valueBunga, valueNilaiPinjaman]);

  const chipValues =
    kelengkapanValues && kelengkapanValues.length > 0
      ? kelengkapanValues
      : defaultChipValues;

  const handleChipClick = (value) => {
    setKelengkapanValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((v) => v !== value);
      } else {
        return [...prevValues, value];
      }
    });
  };

  const handleNilaiPinjamanChange = (newValue) => {
    const numberValue = Number(newValue.replace(/\./g, ""));
    const displayValue = pemisahRibuan(numberValue);
    setValueNilaiPinjaman(displayValue);
  };

  return (
    <>
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
            <ChipKelengkapanForm
              chipValues={chipValues}
              handleChipClick={handleChipClick}
              SelectedChipValues={kelengkapanValues}
              title={"Kelengkapan"}
              setShowFullPageModal={setShowFullPageModal}
              isRequired={true}
            />
            <IsiFormDefault
              enabled={true}
              title={"IMEI / No. Seri"}
              isRequired={true}
              valueForm={undefined}
            />
            <IsiTglAwalAkhirDurasiForm setBungaValue={setValueBunga} />
            <IsiFormDefault
              enabled={true}
              title={"Nilai Pinjaman"}
              isRequired={true}
              valueForm={valueNilaiPinjaman}
              valueFormChange={(e) => handleNilaiPinjamanChange(e.target.value)}
            />
            <IsiBungaForm valueBunga={valueBunga} valueNominal={valueNominal} />
            <PhotoCameraForm
              title={"Foto Barang"}
              savedImage={savedImage}
              setSavedImage={setSavedImage}
              idPelanggan={"tempBarang"}
            />
          </Stack>
        </div>
        {showFullPageModal && (
          <PangeKelengkapanForm
            setShowFullPageModal={setShowFullPageModal}
            setKelengkapanValues={setKelengkapanValues}
          />
        )}
      </div>
    </>
  );
};

export default FormDataTransaksiGadai;
