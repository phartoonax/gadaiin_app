import { useNavigate } from "react-router-dom";
import { generateRandomDataGadai } from "../../functionGlobal";
import React, { useState } from "react";
import AppBarWithSearch from "../../components/appBarWithSearch";
import BotNavBarNFab from "../../components/botNavBarnFAB";
import ListItem from "../../components/listItem";

const arrayisi = generateRandomDataGadai("Tebus", 6);

const ListTebus = () => {
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

  const navigate = useNavigate();

  const iconKiri = "heroicons-outline:adjustments";
  const iconKanan = "heroicons-outline:switch-vertical";
  const iconFab = "uil:qrcode-scan";

  const onFabClick = () => {
    navigate("/main/qrscanner");
  };

  return (
    <>
      <div className="font-inter">
        <AppBarWithSearch placeholder={"Cari Data Tebus Gadai"} />

        <BotNavBarNFab
          iconKiri={iconKiri}
          iconKanan={iconKanan}
          iconFab={iconFab}
          onFabClick={onFabClick}
          onFilterChange={handleFilterChangeFAB}
          status={"Tebus"}
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
};

export default ListTebus;
