import React, { useEffect, useState } from "react";
import BotNavbarNfab from "../../components/botNavBarnFAB";
import AppBarWithSearch from "../../components/appBarWithSearch";
import ListItem from "../../components/listItem";
import { generateRandomDataGadai } from "../../functionGlobal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urlAPI } from "../../variableGlobal";

/**
 * @description Komponen untuk menampilkan daftar gadai. Komponen ini mengelola filter dan pengurutan data, serta navigasi ke halaman lain menggunakan Action Button (FAB).
 * @returns {*} Daftar gadai dengan fungsi filter dan pengurutan, serta Action Button (FAB) untuk navigasi
 * @author Henry
 * @date 27/11/2023 - 11:30:00 PM
 */
function ListGadai() {
  const [arrayisi, setArrayisi] = useState(null);
  const [filteredArray, setFilteredArray] = useState();
  const [paramTambahan, setParamTambahan] = useState({});
  const lokasi = JSON.parse(localStorage.getItem("lokasi"));
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      searchGadai();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const handleSortChangeFAB = (sortKeys) => {
    const isiSortKey = sortKeys.valueStatusSort;
    const sortedArray = [...filteredArray].sort((a, b) => {
      for (let key in isiSortKey) {
        if (key === "harga") {
          return sortKeys[key] === 1 ? a[key] - b[key] : b[key] - a[key];
        } else if (key === "idtransaksi") {
          const aId = parseInt(a[key].substring(3));
          const bId = parseInt(b[key].substring(3));
          return sortKeys[key] === 1 ? aId - bId : bId - aId;
        } else if (key === "tglkredit") {
          const aDate = new Date(a[key]);
          const bDate = new Date(b[key]);
          return sortKeys[key] === 1 ? aDate - bDate : bDate - aDate;
        }
      }
      return 0;
    });
    setFilteredArray(sortedArray);
  };

  const iconKiri = "heroicons-outline:adjustments";
  const iconKanan = "heroicons-outline:switch-vertical";
  const iconFab = "heroicons-outline:plus";
  function handleFabClick() {
    navigate("/form/gadai/pelanggan");
  }
  function handleBackButton() {
    navigate("/main", { replace: true });
  }

  const searchGadai = async () => {
    try {
      const response = await axios.post(
        urlAPI + "gadai/search",
        {
          uuidlokasi: lokasi.uuidLokasi,
          ...paramTambahan,
        },
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      const data = response.data.data;
      console.log(data);
      setArrayisi(data);
      setFilteredArray(data);
    } catch (error) {
      const errorMssg = error.response?.data?.message || error.message;
      console.error("Error:", errorMssg);
      return null;
    }
  };

  //? CARI CARA SUPAYA BISA SEARCH DAN FILTER BERSAMAAN
  function cariGadai(keyword) {
    var tempParam = paramTambahan;
    tempParam.search = keyword;
    setParamTambahan(tempParam);
    searchGadai(tempParam);
  }

  return (
    <>
      <div className="font-inter w-screen h-screen flex flex-col justify-start items-start">
        <div className="fixed top-0 z-50 w-full">
          <AppBarWithSearch
            placeholder={"Cari Data Gadai"}
            handlerBackButton={handleBackButton}
            onSearchChange={cariGadai}
            onClearSearch={() => {
              searchGadai(lokasi.uuidLokasi);
            }}
          />
        </div>
        <div className="bg-white pt-[58px] w-full">
          <BotNavbarNfab
            iconKiri={iconKiri}
            iconKanan={iconKanan}
            iconFab={iconFab}
            onFabClick={handleFabClick}
            onFilterChange={handleFilterChangeFAB}
            onSortChange={handleSortChangeFAB}
            status={null}
          />
          <div className="mx-4">
            {filteredArray ? (
              filteredArray.map((data, index) => (
                <div
                  className={`${
                    index === filteredArray.length - 1 ? "pb-24" : ""
                  }`}
                >
                  <ListItem data={data} usedIn="Gadai" />
                </div>
              ))
            ) : (
              <p>No items to display.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListGadai;
