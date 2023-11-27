/**
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 * @description Global function untuk menyimpan semua fungsi yang digunakan di banyak komponen.
 * **/

/**
 * @description Mengembalikan nama kelas CSS untuk warna ikon & teks berdasarkan status.
 * @param {string} status - Nama Status item.
 * @returns {string} - Nama kelas Tailwind CSS untuk warna ikon & teks.
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 */
const getTextIconColor = (status) => {
  switch (status) {
    case "Aktif":
    case "Perpanjang":
      return "text-success-Main";
    case "Batal":
      return "text-danger-Main";
    case "Tebus":
      return "text-warning-Main";
    case "Lelang":
      return "text-lelang-Main";
    case "Jual":
      return "text-primary-Main";
    default:
      return "text-neutral-500";
  }
};

/**
 * @description Mengembalikan nama kelas CSS untuk warna latar belakang berdasarkan status.
 * @param {string} status - Nama Status item.
 * @returns {string} - Nama kelas Tailwind CSS untuk warna latar belakang.
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 */
const getDateColor = (status) => {
  switch (status) {
    case "Aktif":
    case "Perpanjang":
      return "bg-success-Surface";
    case "Batal":
      return "bg-danger-Surface";
    case "Tebus":
      return "bg-warning-Surface";
    case "Lelang":
      return "bg-lelang-Surface";
    case "Jual":
      return "bg-primary-Surface";
    default:
      return "bg-neutral-100";
  }
};

/**
 * @description Mengembalikan nama kelas CSS untuk warna border atas berdasarkan status.
 * @param {string} status - Nama Status item.
 * @returns {string} - Nama kelas Tailwind CSS untuk warna border atas.
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 */
const getCardBorderColor = (status) => {
  switch (status) {
    case "Aktif":
      return "border-t-success-Main";
    case "Batal":
      return "border-t-danger-Main";
    case "Tebus":
      return "border-t-warning-Main";
    case "Lelang":
      return "border-t-lelang-Main";
    case "Jual":
      return "border-t-primary-Main";
    default:
      return "border-none";
  }
};

/**
 * @description Mengembalikan nilai CSS untuk gradient warna latar belakang kartu berdasarkan status.
 * @param {string} status - Nama Status item.
 * @returns {string} - Nilai CSS untuk gradient warna latar belakang kartu.
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 */
const getCardGradientColor = (status) => {
  switch (status) {
    case "Aktif":
    case "Perpanjang":
      return "linear-gradient(88.36deg, rgba(30, 191, 101, 0.5) -5.28%, rgba(30, 191, 101, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
    case "Batal":
      return "linear-gradient(88.36deg, rgba(210, 28, 28, 0.5) -5.28%, rgba(210, 28, 28, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
    case "Tebus":
      return "linear-gradient(88.36deg, rgba(233, 131, 5, 0.5) -5.28%, rgba(233, 131, 5, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
    case "Lelang":
      return "linear-gradient(88.36deg, rgba(178, 103, 255, 0.5) -5.28%, rgba(178, 103, 255, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF);";
    case "Jual":
      return "linear-gradient(88.36deg, rgba(0, 169, 209, 0.5) -5.28%, rgba(0, 169, 209, 0) 10.98%),linear-gradient(0deg, #FFFFFF, #FFFFFF); ";
    default:
      return "border-none";
  }
};

/**
 * @description Mengembalikan nama kelas CSS untuk warna border pada chips berdasarkan status.
 * @param {string} status - Nama Status item.
 * @returns {string} - Nama kelas Tailwind CSS untuk warna border.
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 */
const getChipsBorderColor = (status) => {
  switch (status) {
    case "Aktif":
    case "Perpanjang":
      return "border-success-Main";
    case "Batal":
      return "border-danger-Main";
    case "Tebus":
      return "border-warning-Main";
    case "Lelang":
      return "border-lelang-Main";
    case "Jual":
      return "border-primary-Main";
    default:
      return "border-neutral-100";
  }
};

