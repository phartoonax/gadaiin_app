import { Icon } from "@iconify/react";
import { AppBar, IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CameraProfile = () => {
  const navigate = useNavigate();
  const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(false);

  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [videoBorderHeight, setVideoBorderHeight] = useState(null);
  const [videoBorderWidth, setVideoBorderWidth] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  function handleCameraAccess() {
    setIsCameraAccessGranted(true);
  }

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

  const handleStop = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
    setIsCameraAccessGranted(false);
    setImage(null);
  };

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
    <div className="relative z-0">
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
      {isCameraAccessGranted ? (
        <div className="relative justify-center text-center">
          <div
            className="video-wrapper"
            style={{
              display: "inline-block",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <video
              className="block ml-auto mr-auto relative z-[1]"
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

          <div className="flex relative justify-center z-[2]">
            <button
              className="bg-red-600 hover:bg-blue-500 text-white font-semibold hover:text-white py-1 px-2 border border-white hover:border-transparent rounded mx-2 my-2"
              onClick={handleStop}
            >
              Stop
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-2 my-2"
              onClick={handleCapture}
            >
              Capture
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-2 my-2"
              onClick={toggleCamera}
            >
              Switch Camera
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mx-2 my-2"
            onClick={handleCameraAccess}
          >
            Start
          </button>
        </div>
      )}
      {image && (
        <img className="block ml-auto mr-auto" src={image} alt="captured" />
      )}
    </div>
  );
};

export default CameraProfile;
