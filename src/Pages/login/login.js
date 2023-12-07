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
console.log(`${browserName} 
${BrowserTypes}`);

library.add(faEnvelope, faKey, faEye, faEyeSlash);

const Login = (props) => {
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    formState: { errors: errors1 },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    // setValue: setValue2,
    formState: { errors: errors2 },
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

  const onSubmit = (data) => {
    console.log(data);
    window.location.href = "/main";
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
    setValue1("emailresetsandi", "");
    setIsResetPassFilled(false);
    setIsDialogOpenResetPass((prevState) => !prevState);
    console.log(isDialogOpenResetPass);
  }
  function toggleDialogRegister() {
    reset2();
    setIsFormRegisterFilled(false);
    setIsDialogOpenRegister((prevState) => !prevState);
    console.log(isDialogOpenRegister);
  }

  function handleFormChange(event) {
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
  function handleTestButtonClick() {
    setIsSignaturePadVisible(true);
  }
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
                        {...register1("emailresetsandi", {
                          type: "email",
                          required: true,
                        })}
                        onChange={handleResetPassChange}
                        className={`pl-2 bg-neutral-10 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                          isResetPassFilled ? "border-black" : "border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="px-3 pb-4 pt-2 sm:px-6 flex gap-2.5 justify-between">
                    <button
                      disabled={!isResetPassFilled}
                      onClick={toggleDialogResetPass}
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
                          {...register2("emailregister", {
                            type: "email",
                            required: true,
                          })}
                          className={`pl-2 bg-neutral-10 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                            isFormRegisterFilled
                              ? "border-black"
                              : "border-gray-300"
                          } ${
                            errors2.emailregister
                              ? "border-[#E53A34] bg-[#FCF3F2]"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors2.emailregister && (
                        <span className="text-[#E53A34] text-xs leading-[14px] font-normal">
                          Format email salah
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-2 justify-between">
                      <div className="text-start pb-2">
                        <h4 className="font-bold leading-6">Password</h4>
                      </div>
                      <div className="relative w-full">
                        <input
                          placeholder=""
                          {...register2("passwordregister", {
                            required: true,
                          })}
                          type={isPasswordRegisterVisible ? "text" : "password"}
                          className={`pl-2 bg-neutral-10 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                            isFormRegisterFilled
                              ? "border-black"
                              : "border-gray-300"
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
                          {...register2("konfirmasipasswordregister", {
                            required: true,
                          })}
                          type={
                            isConfirmPasswordRegisterVisible
                              ? "text"
                              : "password"
                          }
                          className={`pl-2 bg-neutral-10 border border-gray-300 text-[#1F2933] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 ${
                            isFormRegisterFilled
                              ? "border-black"
                              : "border-gray-300"
                          }  ${
                            errors2.konfirmasipasswordregister
                              ? "border-[#E53A34] bg-[#FCF3F2]"
                              : "border-gray-300"
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
                      {errors2.konfirmasipasswordregister && (
                        <span className="text-[#E53A34] text-xs leading-[14px] font-normal">
                          Konfirmasi password tidak sama dengan password
                        </span>
                      )}
                    </div>
                  </form>
                  <div className="px-3 pb-4 pt-2 sm:px-6 flex gap-2.5 justify-between">
                    <button
                      disabled={!isFormRegisterFilled}
                      onClick={handleSubmit2(onSubmit)}
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
                  onChange={handleFormChange}
                  className="space-y-2.5 md:space-y-2.5 font-inter"
                >
                  <div className="w-full block">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {""}
                        <FontAwesomeIcon
                          className="w-5 h-5 text-[#50555B]"
                          icon="fa-regular fa-envelope"
                        />
                        {""}
                      </div>
                      <input
                        placeholder="Email"
                        autoComplete="email"
                        {...register1("email", {
                          type: "email",
                          required: true,
                        })}
                        className={`pl-10 bg-neutral-10 border ${
                          errors1.email ? "border-red-500" : "border-gray-300"
                        }  text-[#101C42] placeholder:text-[#6E7377] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0`}
                      />
                    </div>{" "}
                    {errors1.email && (
                      <span className="pt-2 text-left w-auto text-xs leading-[14px] text-red-500 block">
                        Format email salah
                      </span>
                    )}
                  </div>
                  <div className="w-full block">
                    <div className="relative w-full mt-2.5">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {""}
                        <FontAwesomeIcon
                          className="w-5 h-5 text-[#50555B]"
                          icon="fa-solid fa-key"
                        />
                        {""}
                      </div>

                      <input
                        {...register1("password", {
                          required: true,

                          maxLength: 20,
                        })}
                        placeholder="Password"
                        autoComplete="current-password"
                        type={isPasswordVisible ? "text" : "password"}
                        className="px-10 bg-neutral-10 border border-gray-300 text-[#101C42] placeholder:text-[#6E7377]  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
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
                    {errors1.password && (
                      <span className="pt-2 text-left w-auto text-xs leading-[14px] text-red-500 block">
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
                    } w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-[700] rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    onClick={handleSubmit1(onSubmit)}
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
    </>
  );
};

export default Login;
