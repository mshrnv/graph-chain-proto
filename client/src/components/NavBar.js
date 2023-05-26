import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useContext, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {AppContext} from "./AppContext";
import Web3 from "web3";
import {Badge} from "flowbite-react";

const BarTypography = styled(Typography)(({theme}) => ({
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
    color: theme.palette.nav.text
}))

const Bar = styled(AppBar)(({theme}) => ({
    backgroundColor: theme.palette.nav.bgColor
}))

export default function Nav() {
    const [user, setUser] = useContext(AppContext)
    const [balance, setBalance] = useState(0)

    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

    useEffect(() => {
        if (!user) {
            return;
        }

        web3.eth.getBalance(user, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                setBalance(web3.utils.fromWei(result, "ether"));
            }
        })
    }, [user])

    return (
        <Box sx={{flexGrow: 1}}>
            <Bar position="static">
                <Toolbar>
                    <svg width={30} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                              d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"></path>
                    </svg>
                    <h1 className="float-left mb-4 text-xl font-extrabold text-white mt-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            Graph
                        </span>
                        Chain
                    </h1>


                    {user ?
                        <Box sx={{display: {md: 'flex', marginLeft: 'auto', alignItems: 'center'}}}>
                            <BarTypography>
                                <Badge
                                    color="purple"
                                    size="md"
                                >
                                    {balance} ETH
                                </Badge>
                            </BarTypography>
                            <BarTypography>
                                <Badge
                                    color="info"
                                    size="md"
                                >
                                    {user}
                                </Badge>
                            </BarTypography>
                        </Box>
                        :
                        <></>
                    }

                </Toolbar>
            </Bar>
        </Box>
    );
}
