import { Button, Chip, Grid, Stack } from "@mui/material";
import React from "react";

/**
 * @description Komponen untuk menampilkan chip berdasarkan periode yang dipilih.
 * @param {string} title Judul grup chip
 * @param {array} chipValues Array item chip
 * @param {array} periodeGadaiValues Array nilai chip yang dipilih saat ini
 * @param {function} handleChipClick Fungsi handler untuk perubahan chip
 * @param {function} setShowFullPageModal Fungsi untuk mengatur tampilan modal
 * @returns {*} Sebuah grup chip dengan judul dan nilai yang ditentukan
 * @author Henry
 * @date 30/11/2023 - 9:30:37 AM
 */
const ChipSelectPeriode = ({
  title,
  chipValues,
  periodeGadaiValues,
  handleChipClick,
  setShowFullPageModal,
}) => {
  return (
    <>
      <Stack gap={"10px"}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" gap={"6px"} alignItems={"center"}>
            <div className="text-sm text-black font-bold">{title}</div>
            <div className="rounded-full bg-themeColor px-2  text-neutral-10">
              {periodeGadaiValues.length}
            </div>
          </Stack>
          <Button
            variant="text"
            className="text-success-Main font-bold text-sm leading-[14px] capitalize"
            onClick={() => setShowFullPageModal(true)}
            sx={{ paddingRight: "0px", justifyContent: "flex-end" }}
          >
            Tambah
          </Button>
        </Stack>
        <Grid container direction="row" wrap="wrap" spacing={1}>
          {chipValues.slice(0, 5).map((value) => (
            <Grid item key={value}>
              <Chip
                label={value}
                variant={
                  periodeGadaiValues.includes(value) ? "solid" : "outlined"
                }
                color={"success"}
                className={`font-normal  border-themeColor text-sm px-0.5 py-[7px] focus:bg-themeColor ${
                  periodeGadaiValues.includes(value)
                    ? "text-neutral-10"
                    : "text-themeColor"
                }`}
                onClick={() => handleChipClick(value)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default ChipSelectPeriode;
