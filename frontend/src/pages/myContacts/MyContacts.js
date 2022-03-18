import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Stack,
    Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MainPage from "../../components/MainPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import {
    deleteContactAction,
    listContacts,
} from "../../actions/contactsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyContacts = ({ search }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const contactList = useSelector((state) => state.contactList);
    const { loading, contacts, error } = contactList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const contactCreate = useSelector((state) => state.contactCreate);
    const { success: successCreate } = contactCreate;

    const contactUpdate = useSelector((state) => state.contactUpdate);
    const { success: successUpdate } = contactUpdate;

    const contactDelete = useSelector((state) => state.contactDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = contactDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Delete is irreversible, are you sure?")) {
            dispatch(deleteContactAction(id));
        }
    };

    const logoutHandler = () => {
        dispatch(logout()); // Call userAction.js logout
        navigate("/");
    };

    console.log(contacts); // Contacts from server, successfully connected server to client

    useEffect(() => {
        dispatch(listContacts());
        if (!userInfo) {
            navigate("/");
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successCreate,
        successUpdate,
        successDelete,
    ]);

    return (
        <MainPage title={`Welcome Back ${userInfo.firstName}`}>
            <Link to="/create" style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    style={{
                        marginLeft: 18,
                        marginTop: 20,
                    }}
                >
                    Create New Contact
                </Button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    style={{ marginLeft: 15, marginTop: 20 }}
                    onClick={logoutHandler}
                >
                    Logout to Home Page
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}

            {loading && <Loading />}
            {loadingDelete && <Loading />}
            {contacts
                ?.sort((a, b) => a.lastName.localeCompare(b.lastName))
                .filter((filteredContact) =>
                    filteredContact.lastName
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .map((contact) => {
                    const { firstName, lastName, email, phoneNumber, age } =
                        contact;
                    return (
                        <Accordion style={{ marginTop: 20 }} key={contact._id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>
                                    <span
                                        style={{
                                            color: "black",
                                            cursor: "pointer",
                                            alignSelf: "center",
                                            fontSize: 18,
                                        }}
                                    >
                                        {lastName}
                                    </span>
                                    <AccordionActions>
                                        <Stack direction="row" spacing={4}>
                                            <Button
                                                href={`/contacts/${contact._id}`}
                                                size="small"
                                                variant="contained"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    deleteHandler(contact._id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </AccordionActions>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {firstName},<br />
                                    {lastName},<br />
                                    {email},<br />
                                    {phoneNumber},<br />
                                    {age},
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
        </MainPage>
    );
};

export default MyContacts;
