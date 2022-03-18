import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = ({ size = 100 }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <CircularProgress
                style={{
                    width: size,
                    height: size,
                }}
                animation="border"
            />
        </Box>
    );
};

export default Loading;
