import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import axios from "axios";

const Leaderboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/leaderboard");
                const sortedScores = res.data.sort((a, b) => b.score - a.score); // Sorting DESC
                setScores(sortedScores);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
                {scores.map((score, index) => (
                    <li key={score.id}>  {/* Use unique `id` instead of `index` */}
                        {index + 1}. {score.username} - {score.score} pts  {/* Fixed: `score.score` */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
