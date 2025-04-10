import React, { useEffect, useState } from "react";
import "./Games.css";
import {useNavigate} from "react-router-dom";

const Games = () => {
    const [dailyGames, setDailyGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDailyGames = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:8080/api/daily-games");
                if (!res.ok) throw new Error("Failed to fetch daily games");

                const data = await res.json();
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
        <section className="gamesz">
            <div className="games-headerz">
                <h2>🔥 Daily Space Games! 🎮</h2>
                <p>Check out today's featured games!</p>
            </div>

            {loading ? (
                <p>Loading daily games...</p>
            ) : (
                <div className="games-containerz">
                    {dailyGames.length > 0 ? (
                        dailyGames.map((game, index) => (
                            <div key={index} className="game-cardz" onClick={() => handleGameRedirect(game.route)}>
                                <span className="game-titlez">{game.title}</span>
                                <p>{game.description}</p>
                                <button>P L A Y</button>
                            </div>
                        ))
                    ) : (
                        <p>No daily games available</p>
                    )}
                </div>
            )}
        </section>
    );
};

export default Games;
