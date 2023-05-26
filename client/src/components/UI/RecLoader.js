import React from 'react';
import {Skeleton} from "@mui/material";

const RecLoader = () => {
    return (
        <div style={{paddingRight: 20}}>
            <Skeleton variant="rounded" height={60} sx={{marginBottom: 2}}/>
            <Skeleton variant="rounded" height={60} sx={{marginBottom: 2}}/>
            <Skeleton variant="rounded" height={60} sx={{marginBottom: 2}}/>
            <Skeleton variant="rounded" height={60} sx={{marginBottom: 2}}/>
            <Skeleton variant="rounded" height={60} sx={{marginBottom: 2}}/>
        </div>
    );
};

export default RecLoader;