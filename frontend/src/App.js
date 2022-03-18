import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyContacts from "./pages/myContacts/MyContacts";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import CreateContact from "./pages/createContact/CreateContact";
import SingleContact from "./pages/singleContact/SingleContact";
import { useState } from "react";

const App = () => {
    const [search, setSearch] = useState("");
    console.log(search);
    return (
        <Router>
            <Header setSearch={setSearch} />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/contacts"
                        element={<MyContacts search={search} />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/create" element={<CreateContact />} />
                    <Route path="/contacts/:id" element={<SingleContact />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
