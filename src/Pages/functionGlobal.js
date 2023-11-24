const getIconColor = (status) => {
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

export {
  getDateColor,
  getIconColor,
  getCardBorderColor,
  getCardGradientColor,
  getChipsBorderColor,
};
