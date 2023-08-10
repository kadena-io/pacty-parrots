import { createTheme } from "@mui/material/styles";
import { fontStyleNHaas } from "./fontConfig";
import backgroundImageUrl from "../assets/images/Background.png";

export const greenPrimaryColor = "#19a33c";
export const greenSecondaryColor = "#a6c600";

export const greenTheme = createTheme({
  palette: {
    primary: {
      main: greenPrimaryColor,
    },
  },
  typography: {
    fontFamily: [
      "Neue Haas Grotesk Text Pro Roman",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": [fontStyleNHaas],
        body: {
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "white",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&$selected": {
            backgroundColor: greenSecondaryColor,
          },
          "&:hover": {
            backgroundColor: greenSecondaryColor,
          },
          color: "white",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: greenPrimaryColor,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "white",
          "&$focused": {
            color: "white",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: "white",
          },
          "&:after": {
            borderBottomColor: "white",
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottomColor: "white",
          },
        },
        input: {
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.blackInput .MuiFormLabel-root": {
            color: "black",
          },
          "&.blackInput .MuiInputBase-root input": {
            color: "black",
          },
          "&.blackInput .MuiInput-underline:before": {
            borderBottomColor: "black",
          },
          "&.blackInput .MuiInput-underline:after": {
            borderBottomColor: "black",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.headerChip": {
            backgroundColor: "white",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "& a": {
            textDecoration: "none",
          },
        },
      },
    },
  },
});
