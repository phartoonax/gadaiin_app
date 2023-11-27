import React, { useState } from "react";
import BotNavbarNfab from "../../components/botnavbarnfab";
import AppBarWithSearch from "../../components/appbarwsearch";
import ListItem from "../../components/listitem";
import { generateRandomDataGadai } from "../../functionGlobal";

const arrayisi = generateRandomDataGadai(null, 6);

/**
 * @description Komponen untuk menampilkan daftar gadai. Komponen ini mengelola filter dan pengurutan data, serta navigasi ke halaman lain menggunakan Action Button (FAB).
 * @returns {*} Daftar gadai dengan fungsi filter dan pengurutan, serta Action Button (FAB) untuk navigasi
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
function ListGadai() {
  const [filteredArray, setFilteredArray] = useState(arrayisi);

  const handleFilterChangeFAB = (newArray) => {
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
          onFilterChange={handleFilterChangeFAB}
          status={null}
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
