import { Icon } from "@iconify/react";
import { Divider, IconButton, Stack } from "@mui/material";
import React from "react";

/**
 * @description Komponen untuk menampilkan switcher yang dapat mengubah urutan item berdasarkan status yang telah ditentukan.
 * @param {function} handleSortStatusChange Fungsi untuk menangani perubahan status sort
 * @param {array} isiSortItem Array berisi nama item yang akan diurutkan
 * @param {array} valueStatusSort Array yang berisi status sort untuk setiap item
 * @returns {*} Switcher yang dapat mengubah urutan item dalam list berdasarkan status yang telah ditentukan
 * @author Henry
 * @date 27/11/2023 - 2:00:00 PM
 */
const SwitcherSortItem = ({
  handleSortStatusChange,
  isiSortItem,
  valueStatusSort,
}) => {
  const handleButtonClick = (name) => {
    handleSortStatusChange((prevState) => {
      const newState = {
        ...prevState,
        [name]: ((prevState[name] || 0) + 1) % 3,
      };

      const statusSort = {};
      isiSortItem.forEach((name) => {
        statusSort[name["keyValue"]] = newState[name["keyValue"]] || 0;
      });

      return newState;
    });
  };

  const getIcon = (name) => {
    switch (valueStatusSort[name]) {
      default:
      case 0:
        return (
          <Icon
            className="text-neutral-90"
            fontSize={"24px"}
            icon="heroicons-outline:switch-vertical"
          ></Icon>
        );
      case 1:
        return (
          <Icon
            className="text-success-Main"
            fontSize={"24px"}
            icon="heroicons-outline:arrow-narrow-up"
          ></Icon>
        );
      case 2:
        return (
          <Icon
            className="text-success-Main"
            fontSize={"24px"}
            icon="heroicons-outline:arrow-narrow-down"
          ></Icon>
        );
    }
  };

  return (
    <>
      <Stack
        gap={"10px"}
        divider={
          <Divider variant="fullWidth" sx={{}} color="#EEEEEE"></Divider>
        }
      >
        {isiSortItem.map((name) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            className="flex"
          >
            <div className="text-sm text-[15px] font-bold">{name["Nama"]}</div>

            <IconButton
              sx={{ padding: "0px" }}
              onClick={() => handleButtonClick(name["keyValue"])}
            >
              {getIcon(name["keyValue"])}
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default SwitcherSortItem;
