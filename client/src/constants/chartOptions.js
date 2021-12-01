import colors from "./colors";

const getChartOptions = ({
  title,
  isDark,
  fillColors = colors.defaultChartPalette,
  strokeColors = [colors.light],
  labelColors = colors.defaultChartPalette,
}) => {
  return {
    colors: labelColors,
    title: {
      text: title,
      align: "center",
      margin: 10,
      style: {
        fontSize: "20px",
        fontWeight: "light",
      },
    },
    chart: {
      foreColor: isDark ? colors.light : colors.dark,
      fontFamily: "Roboto, Helvetica, sans-serif",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: fillColors,
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
    stroke: {
      colors: strokeColors,
      width: 1,
    },
  };
};

export default getChartOptions;
