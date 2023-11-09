import React, { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/login/login";
import Dashboard from "./Pages/dashboard/dashboard";

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
      </Routes>
    </>
  );
};

export default Rute;
