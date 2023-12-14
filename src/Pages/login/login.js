/* eslint-disable jsx-a11y/anchor-is-valid */

import logo from "../../assets/images/logo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

import { useForm } from "react-hook-form";
import { browserName, BrowserTypes } from "react-device-detect";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { urlAPI } from "../../variableGlobal";
import axios from "axios";

console.log(`${browserName} 
${BrowserTypes}`);

library.add(faEnvelope, faKey, faEye, faEyeSlash);

const Login = (props) => {
  const navigate = useNavigate();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    // setValue: setValueLogin,
    watch: watchLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    reset: resetRegister,
    // setValue: setValueRegister,
    formState: { errors: errorsRegister },
    watch: watchRegister,
  } = useForm();

  const password = watchRegister("passwordregister");

  const {
    register: registerForgetPass,
    handleSubmit: handleSubmitForgetPass,
    reset: resetForgetPass,
    setValue: setValueForgetPass,
    formState: { errors: errorsForgetPass },
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [isSignaturePadVisible, setIsSignaturePadVisible] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const signatureRef = useRef(null);

  //DIALOG STATE
  const [isDialogOpenResetPass, setIsDialogOpenResetPass] = useState(false);
  const [isResetPassFilled, setIsResetPassFilled] = useState(false);

  const [isDialogOpenRegister, setIsDialogOpenRegister] = useState(false);
  const [isFormRegisterFilled, setIsFormRegisterFilled] = useState(false);
  const [isPasswordRegisterVisible, setIsPasswordRegisterVisible] =
    useState(false);
  const [
    isConfirmPasswordRegisterVisible,
    setIsConfirmPasswordRegisterVisible,
  ] = useState(false);
  const [isSnackbarRegisterOpen, setIsSnackbarRegisterOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false); //! set register used in api

  const [isSnackBarLoginOpen, setIsSnackBarLoginOpen] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [messageSnackBarLogin, setMessageSnackBarLogin] = useState("");

  const onSubmitRegister = (data) => {
    console.log(data);
    toggleDialogRegister();
  };
  const onSubmitLogin = async (data) => {
    console.log(data);
    const dataSend = {
      email: data.email,
      pass: data.password,
    };

    try {
      const response = await axios.post(urlAPI + "login", dataSend);
      console.log(response.data);
      const responseData = response.data;

      if (responseData.success) {
        setMessageSnackBarLogin("Login Berhasil");
        localStorage.setItem("accessToken", responseData.data.access_token);
        setIsLoginSuccess(true);
        setIsSnackBarLoginOpen(true);

        setTimeout(() => {
          navigate("/pilihLokasi", { state: { from: "/login" } });
        }, 1500);
      } else {
        // Handle unsuccessful login
      }
    } catch (error) {
      const errorMssg = error.response.data.message || error.message;
      setMessageSnackBarLogin(errorMssg);
      setIsLoginSuccess(false);
      setIsSnackBarLoginOpen(true);
      console.error("Error:", errorMssg);
    }
  };

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  function togglePasswordRegisterVisibility() {
    setIsPasswordRegisterVisible((prevState) => !prevState);
  }
  function toggleConfirmPasswordRegisterVisibility() {
    setIsConfirmPasswordRegisterVisible((prevState) => !prevState);
  }

  function toggleDialogResetPass() {
    setValueForgetPass("emailresetsandi", "");
    setIsResetPassFilled(false);
    resetForgetPass();
    setIsDialogOpenResetPass((prevState) => !prevState);
    console.log(isDialogOpenResetPass);
  }
  function toggleDialogRegister() {
    resetRegister();
    setIsFormRegisterFilled(false);
    setIsDialogOpenRegister((prevState) => !prevState);
    console.log(isDialogOpenRegister);
    if (isDialogOpenRegister === true) {
      setIsSnackbarRegisterOpen(true);
    }
  }

  function handleFormLoginChange(event) {
    // Check if all forms are filled
    const isFormFilled =
      event.target.form[0].value !== "" && event.target.form[1].value !== "";
    setIsFormFilled(isFormFilled);
  }
  function handleFormRegisterChange(event) {
    // Check if all forms are filled
    const isFormRegisterFilled =
      event.target.form[0].value !== "" &&
      event.target.form[1].value !== "" &&
      event.target.form[3].value !== "";
    setIsFormRegisterFilled(isFormRegisterFilled);
  }
  // function handleTestButtonClick() {
  //   setIsSignaturePadVisible(true);
  // }

  function handleSaveButtonClick() {
    const signatureData = signatureRef.current.toDataURL();
    setSignatureData(signatureData);
    setIsSignaturePadVisible(false);
  }
  function handleClearButtonClick() {
    signatureRef.current.clear();
  }
  function handleClearResultButtonClick() {
    setSignatureData(null);
  }
  function handlePrintButtonClick() {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Get the HTML element that contains the signature image
    const signatureElement = document.getElementById("signature");
    console.log(signatureElement);

    // Use html2canvas to create a canvas from the signature element
    html2canvas(signatureElement).then((canvas) => {
      // Convert the canvas to an image data URL
      const imageData = canvas.toDataURL("image/png");

      // Add the image to the PDF document
      // pdf.addPage(); //tambah halaman kosong
      pdf.addImage(imageData, "PNG", 55, 90, 100, 50);

      // Save the PDF document
      var userAgent = window.navigator.userAgent.toLowerCase();

      if (userAgent.includes("wv")) {
        console.log("viewed in webview");
        var doc = pdf.output("datauristring");

        window.flutter_inappwebview.callHandler("convertToBase64", doc);
      } else if (userAgent.includes("mobile")) {
        console.log("viewed in mobile browser");
        pdf.save("kontrak_persetujuan.pdf");
      } else {
        console.log("viewed in desktop browser");
        pdf.output("dataurlnewwindow");
      }
    });
  }
  function handleResetPassChange(event) {
    setIsResetPassFilled(event.target.value !== "");
  }

  return (
    <>
      <div className="App">
        <section
          className="bg-[#F0F7F5] h-screen dark:bg-gray-900 font-inter flex
        items-center justify-center"
        >
          {isDialogOpenResetPass && (
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
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                  <div className=" px-3 pt-4 pb-2 sm:px-6">
                    <div className="bg-[#F0F7F5] p-2.5  text-center">
                      <p
                        className="text-sm sm:text-lg leading-5 font-bold text-[#28A138]"
                        id="modal-title"
                      >
                        Anda akan menerima email untuk <br />
                        melakukan reset kata sandi.
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-2 justify-between">
                    <div className="text-start pb-2">
                      <h4 className="font-bold leading-6">
                        Masukkan Email Anda
                      </h4>
                    </div>
                    <div>
                      <input
                        placeholder=""
                        {...registerForgetPass("emailresetsandi", {
                          type: "email",
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Format email salah",
                          },
                        })}
                        onChange={handleResetPassChange}
                        className={`input-border pl-2  border text-[#1F2933] sm:text-sm rounded-lg block w-full p-2.5  ${
                          errorsForgetPass.emailresetsandi
                            ? "border-danger-Main bg-danger-Surface"
                            : isResetPassFilled
                            ? "border-neutral-100 bg-neutral-10"
                            : "border-gray-300 bg-neutral-10"
                        }`}
                      />
                      {errorsForgetPass.emailresetsandi && (
                        <p className="text-danger-Main text-xs leading-[14px] pt-2">
                          {errorsForgetPass.emailresetsandi.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-3 pb-4 pt-2 sm:px-6 flex gap-2.5 justify-between">
                    <button
                      disabled={!isResetPassFilled}
                      onClick={handleSubmitForgetPass(toggleDialogResetPass)}
                      type="button"
                      className={` font-bold py-3.5 px-5 w-2/4 rounded-xl ${
                        isResetPassFilled
                          ? "bg-[#28A138] text-white"
                          : "bg-[#F2F3F5] text-[#7B8794]"
                      }`}
                    >
                      Kirim
                    </button>
                    <button
                      onClick={toggleDialogResetPass}
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
          {isDialogOpenRegister && (
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
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                  <div className=" px-3 pt-4 pb-2 sm:px-6">
                    <div className="bg-[#F0F7F5] p-2.5  text-center">
                      <p
                        className="text-sm sm:text-lg leading-5 font-bold text-[#28A138]"
                        id="modal-title"
                      >
                        Anda akan menerima email untuk <br />
                        melakukan verifikasi.
                      </p>
                    </div>
                  </div>
                  <form onChange={handleFormRegisterChange}>
                    <div className="px-3 py-2 justify-between">
                      <div className="text-start pb-2">
                        <h4 className="font-bold leading-6">
                          Masukkan Email Anda
                        </h4>
                      </div>
                      <div>
                        <input
                          placeholder=""
                          {...registerRegister("emailregister", {
                            type: "email",
                            required: true,
                            pattern: {
                              value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "Format email salah",
                            },
                          })}
                          className={`input-border pl-2  border text-[#1F2933] sm:text-sm rounded-lg block w-full p-2.5  ${
                            errorsRegister.emailregister
                              ? "border-danger-Main bg-danger-Surface"
                              : watchRegister("emailregister") !== "" &&
                                watchRegister("emailregister") !== undefined
                              ? "border-neutral-100 bg-neutral-10"
                              : "border-neutral-40 bg-neutral-10"
                          }`}
                        />
                        {errorsRegister.emailregister && (
                          <p className="text-danger-Main text-xs leading-[14px] pt-2">
                            {errorsRegister.emailregister.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="px-3 py-2 justify-between">
                      <div className="text-start pb-2">
                        <h4 className="font-bold leading-6">Password</h4>
                      </div>
                      <div className="relative w-full">
                        <input
                          placeholder=""
                          {...registerRegister("passwordregister", {
                            required: true,
                          })}
                          type={isPasswordRegisterVisible ? "text" : "password"}
                          className={`input-border pl-2 bg-neutral-10 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg block w-full p-2.5  ${
                            isFormRegisterFilled
                              ? "border-neutral-100"
                              : watchRegister("passwordregister") !== "" &&
                                watchRegister("passwordregister") !== undefined
                              ? "border-neutral-100 bg-neutral-10"
                              : "border-neutral-40 bg-neutral-10"
                          }`}
                        />
                        <div>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                            onClick={togglePasswordRegisterVisibility}
                          >
                            <FontAwesomeIcon
                              className="w-5 h-5 text-[#50555B]"
                              icon={
                                isPasswordRegisterVisible
                                  ? "fa-solid fa-eye"
                                  : "fa-solid fa-eye-slash"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-2 justify-between">
                      <div className="text-start pb-2">
                        <h4 className="font-bold leading-6">
                          Konfirmasi Password
                        </h4>
                      </div>
                      <div className="relative w-full">
                        <input
                          placeholder=""
                          {...registerRegister("konfirmasipasswordregister", {
                            required: true,
                            validate: (value) =>
                              value === password ||
                              "Konfirmasi password tidak sama dengan password",
                          })}
                          type={
                            isConfirmPasswordRegisterVisible
                              ? "text"
                              : "password"
                          }
                          className={`input-border pl-2  border text-[#1F2933] sm:text-sm rounded-lg block w-full p-2.5  ${
                            errorsRegister.konfirmasipasswordregister
                              ? "border-danger-Main bg-danger-Surface"
                              : watchRegister("konfirmasipasswordregister") !==
                                  "" &&
                                watchRegister("konfirmasipasswordregister") !==
                                  undefined
                              ? "border-neutral-100 bg-neutral-10"
                              : "border-neutral-40 bg-neutral-10"
                          }`}
                        />

                        <div>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                            onClick={toggleConfirmPasswordRegisterVisibility}
                          >
                            <FontAwesomeIcon
                              className="w-5 h-5 text-[#50555B]"
                              icon={
                                isConfirmPasswordRegisterVisible
                                  ? "fa-solid fa-eye"
                                  : "fa-solid fa-eye-slash"
                              }
                            />
                          </button>
                        </div>
                      </div>
                      {errorsRegister.konfirmasipasswordregister && (
                        <p className="text-danger-Main text-xs leading-[14px] pt-2">
                          {errorsRegister.konfirmasipasswordregister.message}
                        </p>
                      )}
                    </div>
                  </form>
                  <div className="px-3 pb-4 pt-2 sm:px-6 flex gap-2.5 justify-between">
                    <button
                      disabled={!isFormRegisterFilled}
                      onClick={handleSubmitRegister(onSubmitRegister)}
                      type="button"
                      className={` font-bold py-3.5 px-5 w-2/4 rounded-xl ${
                        isFormRegisterFilled
                          ? "bg-[#28A138] text-white"
                          : "bg-[#F2F3F5] text-[#7B8794]"
                      }`}
                    >
                      Kirim
                    </button>
                    <button
                      onClick={toggleDialogRegister}
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
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:pt-10">
            <img className="w-64 auto mb-[52px]" src={logo} alt="logo"></img>
            <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="px-2 py-3.5 space-y-4 md:space-y-2.5">
                <form
                  onChange={handleFormLoginChange}
                  className="space-y-2.5 md:space-y-2.5 font-inter"
                >
                  <div className="w-full block">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon
                          className="w-5 h-5 text-[#50555B]"
                          icon="fa-regular fa-envelope"
                        />
                      </div>
                      <input
                        placeholder="Email"
                        autoComplete="email"
                        {...registerLogin("email", {
                          type: "email",
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Format email salah",
                          },
                        })}
                        className={`input-border pl-10 bg-neutral-10 border ${
                          errorsLogin.email
                            ? "border-danger-Main bg-danger-Surface"
                            : watchLogin("email") !== "" &&
                              watchLogin("email") !== undefined
                            ? "border-neutral-100"
                            : "border-neutral-40"
                        }  text-[#101C42] placeholder:text-[#6E7377] sm:text-sm rounded-lg block w-full p-2.5 `}
                      />
                    </div>
                    {errorsLogin.email && (
                      <span className="pt-2 text-left w-auto text-xs leading-[14px] text-danger-Main block">
                        Format email salah
                      </span>
                    )}
                  </div>
                  <div className="w-full block">
                    <div className="relative w-full mt-2.5">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon
                          className="w-5 h-5 text-[#50555B]"
                          icon="fa-solid fa-key"
                        />
                      </div>

                      <input
                        {...registerLogin("password", {
                          required: true,

                          maxLength: 20,
                        })}
                        placeholder="Password"
                        autoComplete="current-password"
                        type={isPasswordVisible ? "text" : "password"}
                        className={`input-border px-10 bg-neutral-10 border ${
                          watchLogin("password") !== "" &&
                          watchLogin("password") !== undefined
                            ? "border-neutral-100"
                            : "border-neutral-40"
                        } text-[#101C42] placeholder:text-[#6E7377]  sm:text-sm rounded-lg block w-full p-2.5`}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          className="w-5 h-5 text-[#50555B]"
                          icon={
                            isPasswordVisible
                              ? "fa-solid fa-eye"
                              : "fa-solid fa-eye-slash"
                          }
                        />
                      </button>
                    </div>{" "}
                    {errorsLogin.password && (
                      <span className="pt-2 text-left w-auto text-xs leading-[14px] text-danger-Main block">
                        Password harus terisi
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`${
                      isFormFilled
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-[#F2F3F5] text-[#7B8794]"
                    } w-full  hover:bg-none focus:outline-none focus:ring-none font-[700] rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    onClick={handleSubmitLogin(onSubmitLogin)}
                  >
                    Login
                  </button>
                  <p className="text-sm font-light text-[#1EBF65] dark:text-gray-400 justify-center flex">
                    <button
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      onClick={(event) => {
                        event.preventDefault();
                        toggleDialogResetPass();
                      }}
                      type="button"
                    >
                      {"Lupa Password"}
                    </button>
                  </p>
                </form>
              </div>
            </div>{" "}
            <p className="text-sm font-normal  text-[#1EBF65] dark:text-gray-400 py-14">
              {"Tidak Punya Akun? "}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  toggleDialogRegister();
                }}
                className="font-bold hover:underline dark:text-primary-500"
                type="button"
              >
                {" Daftar Disini"}
              </button>
            </p>
            {/**
           <button
              type="submit"
              className="bg-[#36393f] text-[#7B8794] w-full sm:max-w-md  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-[700] rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={handleTestButtonClick}
            >
              {"test"}
            </button>
           */}
            {signatureData && (
              <div className="my-5 border-gray-700 bordert-solid border-2 rounded">
                <img src={signatureData} alt="signature" id="signature" />
              </div>
            )}
            {signatureData && (
              <div>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 mx-2 px-4 rounded"
                  onClick={handleClearResultButtonClick}
                >
                  Clear
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 mx-2 px-4 rounded"
                  onClick={handlePrintButtonClick}
                >
                  Print
                </button>
              </div>
            )}
          </div>
        </section>
        {isSignaturePadVisible && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
            onClick={() => setIsSignaturePadVisible(false)}
          >
            <div
              className="bg-white p-4 rounded-lg shadow-lg sm:max-w-md mx-auto my-4 sm:my-8 sm:mx-8 sm:w-full w-[450px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-2 border-gray-500 border-solid mb-4 rounded">
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="black"
                  canvasProps={{
                    width: 414,
                    height: 200,
                    className: "sigCanvas",
                  }}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                onClick={handleSaveButtonClick}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 mx-2 px-4 rounded"
                onClick={handleClearButtonClick}
              >
                clear
              </button>
            </div>
          </div>
        )}
      </div>
      <Snackbar
        open={isSnackbarRegisterOpen}
        onClose={() => setIsSnackbarRegisterOpen(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div
          className={`rounded-full border mt-12  text-sm px-[8px] py-[7px] ${
            isRegisterSuccess
              ? "bg-success-Surface border-success-Pressed text-success-Main"
              : "bg-danger-Surface border-danger-Pressed text-danger-Main"
          }`}
        >
          {isRegisterSuccess ? "Pendaftaran Berhasil" : "Pendaftaran Gagal"}
        </div>
      </Snackbar>
      <Snackbar
        open={isSnackBarLoginOpen}
        onClose={() => setIsSnackBarLoginOpen(false)}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div
          className={`rounded-full border mt-12  text-sm px-[8px] py-[7px] ${
            isLoginSuccess
              ? "bg-success-Surface border-success-Pressed text-success-Main"
              : "bg-danger-Surface border-danger-Pressed text-danger-Main"
          }`}
        >
          {messageSnackBarLogin}
        </div>
      </Snackbar>
    </>
  );
};

export default Login;
