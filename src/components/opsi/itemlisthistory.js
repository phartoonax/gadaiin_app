import { Icon } from "@iconify/react";
import { Card, CardContent, Chip, Stack } from "@mui/material";
import React from "react";

const ItemListHistory = (data) => {
  const dats = data.data;
  const status = dats.status;
  const getCardBorderColor = () => {
    switch (status) {
      case "Aktif":
      case "Perpanjang":
        return "linear-gradient(88.36deg, rgba(30, 191, 101, 0.5) -5.28%, rgba(30, 191, 101, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
      case "Batal":
        return "linear-gradient(88.36deg, rgba(210, 28, 28, 0.5) -5.28%, rgba(210, 28, 28, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
      case "Tebus":
        return "linear-gradient(88.36deg, rgba(233, 131, 5, 0.5) -5.28%, rgba(233, 131, 5, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
      case "Lelang":
        return "linear-gradient(88.36deg, rgba(178, 103, 255, 0.5) -5.28%, rgba(178, 103, 255, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
      case "Jual":
        return "linear-gradient(88.36deg, rgba(0, 169, 209, 0.5) -5.28%, rgba(0, 169, 209, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF); ";
      default:
        return "border-none";
    }
  };

  const getIconColor = () => {
    switch (status) {
      case "Aktif":
      case "Perpanjang":
        return "text-success-Main";
      case "Batal":
        return "text-danger-Main";
      case "Tebus":
        return "text-warning-Main";
      case "Lelang":
        return "text-lelang-Main";
      case "Jual":
        return "text-primary-Main";
      default:
        return "text-neutral-500";
    }
  };

  const getDateColor = () => {
    switch (status) {
      case "Aktif":
      case "Perpanjang":
        return "bg-success-Surface";
      case "Batal":
        return "bg-danger-Surface";
      case "Tebus":
        return "bg-warning-Surface";
      case "Lelang":
        return "bg-lelang-Surface";
      case "Jual":
        return "bg-primary-Surface";
      default:
        return "bg-neutral-100";
    }
  };

  const getChipsBorderColor = () => {
    switch (status) {
      case "Aktif":
      case "Perpanjang":
        return "border-success-Main";
      case "Batal":
        return "border-danger-Main";
      case "Tebus":
        return "border-warning-Main";
      case "Lelang":
        return "border-lelang-Main";
      case "Jual":
        return "border-primary-Main";
      default:
        return "border-neutral-100";
    }
  };

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
        background: getCardBorderColor(),
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
                className={`${getIconColor()} } mr-1`}
              />
              <p className="font-normal text-base">
                {dats.bunga} | Rp
                {pemisahRibuan(hitungBunga(dats.harga, dats.bunga))}
              </p>
            </Stack>
            <Chip
              variant="outlined"
              className={`border h-[25px] px-3.5 ${getIconColor()} ${getChipsBorderColor()} ${getDateColor()}`}
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
                className={`${getIconColor()} } mr-1`}
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
