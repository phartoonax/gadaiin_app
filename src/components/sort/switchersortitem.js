import { Icon } from "@iconify/react";
import { IconButton, Stack } from "@mui/material";
import React from "react";

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
        statusSort[name] = newState[name] || 0;
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
            icon="heroicons-outline:switch-vertical"
          ></Icon>
        );
      case 1:
        return (
          <Icon
            className="text-success-Main"
            icon="heroicons-outline:arrow-narrow-up"
          ></Icon>
        );
      case 2:
        return (
          <Icon
            className="text-success-Main"
            icon="heroicons-outline:arrow-narrow-down"
          ></Icon>
        );
    }
  };

  return (
    <>
      <Stack gap={"10px"}>
        {isiSortItem.map((name) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            className="flex"
          >
            <div className="text-sm text-[15px] font-bold">{name}</div>

            <IconButton onClick={() => handleButtonClick(name)}>
              {getIcon(name)}
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default SwitcherSortItem;
