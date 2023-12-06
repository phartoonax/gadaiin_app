import { Icon } from "@iconify/react";
import { Card, CardContent, Chip, Stack } from "@mui/material";
import React from "react";
import {
  getTextIconColor,
  getDateColor,
  getCardGradientColor,
  getChipsBorderColor,
  pemisahRibuan,
  hitungBunga,
} from "../../functionGlobal";

/**
 * @description Komponen untuk menampilkan item dalam List History dengan singkat seperti status, bunga, periode gadai, dan tanggal.
 * @param {object} data Objek yang berisi data item
 * @returns {*} Item dalam List History dengan singkat seperti status, bunga, periode gadai, dan tanggal
 * @author Henry
 * @date 27/11/2023 - 11:00:00 PM
 */
const ItemListHistory = (data) => {
  const dats = data.data;
  const status = dats.status;

  const formatDate = (dateString) => {
    // Convert the date string to an array of day, month, and year
    const [day, month, year] = dateString.split("/");

    // Create a new Date object
    const date = new Date(`${year}-${month}-${day}`);

    // Format the date
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card
      sx={{
        mt: "16px",
        borderRadius: "6px",
        borderWidth: "1px",
        borderColor: "neutral.30",
        boxShadow: "0px 4px 6px 0px #00000008",
        background: getCardGradientColor(status),
      }}
    >
      <CardContent
        sx={{
          py: "4px",
          px: "16px",
          display: "block",

          "&:last-child": { paddingBottom: "4px" },
          height: "max-content",
        }}
      >
        <Stack direction="column" spacing={0}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              className="py-1.5 text-neutral-100 text-base leading-[18px] font-normal items-center"
              direction="row"
            >
              <Icon
                fontSize={"18px"}
                icon={"heroicons-solid:cash"}
                className={`${getTextIconColor(status)} } mr-1`}
              />
              <p className="font-normal text-base">
                {dats.bunga} | Rp
                {pemisahRibuan(hitungBunga(dats.harga, dats.bunga))}
              </p>
            </Stack>
            <Chip
              variant="outlined"
              className={`border h-[18px] font-normal text-xs leading-[14px] px-1 ${getTextIconColor(
                status
              )} ${getChipsBorderColor(status)} ${getDateColor(status)}`}
              label={status === "Aktif" ? "Gadai" : status}
            ></Chip>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              className="py-1.5 text-neutral-100 text-base leading-[18px] font-normal items-center"
              direction="row"
            >
              <Icon
                fontSize={"16px"}
                icon={"heroicons-outline:clock"}
                className={`${getTextIconColor(status)} } mr-1`}
              ></Icon>
              <p className="font-normal text-base">
                {dats.periodegadai} ({formatDate(dats.tglkredit)} -{" "}
                {formatDate(dats.tgljatuhtempo)})
              </p>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ItemListHistory;
