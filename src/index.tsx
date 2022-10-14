import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppFirst from './unused/AppFirst';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {teal, yellow} from "@mui/material/colors";
import {dark} from "@mui/material/styles/createPalette";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./reducers/store";

const theme = createTheme(({
    palette: {
        primary: teal,
        secondary: yellow,
        mode: 'dark'
    }
}))

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>

    , document.getElementById('root'));
// AppFirst()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
