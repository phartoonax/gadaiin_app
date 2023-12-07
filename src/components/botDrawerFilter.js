import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { Icon } from "@iconify/react";
import CheckboxStatus from "./filters/checkBoxStatus";
import ChipSelectPeriode from "./filters/chipSelectPeriode";
import SliderWithTextboxNilaiGadai from "./filters/sliderWithTextBoxNilaiGadai";
import TextboxDateSelectorTglTrans from "./filters/textBoxDateSelectorTglTrans";
import { pemisahRibuan } from "../functionGlobal";
import { drawerStyle } from "../variableGlobal";

/**
 * @description Komponen untuk menampilkan Drawer bawah yang berisi filter seperti tanggal transaksi, nilai gadai, periode gadai, dan status.
 * @param {boolean} openDrawer Status tampilan Drawer
 * @param {function} setOpenDrawer Fungsi untuk mengubah status tampilan Drawer
 * @param {function} onFilterSubmit Fungsi yang dipanggil saat filter diterapkan
 * @param {function} setShowFullPageModal Fungsi untuk mengubah tampilan modal halaman penuh
 * @param {array} ChangedPeriodeGadaiValues Array berisi nilai periode gadai yang telah diubah
 * @param {string} status Status dari halaman yang memanggil komponen ini, untuk menentukan nilai checkbox yang ditampilkans
 * @returns {*} Drawer bawah yang berisi filter
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
const BotDrawerFilter = ({
  openDrawer,
  setOpenDrawer,
  onFilterSubmit,
  setShowFullPageModal,
  ChangedPeriodeGadaiValues,
  status,
}) => {
  const [periodeGadaiValues, setPeriodeGadaiValues] = useState([]);

  useEffect(() => {
    if (ChangedPeriodeGadaiValues && ChangedPeriodeGadaiValues.length > 0) {
      setPeriodeGadaiValues(ChangedPeriodeGadaiValues);
    }
  }, [ChangedPeriodeGadaiValues]);

  const [checkboxStatusValues, setCheckboxStatusValues] = useState([]);

  const [valueMinMaxSlider, setValueMinMaxSlider] = useState([0, 5000000]);

  const [valueDatePicker1, setValueDatePicker1] = useState(null);

  const [valueDatePicker2, setValueDatePicker2] = useState(null);

  const [valueSlider, setValueSlider] = useState([0, 5000000]);

  /**
   * @description Fungsi untuk menangani perubahan nilai slider.
   * @param {event} event Event yang memicu fungsi ini
   * @param {number} newValue Nilai baru dari slider
   */
  const handleChangeSlider = (event, newValue) => {
    const formattedValue = newValue.map((value) => pemisahRibuan(value));
    setValueSlider(newValue);
    setValueDisplaySlider(formattedValue);
  };

  const [valueDisplaySlider, setValueDisplaySlider] = useState([
    pemisahRibuan(valueMinMaxSlider[0]),
    pemisahRibuan(valueMinMaxSlider[1]),
  ]);

  /**
   * @description Fungsi untuk menangani perubahan nilai display slider.
   * @param {number} index Indeks nilai yang berubah
   * @param {number} newValue Nilai baru dari display slider
   */
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

  /**
   * @description Fungsi untuk menangani perubahan status checkbox.
   * @param {event} event Event yang memicu fungsi ini
   */
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

  /**
   * @description Fungsi untuk menangani klik pada chip.
   * @param {string} value Nilai dari chip yang diklik
   */
  const handleChipClick = React.useCallback((value) => {
    setPeriodeGadaiValues((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((v) => v !== value);
      } else {
        return [...prevValues, value];
      }
    });
  }, []);

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

  const filteredValues = ["Aktif", "Tebus", "Lelang", "Batal", "Jual"];
  let checkBoxStatusvalues;

  switch (status) {
    case "Tebus":
      checkBoxStatusvalues = filteredValues.filter(
        (value) => value === "Tebus" || value === "Batal"
      );
      break;
    case "Perpanjangan":
      checkBoxStatusvalues = filteredValues.filter(
        (value) => value === "Aktif" || value === "Batal"
      );
      break;
    default:
      checkBoxStatusvalues = filteredValues;
      break;
  }

  /**
   * @description Fungsi untuk mereset semua field.
   */
  const resetFields = () => {
    setValueSlider([valueMinMaxSlider[0], valueMinMaxSlider[1]]);
    setValueDisplaySlider([
      pemisahRibuan(valueMinMaxSlider[0]),
      pemisahRibuan(valueMinMaxSlider[1]),
    ]);
    setValueDatePicker1(null);
    setValueDatePicker2(null);
    setCheckboxStatusValues([]);
    setPeriodeGadaiValues([]);
  };

  /**
   * @description Fungsi untuk menangani penerapan filter.
   */
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
      (val) =>
        !val ||
        val === 0 ||
        val === "" ||
        val.length === 0 ||
        val === valueMinMaxSlider[1]
    );

    onFilterSubmit(isEmpty ? {} : filters);
    setOpenDrawer(false);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          resetFields();
        }}
        PaperProps={{ style: drawerStyle }}
        swipeAreaWidth={"38px"}
        disableSwipeToOpen={true}
      >
        <div
          className="bg-neutral-10"
          style={{ position: "sticky", top: -1, zIndex: 9999 }}
        >
          <div className="w-full pt-[5px] pb-[12px] flex-col justify-center items-center gap-[10px] inline-flex">
            <div className="w-[38px] h-[2px] bg-green-600 rounded-md"></div>
          </div>
          <Stack
            className="px-4"
            direction="row"
            justifyContent="space-between"
          >
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
              className="text-success-Main font-semibold text-xs leading-[14px]"
              onClick={resetFields}
              sx={{ paddingRight: "0px", justifyContent: "flex-end" }}
            >
              Reset
            </Button>
          </Stack>
        </div>
        <Stack
          direction="column"
          divider={<Divider variant="fullWidth" sx={{ marginY: "10px" }} />}
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
