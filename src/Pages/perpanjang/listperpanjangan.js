import React from "react";
import BotNavbarNfab from "../../components/botnavbarnfab";
import AppBarWithSearch from "../../components/appbarwsearch";
import { useNavigate } from "react-router-dom";

const ListPerpanjangan = () => {
  const navigate = useNavigate();

  const iconKiri = "heroicons-outline:adjustments";
  const iconKanan = "heroicons-outline:switch-vertical";
  const iconFab = "uil:qrcode-scan";

  const onFabClick = () => {
    navigate("/main/qrscanner");
  };

  return (
    <>
      <div className="font-inter">
        <AppBarWithSearch placeholder={"Cari Data Perpanjangan Gadai"} />

        <BotNavbarNfab
          iconKiri={iconKiri}
          iconKanan={iconKanan}
          iconFab={iconFab}
          onFabClick={onFabClick}
        />
      </div>
    </>
  );
};

export default ListPerpanjangan;
