import colors from "./colors";

const styles = {
  scrollbar: {
    "& ::-webkit-scrollbar": {
      width: 5,
    },
    "& ::-webkit-scrollbar-thumb": {
      backgroundColor: colors.scrollbar,
      borderRadius: 5,
    },
  },
};

export default styles;
