import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Ar.css";

function Ar() {
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [deviceType, setDeviceType] = useState("laptop");
    const navigate = useNavigate();

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setDeviceType(isMobile ? "mobile" : "laptop");
    }, []);

    const handleClick = () => {
        setShowPopup(true);
    };

    const handleContinue = () => {
        setShowPopup(false);
        navigate("/Arpage"); // Redirects to the 'Arpage' page
    };

    return (
        <div className="ar">
            {/* Background iframe */}
            <div className="iframe-container">
    {loading && <div className="loader">Loading...</div>}
    <iframe
        src="/Arpage"
        title="AR View"
        onLoad={() => setLoading(false)}
        className="iframe-view"
    />
</div>


            {/* Content Overlay */}
            <div className="content">
                <h1>Augmented Reality</h1>
                <div className="button-container">
                    <button className="learn-more" onClick={handleClick}>
                        <span className="circle">
                            <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Feel it</span>
                    </button>
                </div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
                        <p>You are currently using a {deviceType}.</p>
                        {deviceType === "laptop" ? (
                            <p>You can experience Augmented Reality.</p>
                        ) : (
                            <p>You can experience Virtual Reality.</p>
                        )}
                        <button className="continue-btn" onClick={handleContinue}>OK, Continue</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ar;
