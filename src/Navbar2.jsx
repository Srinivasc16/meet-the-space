import { useState, useEffect } from "react";
import "./navbar2.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

function Navbar2() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate("/Login");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setMessage("Please enter your email.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Reset link sent to your email.");
        } catch (error) {
            setMessage("Error sending reset email. Try again.");
        }
    };

    return (
        <div className="navbar">
            {/* Left: Website Name */}
            <div className="navbar-left">
                <Link to="/" className="website-name">Akasha Milan</Link>
            </div>

            {/* Center: Navigation Links */}
            <nav className="navbar-center">
                <Link to="/">Home</Link>
                <Link to="/Newshub">Discussions</Link>
            </nav>

            {/* Right: User/Login Section */}
            <div className="navbar-right">
                {user ? (
                    <div className="user-menu">
                        <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {user.displayName || "User"}
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => setShowForgotPassword(true)}>Forgot Password</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/Login" className="login-btn">Login</Link>
                )}
            </div>

            {/* Forgot Password Popup */}
            {showForgotPassword && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Reset Password</h3>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleForgotPassword}>Send Reset Link</button>
                        {message && <p className="message">{message}</p>}
                        <button className="close-btn" onClick={() => setShowForgotPassword(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar2;
