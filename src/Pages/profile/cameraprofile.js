import { Icon } from "@iconify/react";
import { AppBar, Button, IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CameraProfile = () => {
  const navigate = useNavigate();
  const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(true);

  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [videoBorderHeight, setVideoBorderHeight] = useState(null);
  const [videoBorderWidth, setVideoBorderWidth] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  useEffect(() => {
    let stream = null;
    if (isCameraAccessGranted) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode } })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.rotate = 90;
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

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;

    // Calculate the dimensions and position of the square
    const squareSize = Math.min(videoBorderWidth, videoBorderHeight); // 75% of the smaller dimension
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
  };
  const toggleCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "environment" ? "face" : "environment"
    );
  };
  return (
    <>
      <div className="relative z-0 w-screen h-screen flex flex-col">
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
              Kamera
            </p>
          </toolbar>
        </AppBar>
        <div className="relative justify-center text-center flex flex-col">
          <div className="video-wrapper inline-block relative overflow-hidden w-[100vw] h-[80vh]">
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
                borderRadius: "10px",
                border: "2px solid white",
                boxSizing: "border-box",
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
              }}
            ></div>
          </div>
        </div>
        <div className="flex relative justify-between z-[2] px-7 py-3.5 flex-grow bg-neutral-100 w-full flex-row items-center">
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
          <Button
            className="bg-transparent rounded-full w-[72px] h-[72px] p-0"
            onClick={null}
          >
            {" "}
            <div
              className="w-[72px] h-[72px]  rounded-full border-[3px] border-white flex relative justify-center
            items-center"
            >
              {" "}
              <div className="w-[58px] h-[58px] bg-neutral-10 rounded-full"></div>
            </div>
          </Button>
          <IconButton
            className="text-danger-Hover hover:text-danger-Hover"
            onClick={null}
          >
            <Icon
              width={"24px"}
              height={"24px"}
              icon={"feather:zap-off"}
            ></Icon>
          </IconButton>
        </div>
        {image && (
          <img className="block ml-auto mr-auto" src={image} alt="captured" />
        )}
      </div>
    </>
  );
};

export default CameraProfile;
