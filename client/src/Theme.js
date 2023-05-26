import {createTheme} from "@mui/material";

const theme = createTheme(
    {
        palette: {
            mode: 'dark',
            nodes: {
                folder: "#00a550",
                file: '',
                root: "#fc89ac"
            },
            nav: {
                bgColor: "rgba(0, 0, 0, 0.87)",
                text: "rgba(255, 255, 255, 0.7)"
            },
            button: {
                text: "rgba(0, 0, 0, 0.12)",
                bgColor: "rgba(0, 0, 0, 0.54)"
            }
        },
        shape: {
            borderRadius: {
                recItem: '5px',
                node: '50%',
                fields: '3px'
            }
        }
    }
)


export default theme