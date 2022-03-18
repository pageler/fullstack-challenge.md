import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MainPage from "../../components/MainPage";
import { Box } from "@mui/system";
import { Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createContactAction } from "../../actions/contactsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function CreateContact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contactCreate = useSelector((state) => state.contactCreate);
    const { loading, error, contact } = contactCreate;

    console.log(contact);

    const resetHandler = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setAge("");
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !phoneNumber || !age) return;

        dispatch(
            createContactAction(firstName, lastName, email, phoneNumber, age)
        );
        resetHandler();
        navigate("/contacts");
    };

    return (
        <MainPage title="Create Contact">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Create a new contact
                    </Typography>
                    <hr />
                    <form onSubmit={submitHandler}>
                        {error && (
                            <ErrorMessage variant="error">{error}</ErrorMessage>
                        )}
                        <Box
                            sx={{
                                width: 1150,
                                maxWidth: "100%",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="First Name"
                                placeholder="Enter first name"
                                required
                                margin="normal"
                                variant="filled"
                                name="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
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
                                label="Last Name"
                                placeholder="Enter last name"
                                required
                                margin="normal"
                                variant="filled"
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
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
                                label="Email Address"
                                placeholder="Enter email address"
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
                                label="Phone Number"
                                placeholder="Enter phone number"
                                required
                                margin="normal"
                                variant="filled"
                                name="email"
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                label="Age"
                                placeholder="Enter age"
                                required
                                margin="normal"
                                variant="filled"
                                name="email"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Box>
                        <br />
                        {loading && <Loading />}
                        <Stack direction="row" spacing={4}>
                            <CardActions>
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                >
                                    CREATE CONTACT
                                </Button>
                            </CardActions>
                            <CardActions>
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={resetHandler}
                                >
                                    RESET FIELDS
                                </Button>
                            </CardActions>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </MainPage>
    );
}

export default CreateContact;
