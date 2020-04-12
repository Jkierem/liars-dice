import { createMuiTheme } from "@material-ui/core";

export const mainTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#3949ab',
            dark: "#00227b",
            light: "#6f74dd",
            contrastText: "#ffffff",
        },
        secondary: {
          main: '#8e24aa',
          dark: "#5c007a",
          light: "#c158dc",
          contrastText: "#ffffff",
        },
        alternate: {
            main: "#2e7d32",
            dark: "#005005",
            light: "#60ad5e",
            contrastText: "#ffffff",
        }
    },
})