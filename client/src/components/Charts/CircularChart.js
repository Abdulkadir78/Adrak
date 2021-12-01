import Chart from "react-apexcharts";

import { getChartOptions } from "../../constants";
import useThemeSelector from "../../hooks/selectors/useThemeSelector";
import NoData from "./NoData";

function CircularChart({
  type = "pie",
  title,
  labels,
  series,
  fillColors,
  labelColors,
  strokeColors,
  legendOffset = 0,
}) {
  const { isDark } = useThemeSelector();

  const options = {
    ...getChartOptions({
      title,
      isDark,
      fillColors,
      labelColors,
      strokeColors,
    }),

    labels,
    tooltip: {
      theme: "dark",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
          plotOptions: {
            pie: {
              expandOnClick: false,
              donut: {
                labels: {
                  show: type === "donut",
                },
              },
            },
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: legendOffset,
    },
  };

  return !series?.length ? (
    <NoData />
  ) : (
    <Chart type={type} options={options} series={series} />
  );
}

export default CircularChart;
