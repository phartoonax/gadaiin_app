/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
import AppBarPlain from "../../components/appBarPlain";

const QRScanner = () => {
  const location = useLocation();
  const [borderSizes, setSBorderSizes] = useState("");
  const [videoBorderWidth, setVideoBorderWidth] = useState(null);

  const from = location.state ? location.state.from : null;

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
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      console.log(data);
      setIsDialogPerpanjangTebusOpen(true);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  // const toggleCamera = () => {
  //   setFacingMode((prevFacingMode) =>
  //     prevFacingMode === "environment" ? "face" : "environment"
  //   );
  // };

  const calculateBorderSizes = (horizontalBorderSize, verticalBorderSize) => {
    return {
      horizontal: `${horizontalBorderSize}px solid #1F2933C7`,
      vertical: `${verticalBorderSize}px solid #1F2933C7`,
    };
  };

  const toggleTorch = () => {
    setIsTorchOn((prevIsTorchOn) => !prevIsTorchOn);
  };

  const [isDialogPerpanjangTebusOpen, setIsDialogPerpanjangTebusOpen] =
    useState(false);

  return (
    <>
      <div className="w-screen min-h-screen h-screen flex flex-col justify-start items-start font-inter overflow-auto">
        <AppBarPlain
          buttonOnClick={toggleTorch}
          iconButton={"feather:zap-off"}
          placeholder={"Scan QR"}
        />
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
          constraints={{ advanced: [{ torch: isTorchOn }], facingMode }}
        />
        <div
          className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center text-sm font-normal leading-[18px]"
          style={{ width: `${videoBorderWidth}px` }}
        >
          Arahkan kamera pada QR dan pastikan dalam keadaan pencahayaan yang
          cukup
        </div>
        <div className="bg-neutral-100 w-full flex flex-grow flex-row justify-between  items-center px-4 py-[26px] gap-2.5">
          <input
            className="w-full rounded-lg py-[15px] px-4 placeholder:text-neutral-100 focus:outline-none"
            placeholder="Masukkan Kode Gadai"
          />
          <IconButton
            className="bg-success-Main hover:bg-success-Main text-center"
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
      <Dialog
        className="rounded-lg w-full "
        open={isDialogPerpanjangTebusOpen}
        onClose={() => setIsDialogPerpanjangTebusOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            marginX: "16px",
            paddingY: "16px",
            paddingX: "12px",
          },
        }}
      >
        <DialogContentText className="text-center text-sm font-normal leading-[18px] text-neutral-100 font-inter">
          {" Apakah anda mau mengubah status data gadai dengan kode "}
          <span className="font-bold">CX3705</span>
          {" atas nama "}
          <span className="font-bold">Budi Raharjo</span>
          {from === "tebus"
            ? " ke tebus gadai?"
            : from === "perpanjang"
            ? " ke perpanjang gadai?"
            : " ke perpanjang atau tebus gadai?"}
        </DialogContentText>
        <Stack
          direction="row"
          gap={"10px"}
          className="w-full justify-between pt-4"
        >
          <Button
            variant="contained"
            disableElevation={true}
            className="text-neutral-10 bg-success-Main rounded-lg px-3.5 py-3.5 w-full text-base font-bold hover:bg-success-Main"
            onClick={() => {
              setIsDialogPerpanjangTebusOpen(false);
            }}
          >
            {from === "tebus" || from === "perpanjang" ? (
              <div>Ya</div>
            ) : (
              <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                <Icon fontSize={"20px"} icon={"uil:hourglass"} />
                <div>Perpanjang</div>
              </Stack>
            )}
          </Button>
          <Button
            variant="outlined"
            className="text-success-Main border-success-Main hover:border-success-Main rounded-lg px-3.5 py-3.5 w-full text-base font-bold"
            onClick={() => {
              setIsDialogPerpanjangTebusOpen(false);
            }}
          >
            {from === "tebus" || from === "perpanjang" ? (
              <div>Tidak</div>
            ) : (
              <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                <Icon fontSize={"20px"} icon={"uil:money-withdraw"} />
                <div>Tebus</div>
              </Stack>
            )}
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default QRScanner;
