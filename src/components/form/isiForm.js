import { Stack } from "@mui/material";
import React from "react";

const IsiForm = ({ title, type, isRequired }) => {
  return (
    <Stack gap="8px">
      <Stack direction="row" gap={"2px"}>
        <span className="text-neutral-100 text-lg font-bold">{title}</span>
        {isRequired && (
          <span className="text-danger-Main text-lg font-bold">*</span>
        )}
      </Stack>
      <input
        type={type || "text"}
        className="w-full  rounded-md border p-[11px] border-neutral-40 focus:outline-none"
      />
    </Stack>
  );
};

export default IsiForm;
