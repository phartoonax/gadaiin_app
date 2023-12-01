import React, { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/login/login";
import Dashboard from "./Pages/dashboard/dashboard";
import QRScanner from "./Pages/dashboard/qrScanner";
import Profile from "./Pages/profile/profile";
import CameraProfile from "./Pages/profile/cameraProfile";
import ListGadai from "./Pages/gadai/listGadai";
import ListPerpanjangan from "./Pages/perpanjang/listPerpanjangan";
import ListTebus from "./Pages/tebus/listTebus";
import FormDataPelangganGadai from "./Pages/gadai/formDataPelangganGadai";
import FormDataTransaksiGadai from "./Pages/gadai/formDataTransaksiGadai";
import FormDataPelangganPerpanjang from "./Pages/perpanjang/formDataPelangganPerpanjang";
import FormDataTransaksiPerpanjang from "./Pages/perpanjang/formDataTransaksiPerpanjang";
import FormDataPelangganTebus from "./Pages/tebus/formDataPelangganTebus";
import FormDataTransaksiTebus from "./Pages/tebus/formDataTransaksiTebus";
import FormPilihPelanggan from "./Pages/gadai/formPilihPelanggan";
import PageHistoryGadai from "./components/opsi/pageHistoryGadai";

/**
 * Description placeholder
 * @date 11/7/2023 - 3:13:08 PM
 * @author Michael
 * @description variable untuk menyimpan semua data rute
 * **/
const Rute = (props) => {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/main" element={<Dashboard />} />
        <Route path="/main/qrscanner" element={<QRScanner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/camera" element={<CameraProfile />} />

        <Route path="/list/gadai" element={<ListGadai />} />
        <Route path="/list/perpanjangan" element={<ListPerpanjangan />} />
        <Route path="/list/tebus" element={<ListTebus />} />

        <Route
          path="/form/gadai/pelanggan"
          element={<FormDataPelangganGadai />}
        />
        <Route
          path="/form/gadai/transaksi"
          element={<FormDataTransaksiGadai />}
        />
        <Route
          path="/form/perpanjangan/pelanggan"
          element={<FormDataPelangganPerpanjang />}
        />
        <Route
          path="/form/perpanjangan/transaksi"
          element={<FormDataTransaksiPerpanjang />}
        />
        <Route
          path="/form/tebus/pelanggan"
          element={<FormDataPelangganTebus />}
        />
        <Route
          path="/form/tebus/transaksi"
          element={<FormDataTransaksiTebus />}
        />

        <Route path="/history" element={<PageHistoryGadai />} />

        <Route path="/pilihPelanggan" element={<FormPilihPelanggan />} />
      </Routes>
    </>
  );
};

export default Rute;
