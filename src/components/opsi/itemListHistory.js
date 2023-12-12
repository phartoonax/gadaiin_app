import { Icon } from "@iconify/react";
import { Card, CardContent, Chip, Divider, Stack } from "@mui/material";
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

  const needBunga = (status) => {
    if (
      status === "Aktif" ||
      status === "Gadai" ||
      status === "perpanjang" ||
      status === "Batal"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const isPeriode = (status) => {
    if (status === "Aktif" || status === "Gadai" || status === "perpanjang") {
      return true;
    } else {
      return false;
    }
  };

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
      className="font-inter"
    >
      <CardContent
        sx={{
          py: "10px",
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
            alignItems={"center"}
            className="py-[3px]"
          >
            <p className="font-bold text-base">{dats.idtransaksi}</p>
            <Chip
              variant="outlined"
              className={`border h-[18px] my-[3px] py-[10px] font-normal text-xs leading-[14px]  ${getTextIconColor(
                status
              )} ${getChipsBorderColor(status)} ${getDateColor(status)}`}
              label={status === "Aktif" ? "Gadai" : status}
            />
          </Stack>
          <Divider className="pt-1 border-[#EEEEEE]"></Divider>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              className="py-1.5 pt-3 text-neutral-100 text-base leading-[18px] font-normal items-center"
              direction="row"
            >
              <Icon
                fontSize={"18px"}
                icon={"heroicons-solid:cash"}
                className={`${getTextIconColor(status)} } mr-1`}
              />
              {needBunga(status) ? (
                <p className="font-normal text-base text-neutral-100">
                  {dats.bunga} | Rp
                  {pemisahRibuan(hitungBunga(dats.harga, dats.bunga))}
                </p>
              ) : (
                <p className="font-normal text-sm  text-neutral-100">
                  Rp
                  {pemisahRibuan(hitungBunga(dats.harga, dats.bunga))}
                </p>
              )}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={"2px"}
          >
            {isPeriode(status) ? (
              <Stack
                className="py-1.5 text-neutral-100 text-base leading-[18px] font-normal items-center"
                direction="row"
              >
                <Icon
                  fontSize={"16px"}
                  icon={"uil:clock"}
                  className={`${getTextIconColor(status)} } mr-1`}
                ></Icon>
                <p className="font-normal text-sm  text-neutral-100">
                  {dats.periodegadai} ({formatDate(dats.tglkredit)} -{" "}
                  {formatDate(dats.tgljatuhtempo)})
                </p>
              </Stack>
            ) : (
              <Stack
                className="py-1.5 text-neutral-100 text-base leading-[18px] font-normal items-center"
                direction="row"
              >
                <Icon
                  fontSize={"16px"}
                  icon={"uil:calendar-alt"}
                  className={`${getTextIconColor(status)} } mr-1`}
                ></Icon>
                <p className="font-normal text-sm  text-neutral-100">
                  {formatDate(dats.tglkredit)}
                </p>
              </Stack>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ItemListHistory;
