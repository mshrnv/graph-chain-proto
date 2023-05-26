import React from 'react';
import {Switch} from "@mui/material";

const ToggleThemeButton = ({handleThemeChange, darkState}) => {
    return (
        <Switch checked={darkState} onChange={handleThemeChange}/>
    );
};
export default ToggleThemeButton;