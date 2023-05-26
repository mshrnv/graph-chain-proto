import React from "react";
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/NavBar";
import theme from './Theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>

                <Nav/>
                <AppRouter/>

            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
