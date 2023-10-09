import React from 'react'
import { Box, Typography } from '@mui/material';
import DashBoardStyle from '../Styles/DashBoardStyles';

// eslint-disable-next-line react/prop-types
const OverviewCards = ({ title, data }) => {
    const classes = DashBoardStyle()

    return (
        
        <Box className={classes.overviewCard} >
            <Typography>{title}</Typography>
            <Typography variant='h4'>{data}</Typography>
        </Box>

        






    )
}

export default OverviewCards