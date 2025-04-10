import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout.jsx";
import ScrollToTop from "./ScrollToTop.jsx"; // Import ScrollToTop component
import "./App.css";
import home from "./assets/home.mp4";

function App() {
    return (
        <Router basename="/meet-the-space">
            <ScrollToTop /> {/* Scrolls to top on route change */}
            <div className="app-container">
                {/* Video Background */}
                <video autoPlay loop muted playsInline className="video-background">
                    <source src={home} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Main Content */}
                <div className="content">
                    <Layout />
                </div>
            </div>
        </Router>
    );
}

export default App;
