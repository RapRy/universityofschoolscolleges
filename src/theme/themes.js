import { createMuiTheme } from "@material-ui/core";

const palette = {
  background: {
    // light orange
    paper: "#FFFBF5",
    // light blue
    default: "#F4FDFF",
  },
  primary: {
    main: "#0077B6",
    dark: "#01497C",
    light: "#00B4D8",
  },
  secondary: {
    main: "#E85D04",
    dark: "#C14B00",
    light: "#F48C06",
  },
  common: {
    black: "#525252",
  },
  grey: {
    A100: "#DFDFDF",
    A200: "#A0A0A0",
  },
};

const shape = {
  borderRadius: 10,
};

const shadows = [
  "none",
  "4px 4px 15px rgba(0, 0, 0, 0.25)",
  "0px 6px 30px rgba(0, 0, 0, 0.15)",
];

export const poppinsFont = createMuiTheme({
  palette: palette,
  shape: shape,
  shadows: shadows,
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export const ubuntuFont = createMuiTheme({
  palette: palette,
  shape: shape,
  shadows: shadows,
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
  },
});

export const mainTheme = createMuiTheme({
  palette: palette,
  shape: shape,
  shadows: shadows,
});
