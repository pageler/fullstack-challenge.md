import { Grid } from "@mui/material";

const footer = () => {
    return (
        <footer
            style={{
                width: "100%",
                position: "relative",
                bottom: 0,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Grid
                className="text-center py-3"
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                Copyright &copy; Contact List - 2022
            </Grid>
        </footer>
    );
};

export default footer;
