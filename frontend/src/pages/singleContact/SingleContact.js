import * as React from "react";
import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteContactAction,
    updateContactAction,
} from "../../actions/contactsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import axios from "axios";

function SingleContact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    console.log(params.id);
    const contactUpdate = useSelector((state) => state.contactUpdate);
    const { loading, error } = contactUpdate;

    const contactDelete = useSelector((state) => state.contactDelete);
    const { loading: loadingDelete, error: errorDelete } = contactDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Delete is irreversible, are you sure?")) {
            dispatch(deleteContactAction(id));
        }
        navigate("/contacts");
    };

    // Preload form fields:
    useEffect(() => {
        const fetching = async () => {
            // make request to backend server
            const { data } = await axios.get(`/api/contacts/${params.id}`);

            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            setAge(data.age);
            console.log(data);
        };

        fetching();
    }, [params.id]);

    const resetHandler = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setAge("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateContactAction(
                params.id,
                firstName,
                lastName,
                email,
                phoneNumber,
                age
            )
        );
        if (!firstName || !lastName || !email || !phoneNumber || !age) return;

        resetHandler();
        navigate("/contacts");
    };

    return (
        <MainPage title="Edit Contact">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Edit Your Contact
                    </Typography>
                    <hr />
                    <form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {errorDelete && (
                            <ErrorMessage severity="danger">
                                {errorDelete}
                            </ErrorMessage>
                        )}

                        {error && (
                            <ErrorMessage severity="error">
                                {error}
                            </ErrorMessage>
                        )}
                        <Box
                            sx={{
                                width: 1150,
                                maxWidth: "100%",
                            }}
                        >
                            <TextField
                                value={firstName}
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
                                value={lastName}
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
                                value={email}
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
                                value={phoneNumber}
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
                                value={age}
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
                        {loading && <Loading size={50} />}
                        <Stack direction="row" spacing={4}>
                            <CardActions>
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                >
                                    UPDATE CONTACT
                                </Button>
                            </CardActions>
                            <CardActions>
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => deleteHandler(params.id)}
                                >
                                    DELETE CONTACT
                                </Button>
                            </CardActions>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </MainPage>
    );
}

export default SingleContact;
