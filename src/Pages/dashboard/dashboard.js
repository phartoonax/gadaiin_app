import "../../assets/css/custom.css";
import iconFAB from "../../assets/images/balance-scale.png";
import DefaultPerson from "../../assets/images/DefaultPerson.png";
import { UilQrcodeScan } from "@iconscout/react-unicons";
import { HomeIcon } from "@heroicons/react/20/solid";

import { Button, Divider, Fab, IconButton, Stack } from "@mui/material";
import Rangkuman from "./rangkuman";
import Grafik from "./grafik";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urlAPI } from "../../variableGlobal";
import { getImageFromAPI, pemisahRibuan } from "../../functionGlobal";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const lokasi = JSON.parse(localStorage.getItem("lokasi"));

  const [activeTab, setActiveTab] = useState("Rangkuman");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [shouldRender, setShouldRender] = useState(false);
  const [shouldRenderBackground, setShouldRenderBackground] = useState(false);

  const [dataUserDashboard, setDataUserDashboard] = useState(null);
  const [savedImage, setSavedImage] = useState(null);

  const [dataTransaksiTerakhir, setDataTransaksiTerakhir] = useState(null);
  const [dataRangkuman, setDataRangkuman] = useState(null);

  useEffect(() => {
    //GET DATA USER-DASHBOARD
    const fetchData = async () => {
      try {
        const response = await axios.get(urlAPI + "get-profile-dashboard", {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        });
        const data = response.data.data.datauser;
        setDataUserDashboard(data);
      } catch (error) {
        const errorMssg = error.response?.data?.message || error.message;
        console.error("Error:", errorMssg);
      }
    };

    fetchData();

    //GET DATA TRANSAKSI TERAKHIR
    (async () => {
      try {
        const response = await axios.post(
          urlAPI + "get-transaksi-terakhir",
          {
            uuidlokasi: lokasi.uuidLokasi,
          },
          {
            headers: {
              access_token: localStorage.getItem("accessToken"),
            },
          }
        );
        const getLogo = (status) => {
          switch (status) {
            case "Aktif":
            case "PERPANJANG":
              return "uil:hourglass";
            case "TEBUS":
              return "uil:money-withdraw";

            default:
              return "uil:balance-scale";
          }
        };
        const getDatenTime = (date, time) => {
          const dateSplit = date.split("-");
          const timeSplit = time.split(":");
          const year = dateSplit[0];
          const month = dateSplit[1] - 1;
          const day = dateSplit[2];
          const hour = timeSplit[0];
          const minute = timeSplit[1];
          const dateObj = new Date(year, month, day, hour, minute);

          const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          };
          let str = dateObj.toLocaleString("id-ID", options);
          str = str.replace(",", "");

          return str;
        };
        const data = response.data.data;
        let arrayData = data.map((item) => ({
          uuidtransaksi: item.uuidtrans,
          jenis: item.jenis,
          id: item.kodetrans,
          name: item.namacustomer,
          value: "Rp " + pemisahRibuan(item.harga),
          transaksi: getDatenTime(item.tgltrans, item.jam),
          logo: getLogo(item.jenis),
        }));

        setDataTransaksiTerakhir(arrayData);
      } catch (error) {
        const errorMssg = error.response?.data?.message || error.message;
        console.error("Error:", errorMssg);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setShouldRender(true);
      setShouldRenderBackground(true);
    } else {
      setTimeout(() => {
        setShouldRender(false);
      }, 300); // match this with the duration of your animation
      setTimeout(() => {
        setShouldRenderBackground(false);
      }, 300);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    (async () => {
      try {
        //GET SET DATA USER-PROFILE
        const response = await axios.get(urlAPI + "profile/get", {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        });
        const data = response.data.data;
        //GET SET DATA USER-PROFILE-IMAGE
        let getImage = null;
        if (data.gambar !== undefined) {
          getImage = await getImageFromAPI(data.gambar);
        }
        setSavedImage(getImage);
        const dataProfile = {
          uuiduser: data.uuiduser,
          name: data.username,
          email: data.email,
          emailperusahaan: data.emailperusahaan,
          phone: data.hp,
          password: "",
          picture: getImage ?? "",
        };
        localStorage.setItem("dataProfile", JSON.stringify(dataProfile));

        //GET SET DATA RANGKUMAN GADAI
        const dataRangkuman = await axios.post(
          urlAPI + "get-rangkuman-gadai",
          {
            uuidlokasi: lokasi.uuidLokasi,
          },
          {
            headers: {
              access_token: localStorage.getItem("accessToken"),
            },
          }
        );
        const dataTransaksi = dataRangkuman.data.data;
        setDataRangkuman(dataTransaksi);
        //GET SET DATA GRAFIK
      } catch (error) {
        console.error("Error:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderdat = dataTransaksiTerakhir ? (
    dataTransaksiTerakhir.map((data) => (
      <div
        className="w-full px-2.5 flex flex-col justify-start items-start font-inter overflow-ellipsis"
        onClick={() => {
          const tujuan =
            data.jenis === "TEBUS"
              ? "/tebus"
              : data.jenis === "PERPANJANG"
              ? "/perpanjang"
              : "/gadai";
          navigate("/detail" + tujuan + "/pelanggan", {
            state: { uuidDetail: data.uuidtransaksi },
          });
        }}
      >
        <div className="w-full py-1 flex items-center justify-between gap-2">
          <div className="relative flex-shrink-0">
            <Icon
              className="text-success-Main"
              icon={data.logo}
              style={{ fontSize: "14px" }}
            />
          </div>
          <div
            //  className="flex flex-col items-start gap-0.5 flex-auto flex-shrink "
            className="flex flex-col items-start gap-0.5 flex-auto overflow-hidden"
          >
            <div className="text-xxs tracking-wide font-normal">{data.id}</div>
            <div className="text-xs leading-[14px] tracking-wide font-semibold max-h-5 truncate max-w-full">
              {data.name}
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5 flex-1 min-w-[96px] flex-shrink-0">
            <div className="text-xxs tracking-wide font-normal">
              {data.transaksi}
            </div>
            <div className="text-xs leading-[14px]  tracking-wide font-normal">
              {data.value}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Divider variant="fullWidth"></Divider>
        </div>
      </div>
    ))
  ) : (
    <div>Loading...</div>
  );

  const changeMenuState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <>
      <div className="flex relative justify-center items-center h-screen w-full bg-[#01806D]  font-inter">
        <div className="ring-8 ring-transparent bg-gradient-to-b from-[#4CAF50] to-transparent rounded-full w-[345px] h-[345px] absolute flex items-center justify-center z-[1] -top-24 -left-24">
          <div className="ring-8 ring-[#01806D] bg-[#01806D] rounded-full w-[221px] h-[221px] z-[2]"></div>
        </div>
        <div className="z-[3] w-full">
          <div className="absolute top-0 left-0 p-4 mt-6 flex items-center">
            <div
              className=" rounded-full overflow-hidden"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              {savedImage !== null ? (
                <img
                  alt=""
                  src={savedImage ?? DefaultPerson}
                  className={`h-[50px] w-[50px] rounded-full`}
                  onClick={() => {
                    navigate("/profile");
                    localStorage.setItem(
                      "savedImage-ProfileFromCamera",
                      JSON.stringify(savedImage)
                    );
                  }}
                />
              ) : (
                <img
                  src={DefaultPerson}
                  alt=""
                  className="h-[50px] w-[50px] rounded-full bg-neutral-10 text-center justify-center items-center flex align-middle text-xs"
                  onClick={() => navigate("/profile")}
                ></img>
              )}
            </div>
            <div className="ml-1 flex flex-col">
              <span className="font-bold text-base text-neutral-10">
                Happy Working, {dataUserDashboard?.username} !
              </span>
              {/* replace with the actual username */}
              <Stack
                gap={"4px"}
                direction={"row"}
                alignItems="center"
                className="text-neutral-10"
                onClick={() =>
                  navigate("/pilihLokasi", { state: { from: "/main" } })
                }
              >
                <span className="font-normal text-xs">{lokasi.namaLokasi}</span>
                <Icon fontSize={"14px"} icon={"uil:map-marker"} />
              </Stack>
            </div>
          </div>
          <div className="bg-neutral-20 w-full h-[78vh] absolute bottom-0 rounded-t-[30px] flex-col items-center justify-center ">
            <div className="max-w-screen-2xl bg-neutral-10 h-16 mx-[35px] mt-[-32px] rounded-[10px] shadow-lg overflow-auto hide-scrollbar">
              {renderdat}
            </div>
            <div className="bg-neutral-10 m-4 max-w-screen-2xl pt-3 rounded-md flex items-center justify-center text-[14px] leading-[18px] font-bold">
              <div
                id="Rangkuman"
                className={`flex-1 pb-[12px] text-center  ${
                  activeTab === "Rangkuman"
                    ? "border-neutral-100  border-b-4 text-neutral-100"
                    : "text-neutral-70 border-neutral-10"
                } rounded-bl-md text-base`}
                onClick={() => handleTabClick("Rangkuman")}
              >
                Rangkuman
              </div>
              <div
                id="Grafik"
                className={`flex-1 pb-[12px] text-center  ${
                  activeTab === "Grafik"
                    ? "border-neutral-100  border-b-4"
                    : "text-neutral-70 border-neutral-10"
                } rounded-br-md text-base`}
                onClick={() => handleTabClick("Grafik")}
              >
                Grafik
              </div>
            </div>
            <div className="relative w-full ">
              {activeTab === "Rangkuman" && (
                <div className="transition-transform duration-200 ease-in-out pb-20">
                  <Rangkuman dataRangkuman={dataRangkuman} />
                </div>
              )}
              {activeTab === "Grafik" && (
                <div className="transition-transform duration-200 ease-in-out pb-20">
                  <Grafik />
                </div>
              )}
            </div>
          </div>
          <div className="fixed inset-x-0 -bottom-0.5 w-full bg-transparent flex z-50">
            <div className="relative w-full z-50 -mr-1">
              <svg
                className="w-full h-14 z-50  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] "
                viewBox="0 0 118 56"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M120 0H8.69995C6.39257 0 4.17966 0.916621 2.5481 2.54819C0.916529 4.17975 0 6.39263 0 8.70001V55.656H120V0Z"
                  fill="white"
                />
              </svg>
              <div className="absolute bottom-3 right-[45%] transform translate-x-1/2">
                <IconButton
                  children={
                    <HomeIcon height={"24px"} width={"24px"} color="black" />
                  }
                ></IconButton>
              </div>
            </div>
            <div className="z-[60]">
              <svg
                className="w-32 h-14 drop-shadow-[0_-3px_10px_ 0px_rgba(0,0,0,0.3)] z-10"
                viewBox="0 0 128 56"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 128 0 C 119.816 0.0033 116.108 1.1373 113.059 3.2322 C 110.009 5.3272 107.781 8.2706 106.708 11.6226 C 103.969 20.1027 98.312 27.544 90.582 32.8363 C 82.852 38.1287 73.462 40.9884 63.814 40.9889 C 54.166 40.9886 44.776 38.129 37.045 32.8366 C 29.315 27.5443 23.658 20.1029 20.919 11.6226 C 19.846 8.2707 17.618 5.3273 14.568 3.2324 C 11.518 1.1375 7.811 0.0035 0 0 V 56 H 128 V 0 Z"
                  fill="white"
                />
              </svg>
              <div className="relative">
                <Fab
                  size="large"
                  sx={{
                    position: "absolute",
                    border: 1,
                  }}
                  onClick={changeMenuState}
                  className="w-[76px] h-[76px] bottom-5 border-4 border-neutral-10 left-1/2 transform -translate-x-1/2 bg-success-Main hover:bg-success-Main shadow-[0_12px_17px_0px_rgba(0,0,0,0.16)] "
                >
                  <img
                    className="w-9 auto justify-center items-center inline"
                    src={iconFAB}
                    alt="logo"
                  ></img>
                </Fab>
              </div>
            </div>
            <div className="relative w-full z-50 -ml-1">
              <svg
                className="flex-grow w-full h-14 z-50 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                viewBox="0 0 121 56"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0H111.3C113.608 0 115.82 0.916621 117.452 2.54819C119.083 4.17975 120 6.39263 120 8.70001V55.656H0V0Z"
                  fill="white"
                />
              </svg>
              <div className="absolute bottom-3 right-[55%] transform translate-x-1/2 z-50">
                <IconButton
                  children={
                    <UilQrcodeScan
                      height={"24px"}
                      width={"24px"}
                      color="black"
                    />
                  }
                  onClick={() => navigate("/main/qrscanner")}
                ></IconButton>
              </div>
            </div>
            {shouldRenderBackground && (
              <div
                className={`fixed inset-0 bg-neutral-100 z-30 transition-opacity duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-50" : "opacity-0"
                }`}
                onAnimationEnd={() =>
                  !isMenuOpen && setShouldRenderBackground(false)
                }
              ></div>
            )}
            {shouldRender && (
              <div
                className={`fixed inset-0 flex flex-col items-center justify-end z-50 mb-[104px] ${
                  isMenuOpen ? "animate-slideUp" : "animate-slideDown"
                }`}
                onAnimationEnd={() => !isMenuOpen && setShouldRender(false)}
                onClick={changeMenuState}
              >
                <div className="flex flex-col items-start transform translate-x-1/2 -ml-[37px]">
                  <Button
                    startIcon={
                      <Icon
                        className="text-success-Main bg-neutral-20 rounded-full w-7 h-7 p-1 -mr-1 overflow-visible"
                        icon={"uil:money-withdraw"}
                      ></Icon>
                    }
                    className="bg-transparent text-success-Surface font-bold text-base"
                    onClick={() => navigate("/list/tebus")}
                  >
                    {"Tebus"}
                  </Button>
                  <Button
                    startIcon={
                      <Icon
                        className="text-success-Main bg-neutral-20 rounded-full w-7 h-7 p-1 -mr-1 overflow-visible"
                        icon={"uil:hourglass"}
                      ></Icon>
                    }
                    className="bg-transparent text-success-Surface font-bold text-base"
                    onClick={() => navigate("/list/perpanjang")}
                  >
                    {"Perpanjang"}
                  </Button>
                  <Button
                    startIcon={
                      <Icon
                        className="text-success-Main bg-neutral-20 rounded-full w-7 h-7 p-1 -mr-1 overflow-visible"
                        icon={"uil:balance-scale"}
                      ></Icon>
                    }
                    className="bg-transparent text-success-Surface font-bold text-base"
                    onClick={() => navigate("/list/gadai")}
                  >
                    {"Gadai"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
