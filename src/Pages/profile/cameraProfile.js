import { Icon } from "@iconify/react";
import { Button, IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBarPlain from "../../components/appBarPlain";

/**
 * @description Komponen ini menampilkan antarmuka kamera untuk mengambil foto profil. Ini mencakup akses ke kamera perangkat dan memungkinkan pengguna untuk mengambil foto, yang kemudian dapat disimpan dan digunakan sebagai foto profil.
 * @author Henry
 * @date UPDATED: 28/11/2023 - 11:10:31 AM
 * @return {*} Komponen React yang menampilkan antarmuka kamera.
 */
const CameraProfile = () => {
  const location = useLocation();
  const idPelanggan = location.state.idPelanggan;
  const type = location.state.type ?? "wajah";
  const idPhoto = idPelanggan
    ? "savedImage-" + idPelanggan
    : "savedImage-Profile";

  const navigate = useNavigate();
  const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(true);

  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [videoBorderHeight, setVideoBorderHeight] = useState(null);
  const [videoBorderWidth, setVideoBorderWidth] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  useEffect(() => {
    let stream = null;
    if (isCameraAccessGranted) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode },
        })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
              const squareSize =
                Math.min(
                  videoRef.current.videoWidth,
                  videoRef.current.videoHeight
                ) * 0.7;
              setVideoBorderWidth(squareSize);
              setVideoBorderHeight(squareSize);
            };
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [facingMode, isCameraAccessGranted]);

  // useEffect hook for applying the torch constraint
  useEffect(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
      if (facingMode === "environment" && videoTrack.getCapabilities().torch) {
        videoTrack
          .applyConstraints({
            advanced: [{ torch: isFlashOn }],
          })
          .catch((error) => {
            console.error("Error applying torch constraint", error);
          });
      }
    }
  }, [isFlashOn, facingMode]);

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;

    // Calculate the dimensions and position of the square
    const squareSize = Math.min(videoBorderWidth, videoBorderHeight); // 70% of the smaller dimension
    const squareX = (videoWidth - squareSize) / 2;
    const squareY = (videoHeight - squareSize) / 2;

    // Set the canvas dimensions to the square size
    canvas.width = squareSize;
    canvas.height = squareSize;

    // Draw the video frame to the canvas, but only the area within the square
    context.drawImage(
      videoRef.current,
      squareX,
      squareY,
      squareSize,
      squareSize,
      0,
      0,
      squareSize,
      squareSize
    );

    // Get the image data URL from the canvas
    setImage(canvas.toDataURL("image/png"));

    //stop the camera
    handleStop();
  };
  
  const handleStop = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
    setIsCameraAccessGranted(false);
  };

  const handleRetake = () => {
    setIsCameraAccessGranted(true);
    setImage(null);
  };

  const handleSave = () => {
    handleStop();
    localStorage.setItem(idPhoto, JSON.stringify(image));

    navigate(-1);
  };

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "environment" ? "face" : "environment"
    );
  };

  const handleToggleFlash = () => {
    setIsFlashOn((prevIsFlashOn) => !prevIsFlashOn);
  };
  return (
    <>
      <div className="relative z-0 w-screen h-screen flex flex-col font-inter">
        <AppBarPlain placeholder={"Kamera"} />
        <div className="relative justify-center text-center flex flex-col">
          <div
            className={`video-wrapper inline-block relative overflow-hidden w-[100vw] h-[80vh] ${
              image ? "bg-neutral-100" : ""
            }`}
          >
            {image ? (
              <div>
                <img
                  className="block ml-auto mr-auto absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  src={image}
                  alt="captured"
                />
                <div
                  className="video-overlay"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${videoBorderWidth}px`,
                    height: `${videoBorderHeight}px`,
                    transform: "translate(-50%, -50%)",
                    background: "transparent",
                    zIndex: 2,
                    borderRadius: "0px",
                    border: "0px",
                    boxSizing: "border-box",
                    boxShadow: `0 0 0 9999px ${
                      image ? "#1F2933FF" : "#1F2933C7"
                    }`,
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="overlay-border"
                    style={{
                      zIndex: 1,
                      boxSizing: "border-box",
                      borderTop: videoBorderHeight,
                      borderBottom: videoBorderHeight,
                      borderLeft: videoBorderWidth,
                      borderRight: videoBorderWidth,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: "0px",
                    }}
                  >
                    <path
                      fill="none"
                      d="M23,0 L0,0 L0,23"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                    <path
                      fill="none"
                      d="M0,77 L0,100 L23,100"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                    <path
                      fill="none"
                      d="M77,100 L100,100 L100,77"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                    <path
                      fill="none"
                      d="M100,23 L100,0 77,0"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div
                  className="absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm font-bold leading-[18px]"
                  style={{ width: `${videoBorderWidth}px` }}
                >
                  {`Pastikan ${type} masuk dalam kotak dan dalam keadaan pencahayaan
                  yang cukup`}
                </div>
              </div>
            ) : (
              <div>
                <video
                  className="block ml-auto mr-auto relative z-[1] w-[100vw] h-[80vh] object-cover"
                  ref={videoRef}
                  autoPlay
                />
                <div
                  className="video-overlay"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${videoBorderWidth}px`,
                    height: `${videoBorderHeight}px`,
                    transform: "translate(-50%, -50%)",
                    background: "transparent",
                    zIndex: 2,
                    borderRadius: "0px",
                    border: "0px",
                    boxSizing: "border-box",
                    boxShadow: "0 0 0 9999px #1F2933C7",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="overlay-border"
                    style={{
                      zIndex: 1,
                      boxSizing: "border-box",
                      borderTop: videoBorderHeight,
                      borderBottom: videoBorderHeight,
                      borderLeft: videoBorderWidth,
                      borderRight: videoBorderWidth,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: "0px",
                    }}
                  >
                    <path
                      fill="none"
                      d="M23,0 L0,0 L0,23"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                    <path
                      fill="none"
                      d="M0,77 L0,100 L23,100"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                    <path
                      fill="none"
                      d="M77,100 L100,100 L100,77"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                    <path
                      fill="none"
                      d="M100,23 L100,0 77,0"
                      stroke="rgba(210,28,28, 0.8)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div
                  className="absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm font-bold leading-[18px]"
                  style={{ width: `${videoBorderWidth}px` }}
                >
                  {`Pastikan ${type} masuk dalam kotak dan dalam keadaan pencahayaan
                yang cukup`}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex relative justify-between z-[2] px-7 py-3.5 flex-grow bg-neutral-100 w-full flex-row items-center">
          {!image ? (
            <IconButton
              className="text-neutral-10 hover:text-neutral-10"
              onClick={toggleCamera}
            >
              <Icon
                width={"24px"}
                height={"24px"}
                icon={"feather:refresh-ccw"}
              ></Icon>
            </IconButton>
          ) : (
            <Button
              variant="text"
              onClick={handleRetake}
              className="text-sm leading-[18px] text-neutral-10 font-bold"
            >
              Foto Ulang
            </Button>
          )}
          {!image && (
            <Button
              className="Shutter bg-transparent rounded-full w-[72px] h-[72px] p-0"
              onClick={handleCapture}
            >
              <div
                className="w-[72px] h-[72px]  rounded-full border-[3px] border-white flex relative justify-center
            items-center"
              >
                <div className="w-[58px] h-[58px] bg-neutral-10 rounded-full"></div>
              </div>
            </Button>
          )}
          {!image ? (
            <IconButton
              className="text-neutral-10 hover:text-neutral-10"
              onClick={handleToggleFlash}
            >
              <Icon
                width={"24px"}
                height={"24px"}
                icon={isFlashOn ? "feather:zap" : "feather:zap-off"}
              />
            </IconButton>
          ) : (
            <Button
              variant="text"
              onClick={handleSave}
              className="text-sm leading-[18px] text-neutral-10 font-bold"
            >
              Simpan
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CameraProfile;
