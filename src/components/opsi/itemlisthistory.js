import { Icon } from "@iconify/react";
import { Card, CardContent, Chip, Stack } from "@mui/material";
import React from "react";
import {
  getIconColor,
  getDateColor,
  getCardGradientColor,
  getChipsBorderColor,
} from "../../Pages/functionGlobal";

const ItemListHistory = (data) => {
  const dats = data.data;
  const status = dats.status;

  const hitungBunga = (harga, bunga) => {
    const bunga1 = parseInt(bunga);
    const harga1 = parseInt(harga);
    const hitung = Math.round(harga1 * (bunga1 / 100));
    return hitung;
  };

  const pemisahRibuan = (harga) => {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
        m: "16px",

        boxShadow: "0px 4px 6px 0px #00000008",
        background: getCardGradientColor(status),
      }}
    >
      <CardContent
        sx={{
          pt: "12px",
          px: "16px",
          display: "block",

          "&:last-child": { paddingBottom: "16px" },
          height: "max-content",
        }}
      >
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              className="py-1 text-neutral-100 text-base leading-[18px] font-normal items-center"
              direction="row"
            >
              <Icon
                fontSize={"18px"}
                icon={"heroicons-solid:cash"}
                className={`${getIconColor(status)} } mr-1`}
              />
              <p className="font-normal text-base">
                {dats.bunga} | Rp
                {pemisahRibuan(hitungBunga(dats.harga, dats.bunga))}
              </p>
            </Stack>
            <Chip
              variant="outlined"
              className={`border h-[25px] px-3.5 ${getIconColor(
                status
              )} ${getChipsBorderColor(status)} ${getDateColor(status)}`}
              label={status}
            ></Chip>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              className="py-1 text-neutral-100 text-base leading-[18px] font-normal items-center"
              direction="row"
            >
              <Icon
                fontSize={"16px"}
                icon={"heroicons-outline:clock"}
                className={`${getIconColor(status)} } mr-1`}
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
