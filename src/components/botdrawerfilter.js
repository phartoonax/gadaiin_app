import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  SwipeableDrawer,
  alpha,
} from "@mui/material";

import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Icon } from "@iconify/react";

const BotDrawerFilter = ({
  open: openDrawer,
  setOpen: setOpenDrawer,
  onArrayChange,
}) => {
  const drawerStyle = {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    position: "fixed",
    bottom: 0,
    zIndex: 999,
    boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
  };

  const [periodeGadaiValues, setPeriodeGadaiValues] = useState([]);
  const [checkboxStatusValues, setCheckboxStatusValues] = useState([]);

  const [openDatePicker1, setOpenDatePicker1] = useState(false);
  const [valueDatePicker1, setValueDatePicker1] = useState(null);

  const [openDatePicker2, setOpenDatePicker2] = useState(false);
  const [valueDatePicker2, setValueDatePicker2] = useState(null);

  const [valueSlider, setValueSlider] = useState([100000, 1000000]);

  const handleOpenDatePicker1 = () => {
    setOpenDatePicker1(true);
  };
  const handleOpenDatePicker2 = () => {
    setOpenDatePicker2(true);
  };

  const pemisahRibuan = (harga) => {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChangeSlider = (event, newValue) => {
    const formattedValue = newValue.map((value) => pemisahRibuan(value));
    setValueSlider(newValue);
    setValueDisplaySlider(formattedValue);
  };

  const [valueDisplaySlider, setValueDisplaySlider] = useState([
    pemisahRibuan(100000),
    pemisahRibuan(1000000),
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
    onArrayChange(newArray);
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

  const chipValues = ["1 Bulan", "1 Tahun", "2 Tahun", "7 Hari", "6 Bulan"];

  const resetFields = () => {
    setValueSlider([0, 0]);
    setValueDisplaySlider([pemisahRibuan(0), pemisahRibuan(0)]);
    setValueDatePicker1(null);
    setValueDatePicker2(null);
    setCheckboxStatusValues([]);
    setPeriodeGadaiValues([]);
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
          <Stack gap={"10px"}>
            <div className="text-sm text-[15px] font-bold">
              {"Tanggal Transaksi"}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                {" "}
                <MobileDatePicker
                  open={openDatePicker1}
                  value={valueDatePicker1}
                  onChange={(newValue) => {
                    setValueDatePicker1(newValue);
                  }}
                  onClose={() => setOpenDatePicker1(false)}
                  format="DD MMM YYYY"
                  slotProps={{
                    textField: {
                      size: "medium",
                      InputProps: {
                        placeholder: "Awal",
                        sx: {
                          paddingLeft: "0px",
                          borderRadius: "8px",
                          border: "1px solid",
                          borderColor: valueDatePicker1
                            ? "neutral.100"
                            : "neutral.40",
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton onClick={handleOpenDatePicker1}>
                              <Icon
                                icon={"uil:calendar-alt"}
                                className="text-[#50555B]"
                                style={{ fontSize: "24px" }}
                              ></Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
                <div className="px-1.5 font-bold text-xs tracking-wider flex items-center justify-center">
                  {"S/D"}
                </div>
                <MobileDatePicker
                  open={openDatePicker2}
                  value={valueDatePicker2}
                  onChange={(newValue) => {
                    setValueDatePicker2(newValue);
                  }}
                  onClose={() => setOpenDatePicker2(false)}
                  format="DD MMM YYYY"
                  slotProps={{
                    textField: {
                      size: "medium",
                      InputProps: {
                        placeholder: "Akhir",
                        sx: {
                          paddingLeft: "0px",
                          borderRadius: "8px",
                          border: "1px solid",
                          borderColor: valueDatePicker2
                            ? "neutral.100"
                            : "neutral.40",
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton onClick={handleOpenDatePicker2}>
                              <Icon
                                icon={"uil:calendar-alt"}
                                className="text-[#50555B]"
                                style={{ fontSize: "24px" }}
                              ></Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Stack>

          <Stack gap={"10px"}>
            <div className="text-sm text-[15px] font-bold">{"Nilai Gadai"}</div>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              className="flex"
            >
              <div className="flex-1 flex  rounded-lg border border-neutral-100 w-full ">
                <input
                  type="text"
                  value={valueDisplaySlider[0]}
                  onChange={(event) =>
                    handleChangeDisplaySlider(0, event.target.value)
                  }
                  className="w-full mx-2.5 my-[15px] focus:outline-none"
                  onkeydown={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
              <Divider
                variant="fullWidth"
                color="neutral.100"
                className="flex-1 w-full max-w-[32px] flex"
              ></Divider>
              <div className="flex-1 flex  rounded-lg border border-neutral-100 w-full">
                <input
                  type="text"
                  value={valueDisplaySlider[1]}
                  onChange={(event) =>
                    handleChangeDisplaySlider(1, event.target.value)
                  }
                  className="w-full text-right mx-2.5 my-[15px] focus:border-none focus:outline-none"
                  onkeydown={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </div>
            </Stack>
            <Slider
              value={valueSlider}
              onChange={handleChangeSlider}
              disableSwap
              max={5000000}
              min={0}
              sx={{
                color: "#AAAAAA",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #BDBDBD",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "success.main",
                },
                "& .MuiSlider-rail": {
                  opacity: 0.5,
                  backgroundColor: "#AAAAAA",
                },
                "& .MuiSlider-valueLabel": {
                  color: "black",
                  "& *": {
                    background: "transparent",
                    color: "inherit",
                  },
                },
                "&:hover, &.Mui-focusVisible": {
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#FFFFFF",
                    boxShadow: `0px 0px 0px 8px ${alpha("#AAAAAA", 0.16)}`,
                  },
                },
              }}
            ></Slider>
          </Stack>
          <Stack gap={"10px"}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {" "}
              <Stack direction="row" gap={"6px"}>
                <div className="text-sm text-[15px] font-bold">
                  {"Periode Gadai"}
                </div>
                <div className="rounded-full bg-themeColor px-2  text-neutral-10">
                  {periodeGadaiValues.length}
                </div>
              </Stack>
              <Button
                variant="text"
                className="text-success-Main font-bold text-sm leading-[14px] capitalize"
                onClick={null}
                sx={{ paddingRight: "0px", justifyContent: "flex-end" }}
              >
                Tambah
              </Button>
            </Stack>
            <Grid container direction="row" wrap="wrap" spacing={1}>
              {chipValues.map((value) => (
                <Grid item key={value}>
                  <Chip
                    label={value}
                    variant={
                      periodeGadaiValues.includes(value) ? "solid" : "outlined"
                    }
                    color={"success"}
                    className="font-normal text-sm px-0.5 py-[7px]"
                    onClick={() => handleChipClick(value)}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack gap={"10px"}>
            <div className="text-sm text-[15px] font-bold">{"Status"}</div>
            <FormGroup>
              {["Aktif", "Tebus", "Lelang", "batal"].map((name) => (
                <FormControlLabel
                  key={name}
                  label={name}
                  labelPlacement="start"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "0px",
                  }}
                  control={
                    <Checkbox
                      name={name}
                      checked={checkboxStatusValues.includes(name)}
                      onChange={handleCheckboxChange}
                      sx={{
                        "&.Mui-checked": {
                          color: "transparent",
                        },
                        "&.MuiCheckbox-root": {
                          color: "green",
                        },
                      }}
                    />
                  }

                  // other props
                />
              ))}
            </FormGroup>
          </Stack>
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
          <button className="bg-success-Main text-white w-full  px-3.5   py-2 rounded-xl shadow h-[52px] text-lg font-bold">
            Terapkan
          </button>
        </div>
      )}
    </>
  );
};

export default BotDrawerFilter;
