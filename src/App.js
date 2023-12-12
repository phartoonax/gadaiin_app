// import logo from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store/configureStore";
import Rute from "./Routes";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { Icon } from "@iconify/react";

const theme = createTheme({
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: "16px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: (
          <Icon
            className="border border-success-Main rounded h-4 w-4"
            color="transparent"
            icon="feather:check"
          />
        ),
        checkedIcon: (
          <Icon
            className="border border-success-Main rounded h-4 w-4"
            icon="feather:check"
          />
        ),
      },
      styleOverrides: {
        root: { paddingRight: "1px" },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&.Mui-focused": {
            outline: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:focus-within": {
            outline: "none",
          },
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          "&:focus-within": {
            outline: "none",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "400",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Inter", "Sans-serif"].join(","),
  },
  palette: {
    primary: {
      themeColor: "#1EBF65",
      lelang: "#B267FF",
      lelangSurface: "#FAF5FF",
      hover: "#00A9D1",
      main: "#03B8E8",
      border: "#E3F9FF",
      surface: "#F5FDFF",
    },
    neutral: {
      100: "#1F2933",
      90: "#323F4B",
      80: "#475A6B",
      70: "#7B8794",
      60: "#9AA5B1",
      50: "#CBD2D9",
      40: "#E4E7EB",
      30: "#F2F3F5",
      20: "#F8F9FA",
      10: "#FFFFFF",
    },
    danger: {
      hover: "#B91919",
      main: "#D21C1C",
      border: "#F4D2D2",
      surface: "#FCF3F2",
      pressed: "#9D1515",
    },
    success: {
      main: "#1EBF65",
      hover: "#238B31",
      pressed: "#1D7228",
      border: "#C3DFC7",
      surface: "#F0F7F5",
    },
    info: {
      main: "#0172CB",
      hover: "#0161AC",
      pressed: "#01508E",
      border: "#D0E9FB",
      surface: "#F2F8FC",
    },
    warning: {
      main: "#E98305",
      hover: "#DC7C05",
      pressed: "#CD7304",
      border: "#FAE2C7",
      surface: "#FCF9F2",
    },
  },
});
class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Rute />
            </div>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
