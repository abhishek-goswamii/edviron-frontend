import React from 'react'
import { Box } from '@mui/material';
import DashBoardStyle from '../Styles/DashBoardStyles';

const Bar = ({ barHeight, month, handleHover, monthNumber , loadPie }) => {

    const classes = DashBoardStyle()

    return (
        <Box sx={{
            transform: "scale(1.1)",
            transition: "transform 0.2s",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}  onMouseEnter={() => {

            handleHover(monthNumber)
        }} onClick={() => handleHover(monthNumber)} 
        
        onMouseLeave={() =>loadPie()}
        
        >

            <Box style={{ height: `${barHeight}%`, width: "40px", backgroundColor: "#ebedff", borderRadius: "10px" }} >

            </Box>

            <p style={{ paddingTop: "20px" }}>{month}</p>
        </Box>
    )
}

export default Bar