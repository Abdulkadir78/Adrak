import useMediaQuery from "@mui/material/useMediaQuery";
import Chart from "react-apexcharts";

import { getChartOptions } from "../../constants";
import useThemeSelector from "../../hooks/selectors/useThemeSelector";
import NoData from "./NoData";

function BarChart({
  horizontal = false,
  isMultiColor,
  title,
  xLabels,
  series,
  fillColors,
  strokeColors,
}) {
  const smScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { isDark } = useThemeSelector();

  const options = {
    ...getChartOptions({
      title,
      isDark,
      fillColors,
      strokeColors,
    }),

    plotOptions: {
      bar: {
        distributed: isMultiColor,
        columnWidth: "60%",
        horizontal,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: xLabels,
    },
  };

  return !series?.length || !series[0]?.data?.length ? (
    <NoData />
  ) : (
    <Chart
      type="bar"
      options={options}
      series={series}
      height={smScreen ? 300 : 400}
    />
  );
}

export default BarChart;
