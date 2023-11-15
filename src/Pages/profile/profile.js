import React, { useState } from "react";
import { AppBar, Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";

function Profile() {
  const navigate = useNavigate();

  const [isFormRegisterFilled, setIsFormRegisterFilled] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  function handleFormRegisterChange(event) {
    // Check if all forms are filled
    const isFormRegisterFilled =
      event.target.form[0].value !== "" &&
      event.target.form[1].value !== "" &&
      event.target.form[3].value !== "";
    setIsFormRegisterFilled(isFormRegisterFilled);
  }

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
          </toolbar>
        </AppBar>
        <div className="px-4 pt-5 w-full">
          <form onChange={handleFormRegisterChange}>
            <Stack gap={"20px"}>
              <Stack gap={"8px"}>
                <div className="text-base font-bold">
                  <span className="text-neutral-100">Email</span>{" "}
                  <span className="text-danger-Main">*</span>
                </div>
                <input
                  value={"ADMIN@EMAIL.COM"}
                  {...register("emailprofile", {
                    type: "email",
                    required: true,
                  })}
                  className={`pl-2 bg-gray-50 border border-neutral-60 text-[#1F2933] sm:text-sm rounded-lg focus:ring-neborder-neutral-90 focus:border-neutral-90 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                    isFormRegisterFilled ? "border-black" : "border-neutral-60"
                  } ${
                    errors.emailprofile
                      ? "border-[#E53A34] bg-[#FCF3F2]"
                      : "border-neutral-60"
                  }`}
                />
              </Stack>
              <Stack gap={"8px"}>
                <div className="text-base font-bold">
                  <span className="text-neutral-100">Nama User</span>{" "}
                  <span className="text-danger-Main">*</span>
                </div>
                <input
                  value={"BAGAS"}
                  {...register("usernameprofile", {
                    type: "text",
                    required: true,
                  })}
                  className={`pl-2 bg-gray-50 border border-neutral-60 text-[#1F2933] sm:text-sm rounded-lg focus:ring-neborder-neutral-90 focus:border-neutral-90 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                    isFormRegisterFilled ? "border-black" : "border-neutral-60"
                  } ${
                    errors.usernameprofile
                      ? "border-[#E53A34] bg-[#FCF3F2]"
                      : "border-neutral-60"
                  }`}
                />
              </Stack>
              <Stack gap={"8px"}>
                <div className="text-base font-bold">
                  <span className="text-neutral-100">No HP</span>{" "}
                  <span className="text-danger-Main">*</span>
                </div>
                <input
                  value={87884044994}
                  {...register("phoneprofile", {
                    type: "number",
                    required: true,
                  })}
                  className={`pl-2 bg-gray-50 border border-neutral-60 text-[#1F2933] sm:text-sm rounded-lg focus:ring-neborder-neutral-90 focus:border-neutral-90 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                    isFormRegisterFilled ? "border-black" : "border-neutral-60"
                  } ${
                    errors.phoneprofile
                      ? "border-[#E53A34] bg-[#FCF3F2]"
                      : "border-neutral-60"
                  }`}
                />
              </Stack>
              <div className="px-4 pt-4 pb-[23px] w-full rounded-md bg-neutral-20">
                <Stack alignItems={"center"}>
                  <Box className="h-[120px] w-[120px] rounded-[4px] bg-green-500"></Box>

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
                      onClick={() => navigate("/profile/camera")}
                    >
                      Buka Kamera
                    </Button>
                    <IconButton
                      className="border-danger-Main hover:border-danger-Main "
                      sx={{
                        border: 1,
                        borderRadius: "6px",
                      }}
                    >
                      <Icon className="text-danger-Main" icon="fe:trash"></Icon>
                    </IconButton>
                  </Stack>
                  <p className="text-xs text-neutral-80 font-normal leading-5">
                    Untuk membuka webcam dan mengambil foto apabila data foto
                    customer belum ada.
                  </p>
                </Stack>
              </div>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "6px",
                  borderColor: "neutral.100",
                  color: "neutral.100",
                  width: "100%",
                  paddingY: "10px",
                  fontWeight: "bold",
                  ":hover": {
                    borderColor: "neutral.100",
                    color: "neutral.100",
                  },
                }}
              >
                Ganti Password
              </Button>
            </Stack>
          </form>
        </div>
        <Paper
          className="w-full px-4 py-3"
          sx={{
            position: "fixed",
            bottom: "0px",
            left: 0,
            right: 0,

            borderRadius: "0px",
          }}
          elevation={5}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "8px",
              color: "neutral.10",
              width: "100%",
              paddingY: "10px",
              fontWeight: 500,
              fontSize: "15px",
            }}
            className="bg-themeColor hover:bg-themeColor"
          >
            Simpan
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default Profile;
