import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            // check localStorage for data
            navigate("/contacts");
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="main">
            <Container>
                <div className="buttonContainer">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button
                            className="landingButton"
                            variant="contained"
                            size="large"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <Button
                            className="landingButton"
                            variant="contained"
                            size="large"
                        >
                            Signup
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;
