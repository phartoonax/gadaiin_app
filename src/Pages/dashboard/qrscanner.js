import { Icon } from "@iconify/react";
import { AppBar, IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";

const QRScanner = () => {
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

  return (
    <div className="w-full h-full flex-col justify-start items-start flex font-inter">
      <AppBar position="static" className="bg-neutral-10 p-4">
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
        containerStyle={{ width: "100%", height: "320px" }}
        videoStyle={{ width: "100%", height: "430px" }}
        viewFinderBorder={40}
        onError={handleError}
        constraints={{ facingMode }}
      />
    </div>
  );
};

export default QRScanner;
