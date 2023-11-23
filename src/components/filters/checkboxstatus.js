import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import React from "react";

const CheckboxStatus = ({
  title,
  arrayCheckBox,
  checkBoxValues,
  checkBoxHandler,
}) => {
  return (
    <>
      <Stack gap={"10px"}>
        <div className="text-sm text-[15px] font-bold">{title}</div>

        <FormGroup>
          {arrayCheckBox.map((name) => (
            <FormControlLabel
              key={name}
              label={name}
              labelPlacement="start"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "0px",
              }}
              control={
                <Checkbox
                  name={name}
                  checked={checkBoxValues.includes(name)}
                  onChange={checkBoxHandler}
                  sx={{
                    "&.Mui-checked": {
                      color: "transparent",
                    },
                    "&.MuiCheckbox-root": {
                      color: "green",
                    },
                  }}
                />
              }

              // other props
            />
          ))}
        </FormGroup>
      </Stack>
    </>
  );
};

export default CheckboxStatus;
