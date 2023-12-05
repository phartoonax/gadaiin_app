import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import React from "react";

/**
 * @description  Komponen untuk menampilkan checkbox dengan status tertentu.
 * @param {string} title Text Judul komponen
 * @param {array} arrayCheckBox Array berisi nama checkbox
 * @param {array} checkBoxValues Array berisi nilai checkbox yang dipilih
 * @param {function} checkBoxHandler Fungsi untuk menangani perubahan checkbox
 * @param {boolean} needDivider Menentukan apakah perlu menampilkan divider di antara checkbox
 * @returns {*} Komponen checkbox dengan status
 * @author Henry
 * @date 27/11/2023 - 9:49:37 AM
 */
const CheckboxStatus = ({
  title,
  arrayCheckBox,
  checkBoxValues,
  checkBoxHandler,
  needDivider,
}) => {
  return (
    <>
      <Stack gap={"10px"}>
        <div className="text-sm text-[15px] font-bold">{title}</div>

        <FormGroup>
          {arrayCheckBox.map((name, index) => (
            <React.Fragment key={name}>
              <FormControlLabel
                key={name}
                label={name}
                labelPlacement="start"
                sx={{
                  height: needDivider ? "38px" : "30px",
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
              {needDivider && index !== arrayCheckBox.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </FormGroup>
      </Stack>
    </>
  );
};

export default CheckboxStatus;
