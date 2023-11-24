import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";

import { Icon } from "@iconify/react";
import CheckboxStatus from "./filters/checkboxstatus";
import ChipSelectPeriode from "./filters/chipselectperiode";
import SliderWithTextboxNilaiGadai from "./filters/sliderwtextboxnilaigadai";
import TextboxDateSelectorTglTrans from "./filters/textboxdateselectortgltrans";

const BotDrawerFilter = ({
  open: openDrawer,
  setOpen: setOpenDrawer,
  onFilterSubmit,
  setShowFullPageModal,
  ChangedPeriodeGadaiValues,
}) => {
  const drawerStyle = {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    position: "fixed",
    bottom: 0,
    zIndex: 999,
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
  };

  const [periodeGadaiValues, setPeriodeGadaiValues] = useState([]);

  useEffect(() => {
    if (ChangedPeriodeGadaiValues && ChangedPeriodeGadaiValues.length > 0) {
      setPeriodeGadaiValues(ChangedPeriodeGadaiValues);
    }
  }, [ChangedPeriodeGadaiValues]);

  const [checkboxStatusValues, setCheckboxStatusValues] = useState([]);

  const [valueDatePicker1, setValueDatePicker1] = useState(null);

  const [valueDatePicker2, setValueDatePicker2] = useState(null);

  const [valueSlider, setValueSlider] = useState([0, 5000000]);

  const pemisahRibuan = (harga) => {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChangeSlider = (event, newValue) => {
    const formattedValue = newValue.map((value) => pemisahRibuan(value));
    setValueSlider(newValue);
    setValueDisplaySlider(formattedValue);
  };

  const [valueDisplaySlider, setValueDisplaySlider] = useState([
    pemisahRibuan(0),
    pemisahRibuan(5000000),
  ]);
  const handleChangeDisplaySlider = (index, newValue) => {
    // Remove thousand separators and convert to number
    const numberValue = Number(newValue.replace(/\./g, ""));
    const displayValue = pemisahRibuan(numberValue);
    // Update valueSlider
    const newValueSlider = [...valueSlider];
    newValueSlider[index] = numberValue;
    setValueSlider(newValueSlider);

    // Update valueDisplaySlider
    const newValueDisplaySlider = [...valueDisplaySlider];
    newValueDisplaySlider[index] = displayValue;
    setValueDisplaySlider(newValueDisplaySlider);
  };

  const handleCheckboxChange = (event) => {
    const newArray = [...checkboxStatusValues];
    if (event.target.checked) {
      newArray.push(event.target.name);
    } else {
      const index = newArray.indexOf(event.target.name);
      if (index > -1) {
        newArray.splice(index, 1);
      }
    }

    setCheckboxStatusValues(newArray);
  };

  const handleChipClick = (value) => {
    setPeriodeGadaiValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((v) => v !== value);
      } else {
        return [...prevValues, value];
      }
    });
  };

  const defaultChipValues = [
    "7 Hari",
    "1 Bulan",
    "6 Bulan",
    "1 Tahun",
    "2 Tahun",
  ];

  let chips = ChangedPeriodeGadaiValues;

  const chipValues =
    ChangedPeriodeGadaiValues && ChangedPeriodeGadaiValues.length > 0
      ? chips
      : defaultChipValues;

  const checkBoxStatusvalues = ["Aktif", "Tebus", "Lelang", "Batal", "Jual"];

  const resetFields = () => {
    setValueSlider([0, 0]);
    setValueDisplaySlider([pemisahRibuan(0), pemisahRibuan(0)]);
    setValueDatePicker1(null);
    setValueDatePicker2(null);
    setCheckboxStatusValues([]);
    setPeriodeGadaiValues([]);
  };

  const handleApply = () => {
    const filters = {
      TglTransaksiAwal: valueDatePicker1,
      TglTransaksiAkhir: valueDatePicker2,
      NilaiGadaiAwal: valueSlider[0],
      NilaiGadaiAkhir: valueSlider[1],
      PeriodeGadai: periodeGadaiValues,
      Status: checkboxStatusValues,
    };

    const isEmpty = Object.values(filters).every(
      (val) => !val || val === 0 || val === "" || val.length === 0
    );

    onFilterSubmit(isEmpty ? {} : filters);
    setOpenDrawer(false);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ style: drawerStyle }}
        swipeAreaWidth={"38px"}
        disableSwipeToOpen={true}
      >
        <div className="w-full pt-[5px] pb-[12px] flex-col justify-center items-center gap-[10px] inline-flex">
          <div className="w-[38px] h-[2px] bg-green-600 rounded-md"></div>
        </div>
        <Stack className="px-4" direction="row" justifyContent="space-between">
          <IconButton
            onClick={() => setOpenDrawer(false)}
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
            Filter
          </div>
          <Button
            variant="text"
            className="text-success-Main font-semibold text-sm leading-[14px]"
            onClick={resetFields}
            sx={{ paddingRight: "0px", justifyContent: "flex-end" }}
          >
            Reset
          </Button>
        </Stack>
        <Stack
          direction="column"
          divider={
            <Divider variant="fullWidth" sx={{ marginY: "10px" }}></Divider>
          }
          sx={{ px: "16px", mb: "72px" }}
        >
          <TextboxDateSelectorTglTrans
            title={"Tanggal Transaksi"}
            setValueDatePicker1={setValueDatePicker1}
            valueDatePicker1={valueDatePicker1}
            valueDatePicker2={valueDatePicker2}
            setValueDatePicker2={setValueDatePicker2}
          ></TextboxDateSelectorTglTrans>

          <SliderWithTextboxNilaiGadai
            title={"Nilai Gadai"}
            valueDisplaySlider={valueDisplaySlider}
            handleChangeDisplaySlider={handleChangeDisplaySlider}
            valueSlider={valueSlider}
            handleChangeSlider={handleChangeSlider}
          />

          <ChipSelectPeriode
            chipValues={chipValues}
            handleChipClick={handleChipClick}
            periodeGadaiValues={periodeGadaiValues}
            title={"Periode Gadai"}
            setShowFullPageModal={setShowFullPageModal}
          />
          <CheckboxStatus
            title={"Status"}
            arrayCheckBox={checkBoxStatusvalues}
            checkBoxValues={checkboxStatusValues}
            checkBoxHandler={handleCheckboxChange}
          ></CheckboxStatus>
        </Stack>
      </SwipeableDrawer>
      {openDrawer && (
        <div className="fixed bottom-0 w-full flex justify-between px-4 py-2 mt-4 space-x-2.5 bg-white  shadow-customForFilter z-[2000]">
          <button
            className="bg-neutral-10 text-success-Main w-full px-3.5 py-2 rounded-xl shadow h-[52px] border border-success-Main text-lg font-bold"
            onClick={() => {
              resetFields();
              setOpenDrawer(false);
            }}
          >
            Batal
          </button>
          <button
            className="bg-success-Main text-white w-full  px-3.5   py-2 rounded-xl shadow h-[52px] text-lg font-bold"
            onClick={handleApply}
          >
            Terapkan
          </button>
        </div>
      )}
    </>
  );
};

export default BotDrawerFilter;
