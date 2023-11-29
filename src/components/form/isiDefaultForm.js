import { Icon } from "@iconify/react";
import { Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * @description Komponen untuk menampilkan dan mengelola isi dari sebuah formulir. Jika tipe input adalah 'button', maka akan menampilkan input dengan ikon dropdown dan fungsi navigasi ketika diklik.
 * @author Henry
 * @date 29/11/2023 - 11:30:59 AM
 * @param {string} title Judul dari bagian formulir
 * @param {string} type Tipe data yang diharapkan dari input formulir
 * @param {boolean} isRequired Menentukan apakah input formulir wajib diisi
 * @param {string} valueForm - isi dari input yang sesuai dengan data pelanggan
 * @param {boolean} enabled - Menentukan apakah input formulir dapat diubah
 * @return {*} Komponen React yang menampilkan bagian isi dari formulir
 */
const IsiFormDefault = ({ title, type, isRequired, valueForm, enabled }) => {
  const navigate = useNavigate();

  const handlePilihCustomer = () => {
    navigate("/pilihPelanggan");
  };
  return (
    <>
      <Stack gap="8px">
        <Stack direction="row" gap={"2px"}>
          <span className="text-neutral-100 text-base font-bold">{title}</span>
          {isRequired && (
            <span className="text-danger-Main text-lg font-bold">*</span>
          )}
        </Stack>
        {type === "button" ? (
          <div className="relative" onClick={handlePilihCustomer}>
            <input
              type={"text"}
              value={valueForm}
              className={`w-full rounded-md border p-[11px]  focus:outline-none pr-10 ${
                valueForm !== "" && valueForm !== undefined
                  ? "border-neutral-100"
                  : "border-neutral-40"
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {valueForm === "" ||
                (valueForm === undefined && (
                  <Icon className="text-gray-500" icon="feather:chevron-down" />
                ))}
            </div>
          </div>
        ) : (
          <input
            type={type || "text"}
            disabled={enabled ? !enabled : true}
            value={valueForm}
            className={`w-full  rounded-md border p-[11px] ${
              !enabled
                ? "border-neutral-40 bg-neutral-20 text-neutral-60"
                : valueForm !== "" && valueForm !== undefined
                ? "border-neutral-100"
                : "border-neutral-40"
            } focus:outline-none`}
          />
        )}
      </Stack>
    </>
  );
};

export default IsiFormDefault;
