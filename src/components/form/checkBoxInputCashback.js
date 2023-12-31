import { Checkbox, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";

/**
 * @description
 * @author Henry
 * @date 07/12/2023 - 9:01:15 AM
 * @param {*} {
 *   SetisChecked,
 *   textboxValue,
 *   setTextboxValue,
 *   enabled,
 * }
 * @return {*}
 */
const CheckBoxInputCashback = ({
  SetisChecked,
  textboxValue,
  setTextboxValue,
  enabled,
}) => {
  const isEnabled = enabled ?? true;
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(
    SetisChecked ?? false
  );

  return (
    <Stack gap="20px" className="font-inter">
      {/* Your component code here */}
      <Stack direction="row" alignItems="center" gap="10px">
        <Checkbox
          checked={isCheckBoxChecked}
          disabled={!isEnabled}
          onChange={(e) => {
            const newCheckedState = !isCheckBoxChecked;
            setIsCheckBoxChecked(newCheckedState);
            if (!newCheckedState) {
              setTextboxValue("");
            }
          }}
          sx={{
            paddingY: "0px",
            "&.Mui-checked": {
              color: "transparent",
            },
            "&.MuiCheckbox-root": {
              color: "green",
            },
          }}
        />
        <p className="font-normal text-sm leading-[18px] text-black">
          Cashback
        </p>
      </Stack>
      <Stack gap="8px">
        <Stack direction="row" gap={"2px"}>
          <span className="text-neutral-100 text-base font-bold">
            {"Alasan Cashback"}
          </span>
        </Stack>
        <textarea
          disabled={isEnabled ? !isCheckBoxChecked : true}
          rows="4"
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
          className="border border-neutral-40 rounded-lg focus:border-neutral-100 px-4 py-2"
          placeholder="Enter your reason here"
          style={{ resize: "none" }}
        />
      </Stack>
    </Stack>
  );
};

export default CheckBoxInputCashback;
