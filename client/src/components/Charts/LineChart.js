import useMediaQuery from "@mui/material/useMediaQuery";
import Chart from "react-apexcharts";

import { getChartOptions } from "../../constants";
import useThemeSelector from "../../hooks/selectors/useThemeSelector";
import NoData from "./NoData";

function LineChart({ type = "line", smooth, title, xLabels, series }) {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { isDark } = useThemeSelector();

  const options = {
    ...getChartOptions({
      title,
      isDark,
    }),

    stroke: {
      curve: smooth ? "smooth" : "straight",
    },
    xaxis: {
      categories: xLabels,
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(0),
      },
    },
    markers: {
      size: 5,
    },
  };

  return !series?.length || !series[0]?.data?.length ? (
    <NoData />
  ) : (
    <Chart
      type={type}
      options={options}
      series={series}
      height={smScreen ? 300 : 400}
    />
  );
}

export default LineChart;
