import { Icon } from "@iconify/react";
import Chart from "react-apexcharts";

const Grafik = (props) => {
  return (
    <>
      <div className="flex items-center justify-center font-inter h-full">
        <div className="block ml-4 mt-4 w-full">
          <div className="rounded-lg border border-neutral-40 mr-4 mb-4 px-4 py-3 flex flex-row justify-between items-start max-w-full bg-neutral-10">
            <p className="text-neutral-100">Jan - Des</p>
            <Icon
              className="text-neutral-90"
              icon="feather:chevron-down"
              style={{ fontSize: "24px" }}
            />
          </div>
          <Chart
            type="area"
            height={260}
            options={{
              stroke: { curve: "smooth", lineCap: "round", width: 1 },
              dataLabels: {
                enabled: false,
              },
              chart: {
                toolbar: {
                  show: true,
                  autoSelected: "zoomin",
                  tools: {
                    pan: true,
                    reset: true,
                    zoomin: true,
                    zoomout: true,
                  },
                },
                pan: { enabled: true },
              },
              xaxis: {
                min: 1,
                max: 6,

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
