import React, { useState } from "react";
import BotNavbarNfab from "../../components/botnavbarnfab";
import AppBarWithSearch from "../../components/appbarwsearch";
import ListItem from "../../components/listitem";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomIntRounded(min, max) {
  min = Math.ceil(min / 100000);
  max = Math.floor(max / 100000);
  return Math.floor(Math.random() * (max - min + 1) + min) * 100000;
}
function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

function generateRandomObject() {
  const statuses = ["Aktif", "Batal", "Tebus", "Lelang", "Jual"];
  const periodes = ["7 Hari", "1 Bulan", "6 Bulan", "1 Tahun", "2 Tahun"];
  const tglkredit = new Date(2023, 6, 24); // 24/07/2023
  const periodegadai = periodes[getRandomInt(0, periodes.length - 1)];
  let periodeInDays;

  if (periodegadai.includes("Hari")) {
    periodeInDays = parseInt(periodegadai.split(" ")[0]);
  } else if (periodegadai.includes("Bulan")) {
    periodeInDays = parseInt(periodegadai.split(" ")[0]) * 30;
  } else if (periodegadai.includes("Tahun")) {
    periodeInDays = parseInt(periodegadai.split(" ")[0]) * 365;
  }

  const tgljatuhtempo = addDays(new Date(tglkredit), periodeInDays);

  return {
    idtransaksi: "CGX" + getRandomInt(100000, 999999),
    lokasi: "KDC",
    nama: "Mas Bagas Purnomo Ajeng Kartini Salendra Muh",
    notelp: 6283856236436,
    status: statuses[getRandomInt(0, statuses.length - 1)],
    barang: "Sepeda Motor Honda Astrea 800",
    harga: getRandomIntRounded(1000000, 5000000),
    bunga: getRandomInt(5, 35) + "%",
    periodegadai: periodegadai,
    tglkredit: formatDate(tglkredit),
    tgljatuhtempo: formatDate(tgljatuhtempo),
  };
}
const arrayisi = Array.from({ length: 6 }, generateRandomObject);

function ListGadai() {
  const [filteredArray, setFilteredArray] = useState(arrayisi);

  const handleFilterChange = (newArray) => {
    const filtered = arrayisi.filter((item) => {
      let includeItem = true;
      Object.entries(newArray).forEach(([key, value]) => {
        if (value === null || value.length === 0 || value === 0) {
          return; // Ignore null or empty filters
        }

        let testStatus = true;
        let testPeriodeGadai = true;

        if (key === "Status" && Array.isArray(value)) {
          testStatus = value.includes(item["status"]);
        }
        if (key === "PeriodeGadai" && Array.isArray(value)) {
          testPeriodeGadai = value.includes(item["periodegadai"]);
        }

        if (key === "TglTransaksiAwal" && value) {
          const [dayKredit, monthKredit, yearKredit] =
            item.tglkredit.split("/");
          const [dayJatuhTempo, monthJatuhTempo, yearJatuhTempo] =
            item.tgljatuhtempo.split("/");
          if (
            !(
              Date.parse(`${monthKredit}/${dayKredit}/${yearKredit}`) >=
                Date.parse(value) ||
              Date.parse(
                `${monthJatuhTempo}/${dayJatuhTempo}/${yearJatuhTempo}`
              ) >= Date.parse(value)
            )
          ) {
            return (includeItem = false);
          }
        }
        if (key === "TglTransaksiAkhir" && value) {
          const [dayKredit, monthKredit, yearKredit] =
            item.tglkredit.split("/");
          const [dayJatuhTempo, monthJatuhTempo, yearJatuhTempo] =
            item.tgljatuhtempo.split("/");
          if (
            !(
              Date.parse(`${monthKredit}/${dayKredit}/${yearKredit}`) <=
                Date.parse(value) ||
              Date.parse(
                `${monthJatuhTempo}/${dayJatuhTempo}/${yearJatuhTempo}`
              ) <= Date.parse(value)
            )
          ) {
            return (includeItem = false);
          }
        }
        if (key === "NilaiGadaiAwal" && item.harga < value) {
          return (includeItem = false); // If the key is 'NilaiGadaiAwal', and the item's 'harga' is less than the filter value, exclude the item
        }
        if (key === "NilaiGadaiAkhir" && item.harga > value) {
          return (includeItem = false); // If the key is 'NilaiGadaiAkhir', and the item's 'harga' is greater than the filter value, exclude the item
        }
        includeItem = includeItem && testStatus && testPeriodeGadai;
      });
      return includeItem;
    });
    setFilteredArray(filtered);
  };

  const iconKiri = "heroicons-outline:adjustments";
  const iconKanan = "heroicons-outline:switch-vertical";
  const iconFab = "heroicons-outline:plus";

  return (
    <>
      <div className="font-inter">
        <AppBarWithSearch placeholder={"Cari Data Gadai"} />

        <BotNavbarNfab
          iconKiri={iconKiri}
          iconKanan={iconKanan}
          iconFab={iconFab}
          onFabClick={null}
          onFilterChange={handleFilterChange}
        />
        <div className="mx-4">
          {filteredArray.map((data, index) => (
            <div
              className={`${index === filteredArray.length - 1 ? "pb-24" : ""}`}
            >
              <ListItem data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListGadai;
