import { Icon } from "@iconify/react";
import { Divider, IconButton, Stack, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import { drawerStyle } from "../../variableGlobal";

const IsiTglAwalAkhirDurasiForm = () => {
  const tglKredit = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const [durasiGadai, setDurasiGadai] = useState(null);
  const [tglJatuhTempo, setTglJatuhTempo] = useState(null);

  const [isDrawerDurasiGadaiOpen, setIsDrawerDurasiGadaiOpen] = useState(false);

  function handleDurasiGadaiClick() {
    setIsDrawerDurasiGadaiOpen(true);
    console.log(durasiGadai);
  }

  function handleDurasiGadaiChange(item) {
    setDurasiGadai(item.durasi);
    setIsDrawerDurasiGadaiOpen(false);
  }

  const arrayTemplateDurasiGadai = [
    { durasi: "6 Hari", persentase: 7 },
    { durasi: "1 Bulan", persentase: 10 },
    { durasi: "2 Bulan", persentase: 8 },
    { durasi: "1 Tahun", persentase: 9 },
    { durasi: "2 Tahun", persentase: 11 },
  ];

  return (
    <>
      <Stack gap="20px">
        <Stack gap="8px">
          <Stack direction="row" gap={"2px"}>
            <span className="text-neutral-100 text-base font-bold">
              {"Tgl. Kredit"}
            </span>
          </Stack>
          <input
            type={"text"}
            disabled={true}
            value={tglKredit}
            className={`w-full  rounded-md border p-[11px] border-neutral-40 bg-neutral-20 text-neutral-60 focus:outline-none`}
          />
        </Stack>
        <Stack gap="8px">
          <Stack direction="row" gap={"2px"}>
            <span className="text-neutral-100 text-base font-bold">
              {"Lama Gadai"}
            </span>

            <span className="text-danger-Main text-lg font-bold">*</span>
          </Stack>
          <div className="relative">
            <div
              onClick={() => handleDurasiGadaiClick()}
              className="w-full h-[48px] rounded-md border p-[11px] border-neutral-40 bg-neutral-10 text-neutral-60 focus:outline-none"
            >
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
            className={`w-full  rounded-md border p-[11px] border-neutral-40 bg-neutral-20 text-neutral-60 focus:outline-none`}
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
        {" "}
        <div className="w-full pt-[5px] pb-[12px] flex-col justify-center items-center gap-[10px] inline-flex">
          <div className="w-[38px] h-[2px] bg-green-600 rounded-md"></div>
        </div>
        <Stack className="px-4" direction="row" justifyContent="space-between">
          <IconButton
            onClick={() => isDrawerDurasiGadaiOpen(false)}
            style={{
              width: "62px",
              justifyContent: "flex-start",
              paddingLeft: "0px",
            }}
          >
            <Icon
              icon={"feather:x"}
              className="text-success-Main"
              style={{ fontSize: "24px" }}
            ></Icon>
          </IconButton>
          <div className="text-base leading-[18px] font-bold text-success-Main text-center items-center flex ">
            Lama Gadai
          </div>
          <div style={{ width: "62px" }}></div>{" "}
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
              className="py-[10px] text-base text-black font-bold"
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
