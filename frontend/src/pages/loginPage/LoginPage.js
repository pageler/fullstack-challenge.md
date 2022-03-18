import MainPage from "../../components/MainPage";
import "./LoginPage.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            navigate("/contacts");
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    };

    return (
        <MainPage title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <form onSubmit={submitHandler}>
                    <Box
                        sx={{
                            width: 1150,
                            maxWidth: "100%",
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Email Address"
                            placeholder="Enter your email address"
                            required
                            margin="normal"
                            variant="filled"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: 1150,
                            maxWidth: "100%",
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Password"
                            placeholder="Enter your password"
                            required
                            margin="normal"
                            variant="filled"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <br />
                    <Stack direction="row" spacing={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={<SendIcon />}
                            style={{ marginLeft: "20px" }}
                        >
                            Submit
                        </Button>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            <Button variant="outlined">New User</Button>
                        </Link>
                    </Stack>
                </form>
            </div>
        </MainPage>
    );
};

export default LoginPage;
