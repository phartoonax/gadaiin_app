import "../../assets/css/custom.css";
import iconFAB from "../../assets/images/balance-scale.png";
import { UilQrcodeScan } from "@iconscout/react-unicons";
import { HomeIcon } from "@heroicons/react/20/solid";

import { IconButton } from "@mui/material";
import Rangkuman from "./rangkuman";
import Grafik from "./grafik";
import { useState } from "react";

const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState("Rangkuman");

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
            <div className=" rounded-full overflow-hidde drop-shadow-xl">
              <img
                src="https://via.placeholder.com/150" // replace with the actual profile picture URL
                alt="Profile"
                className="h-[50px] w-[50px] rounded-full"
              />
            </div>
            <div className="ml-1 flex flex-col">
              <span className="font-bold text-lg text-neutral-10">
                Happy Working, Bagas!
              </span>{" "}
              {/* replace with the actual username */}
              <span className="text-neutral-10">Jabodetabek</span>{" "}
              {/* replace with the actual city */}
            </div>
          </div>
          <div className="bg-neutral-20 w-full h-[78vh] absolute bottom-0 rounded-t-[30px] flex-col items-center justify-center ">
            <div className="max-w-screen-2xl bg-neutral-10 h-16 mx-[35px] mt-[-32px] rounded-[10px] shadow-lg"></div>
            <div className="bg-white m-4 max-w-screen-2xl pt-3 rounded-md flex items-center justify-center text-[14px] leading-[18px] font-bold">
              <div
                id="Rangkuman"
                className={`flex-1 pb-[12px] text-center  ${
                  activeTab === "Rangkuman"
                    ? "border-neutral-100  border-b-4 text-neutral-100"
                    : "text-neutral-70 border-neutral-10"
                } rounded-bl-md`}
                onClick={() => handleTabClick("Rangkuman")}
              >
                Rangkuman
              </div>
              <div
                id="Grafik"
                className={`flex-1 pb-[12px] text-center  ${
                  activeTab === "Grafik"
                    ? "border-black  border-b-4"
                    : "text-neutral-70 border-neutral-10"
                } rounded-br-md`}
                onClick={() => handleTabClick("Grafik")}
              >
                Grafik
              </div>
            </div>{" "}
            <div className="relative w-full">
              {activeTab === "Rangkuman" && (
                <div className="transition-transform duration-200 ease-in-out">
                  <Rangkuman />
                </div>
              )}
              {activeTab === "Grafik" && (
                <div className="transition-transform duration-200 ease-in-out">
                  <Grafik />
                </div>
              )}
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 w-full bg-transparent flex">
            {" "}
            <div className="relative w-full">
              {" "}
              <svg
                className="w-full h-14 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
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
                ></IconButton>{" "}
              </div>
            </div>
            <div className="z-10">
              {" "}
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
                <button className="absolute bottom-6 border-4 border-white left-1/2 transform -translate-x-1/2 w-[76px] h-[76px] bg-sucess-Main text-white rounded-full shadow-[0_12px_17px_0px_rgba(0,0,0,0.16)] ">
                  <img
                    className="w-9 auto justify-center items-center inline"
                    src={iconFAB}
                    alt="logo"
                  ></img>
                </button>
              </div>{" "}
            </div>
            <div className="relative w-full">
              <svg
                className="flex-grow w-full h-14 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
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
              <div className="absolute bottom-3 right-[55%] transform translate-x-1/2">
                <IconButton
                  children={
                    <UilQrcodeScan
                      height={"24px"}
                      width={"24px"}
                      color="black"
                    />
                  }
                ></IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
