import React, { useEffect, useState } from "react";
import AppBarWithSearch from "../../components/appBarWithSearch";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { urlAPI } from "../../variableGlobal";
import {
  Button,
  Dialog,
  DialogContentText,
  Divider,
  Stack,
} from "@mui/material";

function PilihLokasi() {
  const navigate = useNavigate();
  const location = useLocation();
  const calledFrom = location.state?.calledFrom || -1;

  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          access_token: localStorage.getItem("accessToken"),
        };
        const response = await axios.post(
          urlAPI + "pilih-lokasi",
          {},
          { headers }
        );
        const dataLokasinonEmpty = response.data.data.filter(
          (item) => item.namalokasi !== ""
        );
        setData(dataLokasinonEmpty);
        setDisplayData(dataLokasinonEmpty);
      } catch (error) {
        const errorMssg = error.response?.data?.message || error.message;
        console.error("Error:", errorMssg);
      }
    };

    fetchData();
  }, []);

  const [selectedData, setSelectedData] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handlerBackButton() {
    navigate(calledFrom, { replace: true });
  }
  function handlerPilihLokasi(index) {
    setSelectedData(displayData[index]);
    setIsDialogOpen(true);
  }
  function handlerCloseDialog() {
    setIsDialogOpen(false);
    setTimeout(() => {
      setSelectedData("");
    }, 500);
  }

  return (
    <>
      <div className=" font-inter">
        <AppBarWithSearch
          handlerBackButton={handlerBackButton}
          placeholder={"Cari Lokasi"}
        />
        <div className="mx-4 mt-[15px]">
          <Stack gap={"15px"}>
            {displayData &&
              displayData.map((item, index) => (
                <div
                  className="font-normal text-sm"
                  onClick={() => handlerPilihLokasi(index)}
                >
                  {item.namalokasi}
                  <Divider
                    variant="fullWidth"
                    className="pt-4 border-b-neutral-70 border-b"
                  ></Divider>
                </div>
              ))}
          </Stack>
        </div>
      </div>
      <Dialog
        open={isDialogOpen}
        onClose={() => handlerCloseDialog()}
        className="rounded-xl"
        PaperProps={{
          sx: {
            width: "100%",
            borderRadius: "8px",
            marginX: "16px",
            paddingY: "16px",
            paddingX: "12px",
          },
        }}
      >
        <DialogContentText className="text-center text-sm font-semibold leading-[18px] text-black ">
          Apakah anda yakin lokasi anda di {selectedData.namalokasi}?
        </DialogContentText>
        <Stack
          direction="row"
          gap={"10px"}
          className="w-full justify-between pt-4"
        >
          <Button
            variant="contained"
            className="text-neutral-10 bg-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold hover:bg-success-Main"
            onClick={() => {
              const lokasi = {
                uuidLokasi: selectedData.uuidlokasi,
                namaLokasi: selectedData.namalokasi,
              };
              localStorage.setItem("lokasi", JSON.stringify(lokasi));
              navigate("/main", { replace: true });
            }}
          >
            Ya
          </Button>
          <Button
            variant="outlined"
            className="text-success-Main border-success-Main hover:border-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold"
            onClick={() => {
              handlerCloseDialog();
            }}
          >
            Tidak
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}

export default PilihLokasi;
