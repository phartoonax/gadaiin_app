import { Icon } from "@iconify/react";
import Chart from "react-apexcharts";
import React, { useRef, useState } from "react";
import { MonthRangePicker } from "@viniarruda/react-month-range-picker";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

const Grafik = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState("Jan 2023");
  const [endDate, setEndDate] = useState("Des 2023");

  const chartRef = useRef(null);

  const handleRangeSelect = (params) => {
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
    setStartDate(getMonth(params.startMonth) + " " + params.startYear);
    setEndDate(getMonth(params.endMonth) + " " + params.endYear);

    const startMonthIndex = params.startMonth;
    const endMonthIndex = params.endMonth;

    chartRef.current.chart.zoomX(startMonthIndex, endMonthIndex);

    console.log("Start Month: " + startDate + ", End Month: " + endDate);
    closeDialog();
  };
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const resetDates = () => {
    setStartDate("Jan 2023");
    setEndDate("Des 2023");
  };

  return (
    <>
      <div className="flex items-center justify-center font-inter h-full">
        <div className="block mx-4 mt-4 w-full">
          <div
            className="rounded-lg border border-neutral-40  mb-4 px-4 py-3 flex flex-row justify-between items-start max-w-full bg-neutral-10"
            onClick={openDialog}
          >
            <p className="text-neutral-100 text-sm">
              {startDate + " - " + endDate}
            </p>
            <Icon
              className="text-neutral-90"
              icon="feather:chevron-down"
              style={{ fontSize: "24px" }}
            />
          </div>
          <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogContent>
              <MonthRangePicker onRangeSelect={handleRangeSelect} />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Close</Button>
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
                max: 12,

                categories: [
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
                ],
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
            series={[
              {
                name: "test data",
                data: [30, 40, 91, 50, 49, 125, 60, 70, 35, 74, 25, 71, 76],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
export default Grafik;
