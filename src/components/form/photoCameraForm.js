import { Icon } from "@iconify/react";
import { Box, Button, IconButton, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * @description Komponen untuk menampilkan formulir kamera dan mengelola foto pelanggan.
 * @param {string} title Judul formulir
 * @param {string} savedImage URL gambar yang disimpan
 * @param {function} setSavedImage Fungsi untuk mengatur savedImage
 * @param {string} idPelanggan ID pelanggan
 * @param {string} type - Tipe formulir, bisa "barang", "bukti", atau lainnya
 * @param {boolean} enabled - Penanda untuk menentukan apakah formulir diaktifkan atau tidak
 * @returns {*} Sebuah formulir kamera dengan judul dan gambar yang ditentukan
 * @author Henry
 * @date 15/12/2023 - 13:09:13 AM
 */
const PhotoCameraForm = ({
  title,
  savedImage,
  setSavedImage,
  idPelanggan,
  type,
  enabled,
}) => {
  const helperText = (() => {
    switch (type) {
      case "barang":
        return "Untuk membuka webcam dan mengambil foto apabila data foto Barang belum ada.";
      case "bukti":
        return "Untuk membuka webcam dan mengambil foto bukti Pembayaran apabila customer membayar non tunai.";
      default:
        return "Untuk membuka webcam dan mengambil foto apabila data foto customer belum ada.";
    }
  })();
  const navigate = useNavigate();
  const isEnabled = enabled;
  return (
    <>
      <Stack gap="8px">
        {title && (
          <Stack direction="row" gap={"2px"}>
            <span className="text-neutral-100 text-base font-bold">
              {title}
            </span>
            {<span className="text-danger-Main text-base font-bold">*</span>}
          </Stack>
        )}
        <div className="px-4 pt-4 pb-[23px] w-full rounded-md bg-neutral-20">
          <Stack alignItems={"center"}>
            {savedImage && (
              <Box className="h-[120px] w-[120px] rounded-[4px] bg-green-500 overflow-hidden">
                <img src={savedImage} alt="captured" />
              </Box>
            )}

            {isEnabled && (
              <Stack
                direction="row"
                className="pt-[20px] pb-[9px] w-full"
                gap={"20px"}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "6px",
                    borderColor: "neutral.100",
                    color: "neutral.100",
                    ":hover": {
                      borderColor: "neutral.100",
                      color: "neutral.100",
                    },
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  startIcon={<Icon icon="feather:camera"></Icon>}
                  onClick={() => {
                    navigate("/profile/camera", {
                      state: { idPelanggan: idPelanggan, type: type },
                    });
                  }}
                >
                  Buka Kamera
                </Button>
                {savedImage && (
                  <IconButton
                    className="border-danger-Main hover:border-danger-Main"
                    sx={{
                      border: 1,
                      borderRadius: "6px",
                    }}
                    onClick={() => {
                      setSavedImage(null);
                      localStorage.removeItem("savedImage-" + idPelanggan);
                    }}
                  >
                    <Icon
                      className="text-danger-Main"
                      icon="feather:trash-2"
                    ></Icon>
                  </IconButton>
                )}
              </Stack>
            )}
            {isEnabled && (
              <p className="text-xs text-neutral-80 font-normal leading-5">
                {helperText}
              </p>
            )}
          </Stack>
        </div>
      </Stack>
    </>
  );
};

export default PhotoCameraForm;
