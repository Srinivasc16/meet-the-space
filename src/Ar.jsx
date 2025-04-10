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
        navigate("/Arpage"); // Navigate when "Continue" is clicked
    };

    return (
        <div className="ar-container">

            {/* Content Overlay */}
            <div className="contenty">
                <h1>Augmented Reality</h1>
                {/* Iframe container with adjusted width & height */}
                <div className="iframe-container">
                    <iframe
                        src="http://localhost:5173/meet-the-space/Arpage" // Adjust based on frontend URL
                        title="AR Experience"
                        className="iframe-view"
                        onLoad={() => setLoading(false)}
                    />
                    {loading && <div className="loading">Loading...</div>}
                </div>
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
                        <button className="closex-btn" onClick={() => setShowPopup(false)}>X</button>
                        <p>You are currently using a {deviceType}.</p>
                        <p>
                            {deviceType === "laptop"
                                ? "You can experience Augmented Reality."
                                : "You can experience Virtual Reality."}
                        </p>
                        <button className="continue-btn" onClick={handleContinue}>OK, Continue</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ar;
