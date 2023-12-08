import React, { useState } from "react";
import AppBarWithSearch from "../../components/appBarWithSearch";
import {
  Divider,
  IconButton,
  Stack,
  Dialog,
  DialogContentText,
  DialogContent,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import ItemCustomerForm from "../../components/form/itemCustomerForm";
import IsiFormDefault from "../../components/form/isiDefaultForm";
import { useNavigate } from "react-router-dom";
import { generateRandomDataCustomer } from "../../functionGlobal";

/**
 * @description
 * @author Henry
 * @date 28/11/2023 - 12:00:48 PM
 * @return {*}
 */

const FormPilihPelanggan = () => {
  const generatedArray = generateRandomDataCustomer(6);
  const [displayedArray, setDisplayedArray] = useState(generatedArray); //setDisplayed will be used in search

  const [pickedCustomer, setPickedCustomer] = useState(null);

  const navigate = useNavigate();
  //Untuk buka Customer Baru
  const [isDialogOpenNewCustomerPass, setIsDialogOpenNewCustomerPass] =
    useState(false);
  const [isInputNewCustomerFilled, setIsInputNewCustomerFilled] =
    useState(false);

  //Untuk buka konfirmasi pemilihan Customer
  const [isDialogOpenConfirmCustomerPass, setIsDialogOpenConfirmCustomerPass] =
    useState(false);

  function handleOpenDialogConfirmCustomerPass(dataCustomer) {
    setPickedCustomer(dataCustomer);
    setIsDialogOpenConfirmCustomerPass(true);
  }

  function handlerBackButton() {
    navigate("/form/gadai/pelanggan", { replace: true });
  }

  function handlePickCustomer() {
    setIsDialogOpenConfirmCustomerPass(false);
    const data =
      "https://placehold.co/290x290?text=Hello+" +
      pickedCustomer?.name.split(" ")[0];
    localStorage.setItem(
      "savedImage-" + pickedCustomer?.noCustomer,
      JSON.stringify(data)
    );
    navigate("/form/gadai/pelanggan", {
      state: { dataPelanggan: pickedCustomer },
      replace: true,
    });
  }

  return (
    <div className=" font-inter">
      <AppBarWithSearch
        handlerBackButton={handlerBackButton}
        placeholder={"Cari Nama Pelanggan"}
      />

      <Stack
        className="px-4 pt-4 w-full"
        divider={
          <Divider
            variant="fullWidth"
            className="border-neutral-100"
            sx={{
              marginY: "15px",
              borderBottomWidth: "1px",
            }}
          />
        }
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          onClick={() => setIsDialogOpenNewCustomerPass(true)}
        >
          <p>Buat Nama Pelanggan Baru</p>
          <IconButton>
            <Icon
              fontSize={"22px"}
              className="text-neutral-100"
              icon={"fa6-solid:square-plus"}
            ></Icon>
          </IconButton>
        </Stack>
        {displayedArray.map((item, index) => (
          <ItemCustomerForm
            name={item.name}
            phoneNumber={item.phoneNumber}
            noCustomer={item.noCustomer}
            onClickHandler={() => handleOpenDialogConfirmCustomerPass(item)}
          />
        ))}

        <div />
      </Stack>
      <Dialog
        sx={{ borderRadius: "8px" }}
        open={isDialogOpenNewCustomerPass}
        onClose={() => setIsDialogOpenNewCustomerPass(false)}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            marginX: "16px",
            padding: "16px",
            width: "100%",
          },
        }}
      >
        <IsiFormDefault
          title="Nama Pelanggan"
          isRequired={false}
          enabled={true}
          valueFormChange={(e) => {
            const inputValue = e.target.value;
            setIsInputNewCustomerFilled(inputValue.trim() !== "");
          }}
        />

        <Stack
          direction="row"
          gap={"10px"}
          className="w-full justify-between pt-4"
        >
          <Button
            variant="contained"
            disableElevation={isInputNewCustomerFilled ? false : true}
            disabled={isInputNewCustomerFilled ? false : true}
            className={` ${
              isInputNewCustomerFilled
                ? "bg-success-Main text-neutral-10"
                : "bg-neutral-30 text-neutral-70"
            } rounded-xl px-5 py-3.5 w-full text-base font-bold hover:bg-success-Main`}
            onClick={handlePickCustomer}
          >
            Simpan
          </Button>
          <Button
            variant="outlined"
            className="text-success-Main border-success-Main hover:border-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold"
            onClick={() => {
              setIsDialogOpenNewCustomerPass(false);
              setIsInputNewCustomerFilled(false);
            }}
          >
            Kembali
          </Button>
        </Stack>
      </Dialog>

      <Dialog
        sx={{ borderRadius: "8px" }}
        open={isDialogOpenConfirmCustomerPass}
        onClose={() => setIsDialogOpenConfirmCustomerPass(false)}
        PaperProps={{
          sx: { borderRadius: "8px", marginX: "16px", padding: "16px" },
        }}
      >
        <DialogContentText className="text-center text-sm font-semibold leading-[18px] text-neutral-100 pb-4">
          Apakah anda yakin ingin memilih data untuk pelanggan di bawah ini ?
        </DialogContentText>
        <DialogContent className="border border-neutral-100 rounded-lg overflow-hidden p-0 h-[120px] font-sans">
          <Stack direction="row" gap={"10px"}>
            <div className="h-[120px] w-[120px] bg-red-600 rounded-[4px] flex-shrink-0"></div>
            <Stack className="font-normal text-sm leading-[14px] text-black items-start py-[7px] mr-1 w-full overflow-hidden justify-center">
              <p className="font-bold text-sm leading-[18px] w-full overflow-auto overflow-ellipsis max-h-[52px]">
                {pickedCustomer?.name}
              </p>
              <Stack
                className="px-0.5 py-[10px]"
                direction={"row"}
                justifyContent="space-between"
                alignItems={"center"}
                gap={"4px"}
              >
                <Icon icon={"heroicons-outline:phone"} fontSize={"16px"} />
                <p>+{pickedCustomer?.phoneNumber}</p>
              </Stack>
              <Stack
                gap={"4px"}
                className="px-0.5"
                direction={"row"}
                justifyContent="space-between"
                alignItems={"center"}
              >
                <Icon
                  icon={"heroicons-outline:identification"}
                  fontSize={"16px"}
                />
                <p>{pickedCustomer?.noCustomer}</p>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <Stack
          direction="row"
          gap={"10px"}
          className="w-full justify-between pt-4"
        >
          <Button
            variant="contained"
            className="text-neutral-10 bg-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold hover:bg-success-Main"
            onClick={handlePickCustomer}
          >
            Pilih
          </Button>
          <Button
            variant="outlined"
            className="text-success-Main border-success-Main hover:border-success-Main rounded-xl px-5 py-3.5 w-full text-base font-bold"
            onClick={() => {
              setIsDialogOpenConfirmCustomerPass(false);
              setPickedCustomer(null);
            }}
          >
            Kembali
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
};

export default FormPilihPelanggan;
