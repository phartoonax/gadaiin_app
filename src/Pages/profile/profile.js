import React, { useState, useEffect } from "react";
import { Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppBarPlain from "../../components/appBarPlain";
import PhotoCameraForm from "../../components/form/photoCameraForm";

function Profile() {
  const dataProfile = JSON.parse(localStorage.getItem("dataProfile"));
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
    getValues: getValuesChangePass,
  } = useForm();

  const [valueEmailProfile, setValueEmailProfile] = useState(dataProfile.email);
  const [valueUsernameProfile, setValueUsernameProfile] = useState(
    dataProfile.name
  );
  const [valuePhoneProfile, setValuePhoneProfile] = useState(dataProfile.phone);
  const [savedImage, setSavedImage] = useState(
    JSON.parse(localStorage.getItem("savedImage-ProfileFromCamera")) ||
      dataProfile.picture[0]
  );

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

  function handleFormProfileChange(event) {
    const { name, value } = event.target;

    // Create a copy of the current state
    let updatedState = {
      email: valueEmailProfile,
      username: valueUsernameProfile,
      phone: valuePhoneProfile,
      picture: savedImage,
    };

    // Update the copy based on the input changes
    switch (name) {
      case "usernameprofile":
        updatedState.username = value;
        break;
      case "phoneprofile":
        updatedState.phone = value;
        break;
      case "emailprofile":
        updatedState.email = value;
        break;
      // Add more cases as needed
      default:
        break;
    }

    // Update the actual state
    setValueEmailProfile(updatedState.email);
    setValueUsernameProfile(updatedState.username);
    setValuePhoneProfile(updatedState.phone);

    // Check if all forms are filled using the updated copy
    const isFormProfileChangeFilled =
      updatedState.email !== dataProfile.email ||
      updatedState.username !== dataProfile.name ||
      updatedState.phone !== dataProfile.phone;
    setIsFormProfileChangeFilled(isFormProfileChangeFilled);
  }
  useEffect(() => {
    const isFormProfileChangeFilled =
      valueEmailProfile !== dataProfile.email ||
      valueUsernameProfile !== dataProfile.name ||
      valuePhoneProfile !== dataProfile.phone ||
      savedImage !== dataProfile.picture[0];

    setIsFormProfileChangeFilled(isFormProfileChangeFilled);
  }, [valueEmailProfile, valueUsernameProfile, valuePhoneProfile, savedImage]);

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

  function handleBackButton() {
    navigate(-1);
    localStorage.removeItem("savedImage-ProfileFromCamera");
  }

  function handleSimpanButton() {
    localStorage.setItem("savedImage-Profile", JSON.stringify(savedImage));
    localStorage.removeItem("savedImage-ProfileFromCamera");
    navigate(-1);
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
        <AppBarPlain
          handlerBackButton={handleBackButton}
          placeholder={"Profile"}
        />
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
                          validate: (value) =>
                            value === dataProfile.password ||
                            "Password lama tidak sesuai",
                        })}
                        type={
                          isCurrentPasswordChangeVisible ? "text" : "password"
                        }
                        className={`input-border pl-2  border text-[#1F2933] sm:text-sm rounded-lg block w-full p-2.5  ${
                          errorsChangePass.changeoldpassword
                            ? "border-danger-Main bg-danger-Surface"
                            : isFormPasswordChangeFilled
                            ? "border-black bg-neutral-10"
                            : "border-gray-300 bg-neutral-10"
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
                      <span className="text-danger-Main text-xs leading-[14px] pt-2">
                        {errorsChangePass.changeoldpassword.message}
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
                        className={`input-border pl-2  border text-[#1F2933] sm:text-sm rounded-lg block w-full p-2.5  ${
                          isFormPasswordChangeFilled
                            ? "border-black bg-neutral-10"
                            : "border-gray-300 bg-neutral-10"
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
                          validate: (value) =>
                            value ===
                              getValuesChangePass("changenewpassword") ||
                            "Password baru dan Konfirmasi Password baru tidak sesuai",
                        })}
                        type={
                          isConfrimNewPasswordChangeVisible
                            ? "text"
                            : "password"
                        }
                        className={`input-border pl-2  border text-[#1F2933] sm:text-sm rounded-lg block w-full p-2.5  ${
                          errorsChangePass.changeconfirmnewpassword
                            ? "border-danger-Main bg-danger-Surface"
                            : isFormPasswordChangeFilled
                            ? "border-black bg-neutral-10"
                            : "border-gray-300 bg-neutral-10"
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
                    {errorsChangePass.changeconfirmnewpassword && (
                      <span className="text-[#E53A34] text-xs leading-[14px] font-normal">
                        {errorsChangePass.changeconfirmnewpassword.message}
                      </span>
                    )}
                  </div>
                </form>
                <div className="px-3 pb-4 pt-2 sm:px-6 flex gap-2.5 justify-between">
                  <button
                    disabled={!isFormPasswordChangeFilled}
                    onClick={handleSubmitChangePass(toggleDialogChangePass)}
                    type="button"
                    className={` font-bold py-3.5 px-5 w-2/4 rounded-xl  ${
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
          <form onChange={handleFormProfileChange}>
            <Stack gap={"20px"}>
              <Stack gap={"8px"}>
                <div className="text-base font-bold">
                  <span className="text-neutral-100">Email</span>
                  <span className="text-danger-Main">*</span>
                </div>
                <input
                  name="emailprofile"
                  defaultValue={valueEmailProfile}
                  onChange={(e) => setValueEmailProfile(e.target.value)}
                  {...register("emailprofile", {
                    type: "email",
                    required: true,
                  })}
                  className={`input-border pl-2 bg-gray-50 border border-neutral-60 text-neutral-100 text-sm  rounded-lg  focus:border-[#101C42] block w-full px-4 py-[15px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ${
                    valueEmailProfile ? "border-[#101C42]" : "border-neutral-60"
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
                  name="usernameprofile"
                  defaultValue={valueUsernameProfile}
                  onChange={(e) => setValueUsernameProfile(e.target.value)}
                  {...register("usernameprofile", {
                    type: "text",
                    required: true,
                  })}
                  className={`input-border pl-2 bg-gray-50 border border-neutral-60 text-neutral-100 text-sm  rounded-lg  focus:border-[#101C42] block w-full px-4 py-[15px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                    valueUsernameProfile
                      ? "border-[#101C42]"
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
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-neutral-80">
                    +62
                  </span>
                  <input
                    name="phoneprofile"
                    type="number"
                    defaultValue={valuePhoneProfile}
                    onChange={(e) => {
                      setValuePhoneProfile(e.target.value);
                      console.log(valuePhoneProfile);
                    }}
                    {...register("phoneprofile", {
                      type: "number",
                      required: true,
                    })}
                    className={`input-border pl-12 bg-gray-50 border border-neutral-60 text-neutral-100 text-sm rounded-lg  focus:border-[#101C42] block w-full px-4 py-[15px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                      valuePhoneProfile
                        ? "border-[#101C42]"
                        : "border-neutral-60"
                    } ${
                      errors.phoneprofile
                        ? "border-[#E53A34] bg-[#FCF3F2]"
                        : "border-neutral-60"
                    }`}
                  />
                </div>
              </Stack>
              <PhotoCameraForm
                savedImage={savedImage}
                setSavedImage={setSavedImage} //TODO: MUNGKIN PERUBAHAN TERHADAP DELETE PROFILE PICTURE, DELETE JIKA ADA FOTO SEBELUMNYA BALIK KE FOTO SEBELUMNYA
                idPelanggan={"ProfileFromCamera"}
                enabled={true}
              />
              <Button
                variant="outlined"
                className="text-sm leading-[18px]"
                sx={{
                  textTransform: "capitalize",
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
              <Button
                variant="contained"
                onClick={
                  isFormProfileChangeFilled
                    ? handleSubmit(handleSimpanButton)
                    : null
                }
                enabled={isFormProfileChangeFilled ? false : true}
                disableElevation={isFormProfileChangeFilled ? false : true}
                sx={{
                  borderRadius: "8px",
                  color: "neutral.10",
                  width: "100%",
                  paddingY: "9px",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
                className={` mb-20 ${
                  isFormProfileChangeFilled
                    ? "bg-themeColor focus:bg-themeColor hover:bg-themeColor text-neutral-10"
                    : "bg-neutral-30 focus:bg-neutral-30 hover:bg-neutral-30 text-neutral-70"
                }`}
              >
                Simpan
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
            boxShadow: "0px -4px 4px 0px rgba(0,0,0,0.25)",
            borderRadius: "0px",
          }}
          elevation={5}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
              localStorage.clear();
            }}
            sx={{
              borderRadius: "8px",
              color: "neutral.10",
              width: "100%",
              paddingY: "9px",
              fontWeight: 500,
              fontSize: "15px",
            }}
            className={`bg-danger-Main focus:bg-danger-Main hover:bg-danger-Main text-danger-Surface`}
          >
            Logout
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default Profile;
