import React from "react";
import AppBarPlain from "../../components/appBarPlain";
import ProgressIndicatorForm from "../../components/form/progressIndicatorForm";
import { Button, Paper, Stack } from "@mui/material";
import IsiForm from "../../components/form/isiForm";

const FormGadai = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-start  font-inter">
      <AppBarPlain placeholder={"Tambah Gadai"} />
      <ProgressIndicatorForm />
      <div className="bg-white px-4 pt-5 w-screen shadow">
        <Stack gap={"20px"}>
          <IsiForm title={"Telpon"}></IsiForm>
          <IsiForm title={"Alamat Sesuai KTP"}></IsiForm>
          <IsiForm title={"No. Identitas Sesuai KTP"}></IsiForm>
        </Stack>
      </div>
      <Paper
        className="w-full px-4 py-3"
        sx={{
          position: "fixed",
          bottom: "0px",
          left: 0,
          right: 0,

          borderRadius: "0px",
        }}
        elevation={5}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "8px",
            color: "neutral.10",
            width: "100%",
            paddingY: "10px",
            fontWeight: 500,
            fontSize: "15px",
          }}
          className={`${"bg-neutral-30 text-neutral-70"}`}
        >
          Simpan
        </Button>
      </Paper>
    </div>
  );
};

export default FormGadai;
