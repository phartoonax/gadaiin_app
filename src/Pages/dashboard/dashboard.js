import "../../assets/css/custom.css";

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
          <div className="fixed inset-x-0 bottom-0 flex items-center justify-between p-4 bg-neutral-10 shadow-outline-up rounded-t-2xl ">
            <button className="p-2 bg-blue-500 text-white rounded-full">
              Button 1
            </button>
            <div className="relative">
              <button className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[76px] h-[76px] bg-red-500 text-white rounded-full shadow-lg ">
                FAB
              </button>
            </div>
            <button className="p-2 bg-blue-500 text-white rounded-full">
              Button 2
            </button>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-neutral-10 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
