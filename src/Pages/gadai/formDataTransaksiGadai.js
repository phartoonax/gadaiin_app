import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { Button, Dialog, DialogContentText, Paper, Stack } from "@mui/material";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import PhotoCameraForm from "../../components/form/photoCameraForm";
import React, { useState } from "react";
import IsiTglAwalAkhirDurasiForm from "../../components/form/isiTglAwalAkhirDurasiForm";
import ChipKelengkapanForm from "../../components/form/chipKelengkapanForm";
import PageKelengkapanForm from "../../components/form/pageKelengkapanForm";
import IsiBungaForm from "../../components/form/isiBungaForm";
import { useEffect } from "react";
import { pemisahRibuan } from "../../functionGlobal";
import { useNavigate } from "react-router-dom";

/**
 * @description Komponen ini digunakan untuk mengelola data transaksi gadai. Pengguna dapat memasukkan data transaksi, seperti jaminan, kelengkapan, nomor seri, bunga, nilai pinjaman, dan foto barang. Data ini kemudian disimpan di localStorage dan dapat dihapus jika diperlukan. Komponen ini juga mengelola navigasi dan konfirmasi pengiriman data.
 * @author Henry
 * @date 30/11/2023 - 4:32:01 PM
 * @return {*} Formulir data transaksi gadai dengan fitur pengisian data, penyimpanan data, penghapusan data, navigasi, dan konfirmasi pengiriman data.
 */
const FormDataTransaksiGadai = () => {
  const Navigate = useNavigate();

  const [showFullPageModal, setShowFullPageModal] = useState(false);

  const [valueJaminan, setValueJaminan] = useState(
    localStorage.getItem("valueJaminan") || ""
  );
  const [kelengkapanValues, setKelengkapanValues] = useState(
    JSON.parse(localStorage.getItem("kelengkapanValues")) || []
  );
  const [valueNoSeri, setValueNoSeri] = useState(
    localStorage.getItem("valueNoSeri") || ""
  );
  const [valueDurasi, setValueDurasi] = useState(
    localStorage.getItem("valueDurasi") || ""
  );
  const [valueBunga, setValueBunga] = useState(
    localStorage.getItem("valueBunga") || ""
  );
  const [valueNilaiPinjaman, setValueNilaiPinjaman] = useState(
    localStorage.getItem("valueNilaiPinjaman") || null
  );
  const [valueNominal, setValueNominal] = useState();
  const [ValueSavedImage, setValueSavedImage] = useState(
    JSON.parse(localStorage.getItem("savedImage-tempBarang")) || null
  );

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isDialogOpenConfirmationPass, setIsDialogOpenConfirmationPass] =
    useState(false);

  const defaultChipValues = [
    "Surat Keterangan Hak Milik",
    "BPKB",
    "STNK",
    "Kardus",
    "Charger",
  ];

  useEffect(() => {
    // Calculate nominal value
    if (valueBunga && valueNilaiPinjaman) {
      const bunga = parseFloat(valueBunga) / 100;
      const nominal = Number(valueNilaiPinjaman.replace(/\./g, ""));
      const hasil = bunga * nominal;

      setValueNominal(pemisahRibuan(Math.round(hasil)));
    }

    // Check if form is complete
    if (
      valueJaminan &&
      kelengkapanValues.length > 0 &&
      valueNoSeri &&
      valueBunga &&
      valueNilaiPinjaman &&
      ValueSavedImage
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }

    // Store form data in localStorage
    localStorage.setItem("valueJaminan", valueJaminan);
    localStorage.setItem(
      "kelengkapanValues",
      JSON.stringify(kelengkapanValues)
    );
    localStorage.setItem("valueNoSeri", valueNoSeri);
    localStorage.setItem("valueDurasi", valueDurasi);
    localStorage.setItem("valueBunga", valueBunga);
    localStorage.setItem("valueNilaiPinjaman", valueNilaiPinjaman);
  }, [
    valueJaminan,
    kelengkapanValues,
    valueNoSeri,
    valueDurasi,
    valueBunga,
    valueNilaiPinjaman,
    ValueSavedImage,
  ]);

  const [SelectedChipValues, setSelectedChipValues] = useState([]);

  const chipValues =
    SelectedChipValues && SelectedChipValues.length > 0
      ? SelectedChipValues
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
  const handleChangeChipValues = (value) => {
    setSelectedChipValues(value);
    setKelengkapanValues(value);
  };

  const setDurasiDanBungaValue = (durasi, bunga) => {
    setValueDurasi(durasi);
    setValueBunga(bunga);
  };

  const handleNilaiPinjamanChange = (newValue) => {
    const numberValue = Number(newValue.replace(/\D/g, ""));
    const displayValue = pemisahRibuan(numberValue);
    setValueNilaiPinjaman(displayValue);
  };

  const clearFormData = () => {
    // Clear state
    setValueJaminan("");
    setKelengkapanValues([]);
    setValueNoSeri("");
    setValueDurasi("");
    setValueBunga("");
    setValueNilaiPinjaman("");
    setValueNominal("");
    setValueSavedImage(null);

    // Clear localStorage
    localStorage.removeItem("valueJaminan");
    localStorage.removeItem("kelengkapanValues");
    localStorage.removeItem("valueNoSeri");
    localStorage.removeItem("valueDurasi");
    localStorage.removeItem("valueBunga");
    localStorage.removeItem("valueNilaiPinjaman");
    localStorage.removeItem("savedImage-tempBarang");
  };

  const handleNavigateToBack = () => {
    clearFormData();
    Navigate(-1);
  };

  const handleConfirmSubmitData = () => {
    clearFormData();
    Navigate("/main");
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <div className="fixed top-0 z-50">
          <AppBarPlain
            placeholder={"Tambah Gadai"}
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
              valueForm={undefined}
            />
            <IsiFormDefault
              enabled={true}
              title={"Jaminan"}
              isRequired={true}
              valueForm={valueJaminan}
              valueFormChange={(e) => setValueJaminan(e.target.value)}
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
              valueForm={valueNoSeri}
              valueFormChange={(e) => setValueNoSeri(e.target.value)}
            />
            <IsiTglAwalAkhirDurasiForm
              setDurasiDanBungaValue={setDurasiDanBungaValue}
            />
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
              savedImage={ValueSavedImage}
              setSavedImage={setValueSavedImage}
              idPelanggan={"tempBarang"}
              enabled={true}
            />
          </Stack>
        </div>
        {showFullPageModal && (
          <PageKelengkapanForm
            setShowFullPageModal={setShowFullPageModal}
            setKelengkapanValues={handleChangeChipValues}
          />
        )}
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
                fontWeight: 500,
                fontSize: "15px",
              }}
              disabled={false}
              className="bg-neutral-10 text-neutral-100 hover:bg-neutral-10 border border-neutral-40"
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
              Simpan
            </Button>
          </Stack>
        </Paper>
        <Dialog
          sx={{ borderRadius: "8px" }}
          open={isDialogOpenConfirmationPass}
          onClose={() => setIsDialogOpenConfirmationPass(false)}
          PaperProps={{
            sx: { borderRadius: "8px", marginX: "16px", padding: "16px" },
          }}
        >
          <DialogContentText className="text-center text-sm font-semibold leading-[18px] text-neutral-100">
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
};

export default FormDataTransaksiGadai;
