import { Stack } from "@mui/material";
import React from "react";

const IsiForm = ({ title }) => {
  return (
    <Stack gap="8px">
      <Stack direction="row" gap={"2px"}>
        <span className="text-neutral-100">{title}</span>
        <span className="text-danger-Main">*</span>
      </Stack>
      <input
        type="text"
        className="w-full  rounded-md border p-4 border-neutral-40 focus:outline-none"
      />
    </Stack>
  );
};

export default IsiForm;
