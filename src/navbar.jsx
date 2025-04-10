import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="navbar-container">
                {/* Left: Website Name */}
                <Link to="/" className="navbar-logo">
                    Akasha Milan
                </Link>

                {/* Center: Navigation Links */}
                <div className={`nav-links ${isOpen ? "open" : ""}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/Newshub" onClick={() => setIsOpen(false)}>News Hub</Link>
                    <Link to="/Careers" onClick={() => setIsOpen(false)}>Careers</Link>
                    <Link to="/Community" onClick={() => setIsOpen(false)}>Community</Link>
                    <Link to="/Space" onClick={() => setIsOpen(false)}>Space Stations</Link>
                    <Link to="/Kids" className="kids-btn" onClick={() => setIsOpen(false)}>Kids</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
