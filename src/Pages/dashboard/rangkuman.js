import { Card, CardHeader, CardContent } from "@mui/material";

const Rangkuman = (props) => {
  return (
    <>
      <div className="block font-inter">
        <Card
          sx={{
            mx: "16px",
            height: "132px",
            mb: "8px",
            background:
              "linear-gradient(88.36deg, rgba(30, 191, 101, 0.5) -5.28%, rgba(30, 191, 101, 0) 10.98%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
          }}
        >
          <CardHeader
            titleTypographyProps={{
              fontFamily: "Inter,sans-serif",
              fontWeight: 600,
            }}
            title="Gadai Aktif"
          />
        </Card>
        <Card
          sx={{
            m: "16px",
            height: "132px",
            background:
              "linear-gradient(88.36deg, rgba(233, 131, 5, 0.5) -5.28%, rgba(233, 131, 5, 0) 10.98%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
          }}
        ></Card>
        <Card
          sx={{
            m: "16px",
            height: "132px",
            background:
              "linear-gradient(88.36deg, rgba(178, 103, 255, 0.5) -5.28%, rgba(178, 103, 255, 0) 10.98%),        linear-gradient(0deg, #FFFFFF, #FFFFFF)",
          }}
        ></Card>
      </div>
    </>
  );
};
export default Rangkuman;
