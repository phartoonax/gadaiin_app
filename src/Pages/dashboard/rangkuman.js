import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { pemisahRibuan } from "../../functionGlobal";

const Rangkuman = (dataRangkuman) => {
  const data = dataRangkuman;
  if (!data.dataRangkuman) {
    return (
      <div className="flex items-center justify-center h-full pt-36">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <>
        <div className="block font-inter">
          <Card
            sx={{
              mx: "16px",
              height: "132px",
              mb: "8px",
              boxShadow: "0px 4px 6px 0px #00000008",
              background:
                "linear-gradient(88.36deg, rgba(30, 191, 101, 0.5) -5.28%, rgba(30, 191, 101, 0) 10.98%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            }}
          >
            <CardHeader
              titleTypographyProps={{
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "18px",
              }}
              sx={{
                pb: "12px",
              }}
              title="Gadai Aktif"
              avatar={
                <Icon
                  icon="heroicons-solid:cash"
                  height={"24px"}
                  width={"24px"}
                  className="text-success-Main"
                />
              }
            />
            <Divider variant="middle" />
            <CardContent
              sx={{
                pt: "12px",
                px: "16px",
                display: "block",

                "&:last-child": { paddingBottom: "16px" },
                height: "max-content",
              }}
            >
              <h4 className="font-bold text-xl text-neutral-100">
                {"Rp " +
                  pemisahRibuan(data.dataRangkuman.gadaiaktif.nilai ?? 0)}
              </h4>
              <div className="h-1"></div>
              <p className="font-bold text-[12px] leading-5 tracking-wide">
                {data.dataRangkuman.gadaiaktif.jmltrans ?? 0}
                <span className="text-neutral-70"> transaksi</span>
              </p>
            </CardContent>
          </Card>
          <Card
            sx={{
              m: "16px",
              height: "132px",
              boxShadow: "0px 4px 6px 0px #00000008",
              background:
                "linear-gradient(88.36deg, rgba(233, 131, 5, 0.5) -5.28%, rgba(233, 131, 5, 0) 10.98%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            }}
          >
            <CardHeader
              titleTypographyProps={{
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "18px",
              }}
              sx={{
                pb: "12px",
              }}
              title="Gadai Jatuh Tempo"
              avatar={
                <Icon
                  icon="heroicons-solid:cash"
                  height={"24px"}
                  width={"24px"}
                  className="text-warning-Main"
                />
              }
            />
            <Divider variant="middle" />
            <CardContent
              sx={{
                pt: "12px",
                px: "16px",
                display: "block",

                "&:last-child": { paddingBottom: "16px" },
                height: "max-content",
              }}
            >
              <h4 className="font-bold text-xl text-neutral-100">
                {"Rp " +
                  pemisahRibuan(data.dataRangkuman.gadaijatuhtempo.nilai ?? 0)}
              </h4>
              <div className="h-1"></div>
              <p className="font-bold text-[12px] leading-5 tracking-wide">
                {data.dataRangkuman.gadaijatuhtempo.jmltrans ?? 0}
                <span className="text-neutral-70"> transaksi</span>
              </p>
            </CardContent>
          </Card>
          <Card
            sx={{
              m: "16px",
              height: "132px",
              boxShadow: "0px 4px 6px 0px #00000008",
              background:
                "linear-gradient(88.36deg, rgba(178, 103, 255, 0.5) -5.28%, rgba(178, 103, 255, 0) 10.98%),        linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            }}
          >
            <CardHeader
              titleTypographyProps={{
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "18px",
              }}
              sx={{
                pb: "12px",
              }}
              title="Gadai Lelang Belum Terjual"
              avatar={
                <Icon
                  icon="heroicons-solid:cash"
                  height={"24px"}
                  width={"24px"}
                  className="text-lelang"
                />
              }
            />
            <Divider variant="middle" />
            <CardContent
              sx={{
                pt: "12px",
                px: "16px",
                display: "block",

                "&:last-child": { paddingBottom: "16px" },
                height: "max-content",
              }}
            >
              <h4 className="font-bold text-xl text-neutral-100">
                {"Rp " + pemisahRibuan(data.dataRangkuman.lelang.nilai ?? 0)}
              </h4>
              <div className="h-1"></div>
              <p className="font-bold text-[12px] leading-5 tracking-wide">
                {data.dataRangkuman.lelang.jmltrans ?? 0}
                <span className="text-neutral-70"> transaksi</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
};
export default Rangkuman;
