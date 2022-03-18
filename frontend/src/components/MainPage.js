import { Container } from "@mui/material";
import "./MainPage.css";

const MainPage = ({ title, children }) => {
    return (
        <div className="mainBackground">
            <Container>
                <div className="page">
                    {title && (
                        <>
                            <h1 className="heading">{title}</h1>
                            <hr />
                        </>
                    )}
                    {children}
                </div>
            </Container>
        </div>
    );
};

export default MainPage;
