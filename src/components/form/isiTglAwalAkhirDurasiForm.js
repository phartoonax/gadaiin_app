import { Icon } from "@iconify/react";
import { Divider, IconButton, Stack, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import { drawerStyle } from "../../variableGlobal";
import { useEffect } from "react";
import { useMemo } from "react";

/**
 * @description Komponen ini digunakan untuk menampilkan dan mengelola form tanggal awal, akhir, dan durasi. Komponen ini menggunakan `SwipeableDrawer` untuk menampilkan opsi durasi kepada pengguna.
 * @author Henry
 * @date 30/11/2023 - 4:27:56 PM
 * @param {function} setDurasiDanBungaValue Fungsi yang dipanggil untuk mengatur nilai durasi dan bunga.
 * @param {string} tglKreditLama Nilai tanggal kredit yang akan ditampilkan pada form jika form adalah bagian dari tebus atau perpanjang dimana sudah ada isi tanggal Kredit sebelumnya.
 * @param {string} durasiGadaiLama Nilai durasi gadai yang akan ditampilkan pada form jika form adalah bagian dari tebus atau perpanjang dimana sebelumnya sudah data durasi.
 * @param {boolean} enabled Menentukan apakah isi dari form dapat diubah atau tidak.
 * @return {*} Komponen React yang menampilkan form tanggal awal, akhir, dan durasi.
 */
const IsiTglAwalAkhirDurasiForm = ({
  tglKreditLama,
  durasiGadaiLama,
  setDurasiDanBungaValue,
  enabled,
}) => {
  const isEnabled = enabled ?? true;
  const arrayTemplateDurasiGadai = useMemo(
    () => [
      { durasi: "6 Hari", persentase: 7 },
      { durasi: "1 Bulan", persentase: 10 },
      { durasi: "2 Bulan", persentase: 8 },
      { durasi: "1 Tahun", persentase: 9 },
      { durasi: "2 Tahun", persentase: 11 },
    ],
    []
  ); //MUNGKIN BISA DIHAPUS UNTUK DURASI YANG SEBELUM DURASI LAMA

  const tglKredit =
    tglKreditLama === undefined
      ? new Date()
      : new Date(Date.parse(tglKreditLama));
  const [durasiGadai, setDurasiGadai] = useState(
    durasiGadaiLama === undefined
      ? arrayTemplateDurasiGadai[0].durasi
      : durasiGadaiLama
  );
  const [tglJatuhTempo, setTglJatuhTempo] = useState(null);

  const [isDrawerDurasiGadaiOpen, setIsDrawerDurasiGadaiOpen] = useState(false);

  function handleDurasiGadaiClick() {
    setIsDrawerDurasiGadaiOpen(true);
  }

  function handleDurasiGadaiChange(item) {
    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }
    setDurasiGadai(item.durasi);
    let periodeInDays;

    if (item.durasi.includes("Hari")) {
      periodeInDays = parseInt(item.durasi.split(" ")[0]);
    } else if (item.durasi.includes("Bulan")) {
      periodeInDays = parseInt(item.durasi.split(" ")[0]) * 30;
    } else if (item.durasi.includes("Tahun")) {
      periodeInDays = parseInt(item.durasi.split(" ")[0]) * 365;
    }

    const tgljatuhtempo = addDays(new Date(tglKredit), periodeInDays);
    setTglJatuhTempo(
      tgljatuhtempo.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
    if (setDurasiDanBungaValue) {
      setDurasiDanBungaValue(item.durasi, item.persentase);
    }
    setIsDrawerDurasiGadaiOpen(false);
  }

  useEffect(() => {
    if (durasiGadaiLama) {
      const correspondingEntry = arrayTemplateDurasiGadai.find(
        (entry) => entry.durasi === durasiGadaiLama
      );
      if (correspondingEntry) {
        handleDurasiGadaiChange(correspondingEntry);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack gap="20px" className="font-inter">
        <Stack gap="8px">
          <Stack direction="row" gap={"2px"}>
            <span className="text-neutral-100 text-base font-bold">
              {"Tgl. Kredit"}
            </span>
          </Stack>
          <input
            type={"text"}
            disabled={true}
            value={tglKredit.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            className={`w-full  rounded-md border px-[15px] py-4 border-neutral-40 bg-neutral-20 text-neutral-60 text-sm focus:outline-none`}
          />
        </Stack>
        <Stack gap="8px">
          <Stack direction="row" gap={"2px"}>
            <span className="text-neutral-100 text-base font-bold">
              {"Lama Gadai"}
            </span>

            <span className="text-danger-Main text-lg font-bold">*</span>
          </Stack>
          <div
            className="relative"
            onClick={() => isEnabled && handleDurasiGadaiClick()}
          >
            <div className="w-full h-[48px] flex items-center rounded-md border px-[15px] py-4 border-neutral-40 bg-neutral-10 text-neutral-100 text-sm focus:outline-none">
              {durasiGadai}
            </div>
            <Icon
              icon={"feather:chevron-down"}
              fontSize={"24px"}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3"
            ></Icon>
          </div>
        </Stack>
        <Stack gap="8px">
          <Stack direction="row" gap={"2px"}>
            <span className="text-neutral-100 text-base font-bold">
              {"Jatuh Tempo"}
            </span>
          </Stack>
          <input
            type={"text"}
            disabled={true}
            value={tglJatuhTempo}
            className={`w-full  rounded-md border px-[15px] py-4 border-neutral-40 bg-neutral-20 text-neutral-60 text-sm focus:outline-none`}
          />
        </Stack>
      </Stack>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerDurasiGadaiOpen}
        onClose={() => setIsDrawerDurasiGadaiOpen(false)}
        PaperProps={{ style: drawerStyle }}
        swipeAreaWidth={"38px"}
        disableSwipeToOpen={true}
      >
        <div className="w-full pt-[5px] pb-[6px] flex-col justify-center items-center gap-[10px] inline-flex">
          <div className="w-[38px] h-[2px] bg-success-Pressed rounded-md"></div>
        </div>
        <Stack
          className="px-4 pb-[19px]"
          direction="row"
          justifyContent="space-between"
        >
          <IconButton
            onClick={() => isDrawerDurasiGadaiOpen(false)}
            style={{
              width: "62px",
              justifyContent: "flex-start",
              padding: "0px",
            }}
          >
            <Icon
              icon={"feather:x"}
              className="text-success-Main"
              style={{ fontSize: "24px" }}
            ></Icon>
          </IconButton>
          <div className="text-sm font-bold text-success-Main text-center items-center flex ">
            Lama Gadai
          </div>
          <div style={{ width: "62px" }}></div>
          {/* Empty div to push the second item to the middle */}
        </Stack>
        <Stack
          divider={<Divider variant="fullWidth" sx={{ marginY: "10px" }} />}
          sx={{ px: "16px", mb: "16px" }}
        >
          {arrayTemplateDurasiGadai.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              className=" text-sm text-black font-bold"
              onClick={() => {
                handleDurasiGadaiChange(item);
              }}
            >
              <div className="">{item.durasi}</div>
              <div className="px-1">{"-"}</div>
              <div className="">{item.persentase + "%"}</div>
            </Stack>
          ))}
        </Stack>
      </SwipeableDrawer>
    </>
  );
};

export default IsiTglAwalAkhirDurasiForm;