/**
 * @description Memisahkan ribuan pada harga dengan tanda titik sebagai pemisah.
 * @param {number} harga - Harga yang akan dipisahkan ribuannya.
 * @returns {string} - Harga dengan ribuan dipisahkan oleh tanda titik.
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 */
const pemisahRibuan = (harga) => {
  return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * @description Menghitung jumlah bunga berdasarkan harga dan persentase bunga.
 * @param {number} harga - Harga barang yang digadaikan.
 * @param {number} bunga - Persentase bunga yang dikenakan.
 * @returns {number} - Jumlah bunga hasil gadai.
 * @date 24/11/2023 - 3:13:08 PM
 * @author Henry
 */
const hitungBunga = (harga, bunga) => {
  const bunga1 = parseInt(bunga);
  const harga1 = parseInt(harga);
  const hitung = Math.round(harga1 * (bunga1 / 100));
  return hitung;
};

/**
 * @description Fungsi untuk menghasilkan data gadai acak dan memasukan data tersebut dalam Array.
 * @author Henry
 * @date 27/11/2023 - 9:22:08 AM
 * @returns {Object} Objek yang berisi data gadai acak dan memasukan data tersebut dalam Array.
 */
function generateRandomDataGadai(designatedFor, jumlah) {
  /**
   * @description  Fungsi yang meng-Generate data random yang akan di masukan kedalam Array.
   * @returns {Object} Objek yang di-Generate data random yang akan di masukan kedalam Array.
   */
  function getDataRandom() {
    /**
     * @description Fungsi untuk menghasilkan bilangan bulat acak antara min dan max.
     * @param {number} min - Nilai minimum.
     * @param {number} max - Nilai maksimum.
     * @returns {number} Bilangan bulat acak antara min dan max.
     */
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @description Fungsi untuk menghasilkan bilangan bulat acak yang dibulatkan ke ribuan terdekat antara min dan max.
     * @param {number} min - Nilai minimum.
     * @param {number} max - Nilai maksimum.
     * @returns {number} Bilangan bulat acak yang dibulatkan ke ribuan terdekat antara min dan max.
     */
    function getRandomIntRounded(min, max) {
      min = Math.ceil(min / 100000);
      max = Math.floor(max / 100000);
      return Math.floor(Math.random() * (max - min + 1) + min) * 100000;
    }

    /**
     * @description Fungsi untuk menambahkan jumlah hari ke tanggal yang diberikan.
     * @param {Date} date - Tanggal awal.
     * @param {number} days - Jumlah hari yang akan ditambahkan.
     * @returns {Date} Tanggal setelah ditambahkan dengan jumlah hari.
     */
    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }

    /**
     * @description Fungsi untuk memformat tanggal menjadi format "dd/mm/yyyy".
     * @param {Date} date - Tanggal yang akan diformat.
     * @returns {string} Tanggal dalam format "dd/mm/yyyy".
     */
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      const year = date.getFullYear();

      return day + "/" + month + "/" + year;
    }

    const getStatuses = () => {
      if (designatedFor === null || designatedFor === undefined) {
        return ["Aktif", "Batal", "Tebus", "Lelang", "Jual"];
      } else if (designatedFor === "Perpanjangan") {
        return ["Batal", "Aktif"];
      } else if (designatedFor === "Tebus") {
        return ["Batal", "Tebus"];
      }
    };
    const statuses = getStatuses();
    const periodes = ["7 Hari", "1 Bulan", "6 Bulan", "1 Tahun", "2 Tahun"];
    const tglkredit = new Date(2023, 6, 24); // 24/07/2023
    const periodegadai = periodes[getRandomInt(0, periodes.length - 1)];
    let periodeInDays;

    if (periodegadai.includes("Hari")) {
      periodeInDays = parseInt(periodegadai.split(" ")[0]);
    } else if (periodegadai.includes("Bulan")) {
      periodeInDays = parseInt(periodegadai.split(" ")[0]) * 30;
    } else if (periodegadai.includes("Tahun")) {
      periodeInDays = parseInt(periodegadai.split(" ")[0]) * 365;
    }

    const tgljatuhtempo = addDays(new Date(tglkredit), periodeInDays);

    return {
      idtransaksi: "CGX" + getRandomInt(100000, 999999),
      lokasi: "KDC",
      nama: "Mas Bagas Purnomo Ajeng Kartini Salendra Muh",
      notelp: 6283856236436,
      status: statuses[getRandomInt(0, statuses.length - 1)],
      barang: "Sepeda Motor Honda Astrea 800",
      harga: getRandomIntRounded(1000000, 5000000),
      bunga: getRandomInt(5, 35) + "%",
      periodegadai: periodegadai,
      tglkredit: formatDate(tglkredit),
      tgljatuhtempo: formatDate(tgljatuhtempo),
    };
  }
  return Array.from({ length: jumlah }, getDataRandom);
}

export {
  getDateColor,
  getTextIconColor,
  getCardBorderColor,
  getCardGradientColor,
  getChipsBorderColor,
  pemisahRibuan,
  hitungBunga,
  generateRandomDataGadai,
};
