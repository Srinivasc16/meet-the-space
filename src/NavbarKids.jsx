import { useState, useEffect } from "react";
import "./navbar2.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavbarKids() {
    const [userName, setUserName] = useState("User");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const nameFromStorage = localStorage.getItem("userName");
        if (nameFromStorage) {
            setUserName(nameFromStorage);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userName"); // Clear stored user info
        navigate("/Login");
    };

    return (
        <div className={`navbarx ${scrolled ? "scrolled" : ""}`}>
            {/* Left: Website Name */}
            <div className="navbar-leftx">
                <Link to="/" className="website-namex">Akasha Milan</Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="menu-toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Center: Navigation Links */}
            <nav className={`navbar-centerx ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/Newshub" onClick={() => setMenuOpen(false)}>News Hub</Link>
                <Link to="/Games" onClick={() => setMenuOpen(false)}>Games</Link>
                <Link to="/Learning" onClick={() => setMenuOpen(false)}>Learning</Link>
            </nav>

            {/* Right: User/Login Section */}
            <div className="navbar-rightx">
                {userName ? (
                    <div className="user-menux">
                        <button className="dropdown-btnx" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {userName}
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menux">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/Login" className="login-btnx">Login</Link>
                )}
            </div>
        </div>
    );
}

export default NavbarKids;
