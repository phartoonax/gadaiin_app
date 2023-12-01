import { Button, Chip, Grid, Stack } from "@mui/material";
import React from "react";

/**
 * @description Komponen ini digunakan untuk menampilkan sekelompok chip berdasarkan Kelengkapan yang dipilih.
 * @param {string} title Judul grup chip
 * @param {array} chipValues Array berisi nilai-nilai chip
 * @param {array} SelectedChipValues Array berisi nilai-nilai chip yang saat ini dipilih
 * @param {function} handleChipClick Fungsi yang menangani klik pada chip
 * @param {function} setShowFullPageModal Fungsi yang mengatur tampilan modal
 * @param {boolean} isRequired Menentukan apakah input pada form wajib diisi atau tidak
 * @param {boolean} enabled Menentukan apakah isi dari kelengkapan dapat diubah atau tidak
 * @returns {*} Mengembalikan grup chip dengan judul dan nilai yang ditentukan
 * @author Henry
 * @date 30/11/2023 - 9:30:37 AM
 */
const ChipKelengkapanForm = ({
  title,
  chipValues,
  SelectedChipValues,
  handleChipClick,
  setShowFullPageModal,
  isRequired,
  enabled,
}) => {
  const isEnabled =
    typeof enabled !== "undefined" && enabled !== null ? enabled : true;
  return (
    <>
      <Stack gap={"10px"}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" gap={"6px"}>
            <Stack direction="row" gap={"2px"}>
              <span className="text-neutral-100 text-base font-bold">
                {title}
              </span>
              {isRequired && (
                <span className="text-danger-Main text-lg font-bold">*</span>
              )}
            </Stack>
            <div className="rounded-full bg-themeColor text-[17px] text-neutral-10 h-[25px] w-[25px] flex items-center justify-center">
              {SelectedChipValues.length}
            </div>
          </Stack>
          <Button
            variant="text"
            className="text-success-Main font-bold text-sm leading-[14px] capitalize"
            onClick={() => setShowFullPageModal(true)}
            sx={{ paddingRight: "0px", justifyContent: "flex-end" }}
          >
            {isEnabled ? "Tambah " : "Selengkapnya"}
          </Button>
        </Stack>
        <Grid container direction="row" wrap="wrap" spacing={1}>
          {chipValues.slice(0, 5).map((value) => (
            <Grid item key={value}>
              <Chip
                label={value}
                variant={
                  SelectedChipValues.includes(value) ? "solid" : "outlined"
                }
                color={"success"}
                className="font-normal text-sm px-0.5 py-[7px] max-w-[150px] overflow-ellipsis"
                onClick={() =>
                  handleChipClick ? handleChipClick(value) : null
                }
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default ChipKelengkapanForm;
