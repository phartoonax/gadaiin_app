import { Icon } from "@iconify/react";
import { AppBar, IconButton, TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";

const QRScanner = () => {
  const [borderSizes, setSBorderSizes] = useState("");
  const [videoBorderWidth, setVideoBorderWidth] = useState(null);

  useEffect(() => {
    const div = document.querySelector(".scanner");

    const newUsableSpace = div.getBoundingClientRect();
    console.log(newUsableSpace);
    let viewportSize = Math.min(newUsableSpace.width, newUsableSpace.height);

    let viewportSizes = viewportSize * 0.15;
    let tempside = 0;
    let otherborder = 0;
    if (viewportSize === newUsableSpace.width) {
      tempside = newUsableSpace.width - viewportSizes * 2;
      otherborder = (newUsableSpace.height - tempside) / 2;
      setVideoBorderWidth(tempside);
    } else {
      tempside = newUsableSpace.height - viewportSizes * 2;
      otherborder = (newUsableSpace.width - tempside) / 2;
      setVideoBorderWidth(otherborder);
    }
    setSBorderSizes(calculateBorderSizes(viewportSizes, otherborder));
  }, []);

  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState("");
  const [facingMode, setFacingMode] = useState("environment");
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      console.log(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "environment" ? "face" : "environment"
    );
  };
  const calculateBorderSizes = (horizontalBorderSize, verticalBorderSize) => {
    return {
      horizontal: `${horizontalBorderSize}px solid #1F2933C7`,
      vertical: `${verticalBorderSize}px solid #1F2933C7`,
    };
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <AppBar position="static" className="bg-neutral-10 p-4" elevation={1}>
          <toolbar className="flex justify-start items-center">
            <IconButton
              sx={{ paddingY: "0px", paddingX: "6px" }}
              onClick={() => navigate(-1)}
            >
              <Icon
                className="text-neutral-70"
                icon="feather:arrow-left"
                style={{ fontSize: "24px" }}
              />
            </IconButton>
            <p className="h-full text-base font-bold text-neutral-100 ml-3 grow">
              Scan QR
            </p>
            <IconButton sx={{ padding: "0px" }}>
              <Icon
                className="text-neutral-100"
                icon="feather:zap-off"
                style={{ fontSize: "24px" }}
              />
            </IconButton>
          </toolbar>
        </AppBar>
        <QrScanner
          onDecode={handleScan}
          containerStyle={{ width: "100vw", height: "80vh" }}
          videoStyle={{ width: "100vw", height: "80vh", objectFit: "cover" }}
          viewFinder={() => (
            <svg
              viewBox="0 0 100 100"
              class="scanner"
              style={{
                zIndex: 1,
                boxSizing: "border-box",
                borderTop: borderSizes.vertical,
                borderBottom: borderSizes.vertical,
                borderLeft: borderSizes.horizontal,
                borderRight: borderSizes.horizontal,
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0px",
              }}
            >
              <path
                fill="none"
                d="M23,0 L0,0 L0,23"
                stroke="rgba(255, 0, 0, 0.5)"
                strokeWidth="5"
              />
              <path
                fill="none"
                d="M0,77 L0,100 L23,100"
                stroke="rgba(255, 0, 0, 0.5)"
                strokeWidth="5"
              />
              <path
                fill="none"
                d="M77,100 L100,100 L100,77"
                stroke="rgba(255, 0, 0, 0.5)"
                strokeWidth="5"
              />
              <path
                fill="none"
                d="M100,23 L100,0 77,0"
                stroke="rgba(255, 0, 0, 0.5)"
                strokeWidth="5"
              />
            </svg>
          )}
          viewFinderBorder={80}
          onError={handleError}
          constraints={{ facingMode }}
        />
        <div
          className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center text-sm font-bold leading-[18px]"
          style={{ width: `${videoBorderWidth}px` }}
        >
          Arahkan kamera pada QR dan pastikan dalam keadaan pencahayaan yang
          cukup
        </div>
        <div className="bg-neutral-100 w-full flex flex-grow flex-row justify-between  items-center px-4 py-[26px] gap-2.5">
          <TextField
            className="border-neutral-40 bg-neutral-10
          hover:bg-neutral-10 rounded-lg	 w-full"
            height="48px"
            id="filled-basic"
            label="Masukkan Kode Gadai"
            variant="filled"
            size="small"
            color="success"
          />
          <IconButton
            className="bg-success-Main hover:bg-success-Main "
            sx={{ borderRadius: "6px", width: "32px", height: "32px" }}
          >
            <Icon
              className="text-neutral-10 "
              icon="uil:search"
              style={{ fontSize: "24px" }}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default QRScanner;
