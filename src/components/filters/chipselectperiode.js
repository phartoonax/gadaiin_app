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
 * @date 27/11/2023 - 9:49:37 AM
 */
const ChipSelectPeriode = ({
  title,
  chipValues,
  periodeGadaiValues: chipSelectedValues,
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
          {" "}
          <Stack direction="row" gap={"6px"}>
            <div className="text-sm text-[15px] font-bold">{title}</div>
            <div className="rounded-full bg-themeColor px-2  text-neutral-10">
              {chipSelectedValues.length}
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
          {chipValues.map((value) => (
            <Grid item key={value}>
              <Chip
                label={value}
                variant={
                  chipSelectedValues.includes(value) ? "solid" : "outlined"
                }
                color={"success"}
                className="font-normal text-sm px-0.5 py-[7px]"
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
