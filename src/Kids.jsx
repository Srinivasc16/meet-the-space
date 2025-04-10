import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./kids.css";  // Import CSS file

const KidsSpaceExplorer = () => {
    const [dailyGames, setDailyGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Space Explorer | Cosmic Fun for Kids!";

        const fetchDailyGames = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:8080/api/daily-games");
                if (!res.ok) throw new Error("Failed to fetch daily games");

                const data = await res.json();
                console.log(data);
                setDailyGames(data);
            } catch (error) {
                console.error("Error fetching daily games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDailyGames();
    }, []);

    const handleGameRedirect = (route) => {
        navigate(route);
    };

    return (
        <div className="explorer-container">

            {/* Header Section */}
            <header className="header">
                <h1>Kids Section</h1>
            </header>

            {/* Daily Games Section */}
            <section className="games-section">
                <h2>Games</h2>

                {loading ? (
                    <div className="loader">🌌 Loading cosmic fun...</div>
                ) : dailyGames.length > 0 ? (
                    <div className="games-grid">
                        {dailyGames.map((game) => (
                            <div key={game.id} className="game-card" onClick={() => handleGameRedirect(game.route)}>
                                <img src={game.imageUrl} alt={game.title} />
                                <div className="game-info">
                                    <h3>{game.title}</h3>
                                    <p>{game.description}</p>
                                    <button>🚀 Play Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-games">
                        <span>👾</span>
                        <h3>No games available today</h3>
                        <p>Check back tomorrow for more cosmic fun!</p>
                    </div>
                )}
            </section>

            {/* Space Fact Section */}
            <section className="fact-section">
                <h3>🌌 Space Fact of the Day</h3>
                <p>🌠 A day on Venus is longer than its year! It takes 243 Earth days to rotate once, but only 225 Earth days to orbit the Sun.</p>
            </section>

            {/* Navigation Menu */}
            <section className="nav-menu">
                <h3>Explore More Adventures</h3>
                <div className="menu-buttons">
                    <button>🌌 Planet Quiz</button>
                    <button>🔭 Space Videos</button>
                    <button>📚 Space Facts</button>
                    <button>🎨 Space Coloring</button>
                </div>
            </section>

        </div>
    );
};

export default KidsSpaceExplorer;
