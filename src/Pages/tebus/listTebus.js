import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppBarWithSearch from "../../components/appBarWithSearch";
import BotNavBarNFab from "../../components/botNavBarnFAB";
import ListItem from "../../components/listItem";
import { urlAPI } from "../../variableGlobal";
import axios from "axios";

const ListTebus = () => {
  const [arrayisi, setArrayisi] = useState(null);
  const [paramTambahan, setParamTambahan] = useState({});
  const [filteredArray, setFilteredArray] = useState(null);
  const lokasi = JSON.parse(localStorage.getItem("lokasi"));

  useEffect(() => {
    (async () => {
      getDataTebus();
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

  const navigate = useNavigate();

  const iconKiri = "heroicons-outline:adjustments";
  const iconKanan = "heroicons-outline:switch-vertical";
  const iconFab = "uil:qrcode-scan";

  const onFabClick = () => {
    navigate("/main/qrscanner", { state: { from: "tebus" } });
  };
  function handleBackButton() {
    navigate("/main", { replace: true });
  }

  const getDataTebus = async () => {
    try {
      const response = await axios.post(
        urlAPI + "tebus/search",
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
  function searchTebus(keyword) {
    var tempParam = paramTambahan;
    tempParam.search = keyword;
    setParamTambahan(tempParam);
    getDataTebus();
  }

  return (
    <>
      <div className="font-inter w-screen h-screen flex flex-col justify-start items-start">
        <div className="fixed top-0 z-50 w-full">
          <AppBarWithSearch
            placeholder={"Cari Data Tebus Gadai"}
            handlerBackButton={handleBackButton}
            onSearchChange={searchTebus}
            onClearSearch={() => {
              searchTebus();
            }}
          />
        </div>
        <div className="bg-white pt-[68px] w-full">
          <BotNavBarNFab
            iconKiri={iconKiri}
            iconKanan={iconKanan}
            iconFab={iconFab}
            onFabClick={onFabClick}
            onFilterChange={handleFilterChangeFAB}
            status={"Tebus"}
          />
          <div className="mx-4">
            {filteredArray ? (
              filteredArray.map((data, index) => (
                <div
                  className={`${
                    index === filteredArray.length - 1 ? "pb-24" : ""
                  }`}
                >
                  <ListItem data={data} usedIn="Tebus" />
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
};

export default ListTebus;
