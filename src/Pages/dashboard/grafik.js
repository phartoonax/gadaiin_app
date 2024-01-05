import { Icon } from "@iconify/react";
import Chart from "react-apexcharts";
import React, { useEffect, useRef, useState } from "react";
import { MonthRangePicker } from "@viniarruda/react-month-range-picker";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import axios from "axios";
import { urlAPI } from "../../variableGlobal";

const Grafik = (props) => {
  const lokasi = JSON.parse(localStorage.getItem("lokasi"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState("Jan 2023");
  const [endDate, setEndDate] = useState("Des 2023");
  const [dataGrafikNilai, setDataGrafikNilai] = useState([]);
  const [dataGrafikTrans, setDataGrafikTrans] = useState([]);
  const [dataXAxis, setDataXAxis] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  const chartRef = useRef(null);

  useEffect(() => {
    (async () => {
      resetDates();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRangeSelect = (params) => {
    //? GET DATE FROM MONTH PICKER -> GET DATA FROM API WITH DATE => SET DATE TO CHART
    getDataGrafik(
      params.startMonth + "/" + params.startYear,
      params.endMonth + "/" + params.endYear
    );

    setDialogOpen(false);
  };

  const handleChartChange = (param, dataGrafikFull) => {
    const getMonth = (month) => {
      // eslint-disable-next-line default-case
      switch (month) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sep";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
      }
    };
    setStartDate(getMonth(param.startMonth) + " " + param.startYear);
    setEndDate(getMonth(param.endMonth) + " " + param.endYear);

    const startMonthIndex = param.startMonth;
    const endMonthIndex = param.endMonth;

    chartRef.current.chart.zoomX(startMonthIndex, endMonthIndex);

    const dataGrafikTempNilai = dataGrafikFull.map((item) => item.nilai);
    const dataGrafikTempJmlh = dataGrafikFull.map((item) => item.jumlahtrans);
    const dataXAxis = dataGrafikFull.map((item) => getMonth(item.bulan));
    const dataGrafik = [
      {
        name: "Nilai Gadai",
        data: dataGrafikTempNilai,
      },
    ];
    setDataGrafikTrans(dataGrafikTempJmlh);
    setDataGrafikNilai(dataGrafik);
    setDataXAxis(dataXAxis);

    console.log("From changer: " + dataGrafik);
  };

  const resetDates = () => {
    const currentDate = new Date();
    const oneYearAgo = new Date();

    oneYearAgo.setMonth(currentDate.getMonth() - 11);

    const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const currentYear = currentDate.getFullYear();

    const oneYearAgoMonth = ("0" + (oneYearAgo.getMonth() + 1)).slice(-2);
    const oneYearAgoYear = oneYearAgo.getFullYear();

    const startDate = oneYearAgoMonth + "/" + oneYearAgoYear;
    const endDate = currentMonth + "/" + currentYear;

    getDataGrafik(startDate, endDate);
  };

  const getDataGrafik = async (tanggalStart, tanggalEnd) => {
    try {
      const response = await axios.post(
        urlAPI + "get-data-grafik",
        {
          uuidlokasi: lokasi.uuidLokasi,
          bulantahunbawah: tanggalStart,
          bulantahunatas: tanggalEnd,
        },
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      const data = response.data.data;
      console.log(data);

      const rangeBulan = {
        startMonth: data[0].bulan,
        startYear: data[0].tahun,
        endMonth: data[data.length - 1].bulan,
        endYear: data[data.length - 1].tahun,
      };
      handleChartChange(rangeBulan, data);
    } catch (error) {
      const errorMssg = error.response?.data?.message || error.message;
      console.error("Error:", errorMssg);
      return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center font-inter h-full">
        <div className="block mx-4 mt-4 w-full">
          <div
            className="rounded-lg border border-neutral-40  mb-4 px-4 py-3 flex flex-row justify-between items-start max-w-full bg-neutral-10"
            onClick={() => setDialogOpen(true)}
          >
            <p className="text-neutral-100 text-sm font-normal">
              {startDate + " - " + endDate}
            </p>
            <Icon
              className="text-neutral-90"
              icon="feather:chevron-down"
              style={{ fontSize: "24px" }}
            />
          </div>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogContent>
              <MonthRangePicker onRangeSelect={handleRangeSelect} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
          <Chart
            type="area"
            ref={chartRef}
            height={260}
            options={{
              stroke: { curve: "smooth", lineCap: "round", width: 1 },
              dataLabels: {
                enabled: false,
              },
              tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  var nilaiInJuta =
                    series[seriesIndex][dataPointIndex] / 1000000;
                  return (
                    '<div class="arrow_box" style="padding: 6px 10px;     font-size: 12px;line-height: 16px; font-weight: 700;">' +
                    "<span>" +
                    nilaiInJuta +
                    " Jt</span><br/>" +
                    "<span>" +
                    dataGrafikTrans[dataPointIndex] +
                    " Trx</span>" +
                    "</div>"
                  );
                },
              },
              noData: {
                text: "Loading...",
              },
              chart: {
                events: {
                  beforeResetZoom: resetDates,
                },
                toolbar: {
                  show: true,
                  autoSelected: "zoomin",
                  tools: {
                    download: false,
                    reset: true,
                    zoomin: true,
                    zoomout: true,
                  },
                },
              },
              xaxis: {
                min: 1,
                max: dataXAxis.length,
                categories: dataXAxis,
                labels: {
                  style: {
                    colors: "#1F2933",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                  },
                },
              },
              yaxis: {
                labels: {
                  formatter: function (value) {
                    var nilaiInJuta = value / 1000000;
                    return nilaiInJuta + " Jt";
                  },
                  style: {
                    colors: "#1F2933",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                  },
                },
              },
              fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.4,
                  opacityTo: 0.8,
                  stops: [0, 100],
                },
                colors: ["#00A9D1"],
              },
              colors: ["#00A9D1"],
            }}
            series={dataGrafikNilai}
          />
        </div>
      </div>
    </>
  );
};
export default Grafik;
