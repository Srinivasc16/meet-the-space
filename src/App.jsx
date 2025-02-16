import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Navbar2 from "./Navbar2.jsx";
import Home from "./Home.jsx";
import Arpage from "./Arpage.jsx";
import Kids from "./Kids.jsx";
import Newshub from "./Newshub.jsx";
import Jigsaw from "./Jigsaw.jsx";
import Community from "./Community.jsx";
import Login from "./Login.jsx";
import Discussion from "./Discussion.jsx";
import Construction from "./Construction.jsx";
import Careers from "./Careers.jsx";
import Footer from "./Footer.jsx";
import Space from "./space.jsx";
import {useEffect} from "react";

function App() {
    return (
        <Router basename="/meet-the-space">
            <Layout />
        </Router>
    );
}

function Layout() {
    const location = useLocation();

    useEffect(() => {
        console.log("Current Path:", location.pathname);
    }, [location]);
    const hideNavbarRoutes = ["/Arpage"];
    const hideFooterRoutes = ["/Arpage","/Jigsaw"];

    // Use regex to match dynamic discussion routes
    const isCommunityNavbar =
        ["/Community", "/Login"].includes(location.pathname) ||
        location.pathname.startsWith("/discussion/");

    return (
        <>
            {/* Conditionally render Navbar */}
            {!hideNavbarRoutes.includes(location.pathname) &&
                (isCommunityNavbar ? <Navbar2 /> : <Navbar />)
            }

            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/Arpage" element={<Arpage />} />
                <Route path="/Newshub" element={<Newshub />} />
                <Route path="/Kids" element={<Kids />} />
                <Route path="/Jigsaw" element={<Jigsaw />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Community" element={<Community />} />
                <Route path="/discussion/:title" element={<Discussion />} />
                <Route path="/Space" element={<Space />} />
                <Route path="/construction" element={<Construction />} />
                <Route path="/careers" element={<Careers />} />
            </Routes>

            {/* Conditionally render Footer */}
            {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </>
    );
}

export default App;
