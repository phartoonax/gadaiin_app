import React from "react";
import BotNavbarNfab from "../../components/botnavbarnfab";
import AppBarWithSearch from "../../components/appbarwsearch";
import ListItem from "../../components/listitem";

function ListGadai() {
  const mockArray = [
    { id: 1, name: "Item 1", description: "This is item 1" },
    { id: 2, name: "Item 2", description: "This is item 2" },
    { id: 3, name: "Item 3", description: "This is item 3" },
  ];
  const arrayisi = [
    {
      idtransaksi: "CGX240795",
      lokasi: "KDC",
      nama: "Mas Bagas Purnomo Ajeng Kartini Salendra Muh",
      notelp: 6283856236436,
      status: "gadai",
      barang: "Sepeda Motor Honda Astrea 800",
      harga: 2000000,
      bunga: "10%",
      periodegadai: "1 Bulan",
      tglkredit: "24/07/2023",
      tgljatuhtempo: "24/08/2023",
    },
    {
      idtransaksi: "CGX240795",
      lokasi: "KDC",
      nama: "Mas Bagas Purnomo Ajeng Kartini Salendra Muh",
      notelp: 6283856236436,
      status: "batal",
      barang: "Sepeda Motor Honda Astrea 800",
      harga: 2000000,
      bunga: "10%",
      periodegadai: "1 Bulan",
      tglkredit: "24/07/2023",
      tgljatuhtempo: "24/08/2023",
    },
    {
      idtransaksi: "CGX240795",
      lokasi: "KDC",
      nama: "Mas Bagas Purnomo Ajeng Kartini Salendra Muh",
      notelp: 6283856236436,
      status: "lunas",
      barang: "Sepeda Motor Honda Astrea 800",
      harga: 2000000,
      bunga: "10%",
      periodegadai: "1 Bulan",
      tglkredit: "24/07/2023",
      tgljatuhtempo: "24/08/2023",
    },
    {
      idtransaksi: "CGX240795",
      lokasi: "KDC",
      nama: "Mas Bagas Purnomo Ajeng Kartini Salendra Muh",
      notelp: 6283856236436,
      status: "batal",
      barang: "Sepeda Motor Honda Astrea 800",
      harga: 2000000,
      bunga: "10%",
      periodegadai: "1 Bulan",
      tglkredit: "24/07/2023",
      tgljatuhtempo: "24/08/2023",
    },
  ];
  const stringArray = mockArray.map((item) => item.name);

  function handleClick(item) {
    console.log(`You clicked on ${item}`);
  }

  return (
    <>
      <div className="font-inter">
        <AppBarWithSearch />

        <BotNavbarNfab
          title={"tempe"}
          items={stringArray}
          onClick={handleClick}
        />
        <div className="mx-4">
          {arrayisi.map((data, index) => (
            <div className={`${index === arrayisi.length - 1 ? "pb-24" : ""}`}>
              <ListItem data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListGadai;
