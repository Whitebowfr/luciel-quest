import React from 'react';
import ReactDOM from 'react-dom/client';
import PC from "./PC"
import "./index.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Source Code Pro, monospace'
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
                ont-family: 'Source Code Pro';
                font-style: normal;
                font-weight: 300;
                src: url(http://fonts.gstatic.com/s/sourcecodepro/v22/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQtMlrTA.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }`
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <PC />
  </ThemeProvider>
);