import React, { useState } from "react";
import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppBarPlain from "../../components/appBarPlain";

function Profile() {
  const navigate = useNavigate();

  const [isFormProfileChangeFilled, setIsFormProfileChangeFilled] =
    useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const {
    register: registerChangePass,
    handleSubmit: handleSubmitChangePass,
    // reset: resetChangePass,
    setValue: setValueChangePass,
    formState: { errors: errorsChangePass },
  } = useForm();

  const [isDialogOpenChangePass, setIsDialogOpenChangePass] = useState(false);
  const [isFormPasswordChangeFilled, setIsFormPasswordChangeFilled] =
    useState(false);

  const [isCurrentPasswordChangeVisible, setIsCurrentPasswordChangeVisible] =
    useState(false);
  const [isNewPasswordChangeVisible, setIsNewPasswordChangeVisible] =
    useState(false);
  const [
    isConfrimNewPasswordChangeVisible,
    setIsConfrimNewPasswordChangeVisible,
  ] = useState(false);

  function toggleCurrentPasswordChangeVisibility() {
    setIsCurrentPasswordChangeVisible((prevState) => !prevState);
  }
  function toggleNewPasswordChangeVisibility() {
    setIsNewPasswordChangeVisible((prevState) => !prevState);
  }
  function toggleConfirmNewPasswordChangeVisibility() {
    setIsConfrimNewPasswordChangeVisible((prevState) => !prevState);
  }

  function handleFormProfileChangeChange(event) {
    // Check if all forms are filled
    const isFormProfileChangeFilled =
      event.target.form[0].value !== "" &&
      event.target.form[1].value !== "" &&
      event.target.form[2].value !== "";
    setIsFormProfileChangeFilled(isFormProfileChangeFilled);
  }
  function handleFormPasswordChangeChange(event) {
    // Check if all forms are filled
    const isFormPasswordChangeFilled =
      event.target.form[0].value !== "" &&
      event.target.form[2].value !== "" &&
      event.target.form[4].value !== "";
    setIsFormPasswordChangeFilled(isFormPasswordChangeFilled);
  }
  function toggleDialogChangePass() {
    setValueChangePass("changeoldpassword", "");
    setValueChangePass("changenewpassword", "");
    setValueChangePass("changeconfirmnewpassword", "");

    setIsCurrentPasswordChangeVisible(false);
    setIsNewPasswordChangeVisible(false);
    setIsConfrimNewPasswordChangeVisible(false);

    setIsFormPasswordChangeFilled(false);
    setIsDialogOpenChangePass((prevState) => !prevState);
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <AppBarPlain placeholder={"Profile"} />
        {isDialogOpenChangePass && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full pt-2">
                <form onChange={handleFormPasswordChangeChange}>
                  <div className="px-3 py-2">
                    <div className="text-start pb-2">
                      <h5 className="font-bold leading-6">Password Lama</h5>
                    </div>
                    <div className="relative w-full">
                      <input
                        placeholder=""
                        {...registerChangePass("changeoldpassword", {
                          required: true,
                        })}
                        type={
                          isCurrentPasswordChangeVisible ? "text" : "password"
                        }
                        className={`pl-2 bg-gray-50 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                          isFormPasswordChangeFilled
                            ? "border-black"
                            : "border-gray-300"
                        } ${
                          errorsChangePass.changeoldpassword
                            ? "border-[#E53A34] bg-[#FCF3F2]"
                            : "border-gray-300"
                        }`}
                      />
                      <div>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                          onClick={toggleCurrentPasswordChangeVisibility}
                        >
                          <FontAwesomeIcon
                            className="w-5 h-5 text-[#50555B]"
                            icon={
                              isCurrentPasswordChangeVisible
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                            }
                          />
                        </button>
                      </div>
                    </div>

                    {errorsChangePass.changeoldpassword && (
                      <span className="text-[#E53A34] text-xs leading-[14px] font-normal">
                        Format email salah
                      </span>
                    )}
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-start pb-2">
                      <h5 className="font-bold leading-6">Password Baru</h5>
                    </div>
                    <div className="relative w-full">
                      <input
                        placeholder=""
                        {...registerChangePass("changenewpassword", {
                          required: true,
                        })}
                        type={isNewPasswordChangeVisible ? "text" : "password"}
                        className={`pl-2 bg-gray-50 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                          isFormPasswordChangeFilled
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      />
                      <div>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                          onClick={toggleNewPasswordChangeVisibility}
                        >
                          <FontAwesomeIcon
                            className="w-5 h-5 text-[#50555B]"
                            icon={
                              isNewPasswordChangeVisible
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-start pb-2">
                      <h5 className="font-bold leading-6">
                        Konfirmasi Password Baru
                      </h5>
                    </div>
                    <div className="relative w-full">
                      <input
                        placeholder=""
                        {...registerChangePass("changeconfirmnewpassword", {
                          required: true,
                        })}
                        type={
                          isConfrimNewPasswordChangeVisible
                            ? "text"
                            : "password"
                        }
                        className={`pl-2 bg-gray-50 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                          isFormPasswordChangeFilled
                            ? "border-black"
                            : "border-gray-300"
                        }  ${
                          errorsChangePass.konfirmasipasswordregister
                            ? "border-[#E53A34] bg-[#FCF3F2]"
                            : "border-gray-300"
                        }`}
                      />
                      <div>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                          onClick={toggleConfirmNewPasswordChangeVisibility}
                        >
                          <FontAwesomeIcon
                            className="w-5 h-5 text-[#50555B]"
                            icon={
                              isConfrimNewPasswordChangeVisible
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                            }
                          />
                        </button>
                      </div>
                    </div>
                    {errorsChangePass.konfirmasipasswordregister && (
                      <span className="text-[#E53A34] text-xs leading-[14px] font-normal">
                        Konfirmasi password tidak sama dengan password
                      </span>
                    )}
                  </div>
                </form>
                <div className="px-3 pb-4 pt-2 sm:px-6 flex gap-2.5 justify-between">
                  <button
                    disabled={!isFormPasswordChangeFilled}
                    onClick={handleSubmitChangePass(null)}
                    type="button"
                    className={` font-bold py-3.5 px-5 w-2/4 rounded-xl ${
                      isFormPasswordChangeFilled
                        ? "bg-success-Main text-neutral-10"
                        : "bg-neutral-30 text-neutral-70"
                    }`}
                  >
                    Simpan
                  </button>
                  <button
                    onClick={toggleDialogChangePass}
                    type="button"
                    className="bg-white border-[#28A138] border hover:bg-[#28A138] hover:text-white text-[#28A138] font-bold py-3.5 px-5 w-2/4 rounded-xl"
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="px-4 pt-5 w-full">
          <form onChange={handleFormProfileChangeChange}>
            <Stack gap={"20px"}>
              <Stack gap={"8px"}>
                <div className="text-base font-bold">
                  <span className="text-neutral-100">Email</span>
                  <span className="text-danger-Main">*</span>
                </div>
                <input
                  value={"ADMIN@EMAIL.COM"}
                  {...register("emailprofile", {
                    type: "email",
                    required: true,
                  })}
                  className={`pl-2 bg-gray-50 border border-neutral-60 text-[#1F2933] sm:text-sm rounded-lg focus:ring-neborder-neutral-90 focus:border-neutral-90 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                    isFormProfileChangeFilled
                      ? "border-black"
                      : "border-neutral-60"
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
                    isFormProfileChangeFilled
                      ? "border-black"
                      : "border-neutral-60"
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
                    isFormProfileChangeFilled
                      ? "border-black"
                      : "border-neutral-60"
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
                      <Icon
                        className="text-danger-Main"
                        icon="feather:trash-2"
                      ></Icon>
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
                onClick={(event) => {
                  event.preventDefault();
                  toggleDialogChangePass();
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
            className={`${
              isFormProfileChangeFilled
                ? "bg-themeColor text-neutral-10"
                : "bg-neutral-30 text-neutral-70"
            }`}
          >
            Simpan
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default Profile;
