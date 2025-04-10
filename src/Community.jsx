import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Com.css"; // Ensure you have CSS styles

const Community = () => {
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/community");
                if (!response.ok) throw new Error("Failed to fetch discussions");

                const data = await response.json();
                setTopics(data);
            } catch (error) {
                console.error("Error fetching discussions:", error);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className="community-container">
            <h2>Space Community Discussions</h2>
            <div className="topics-grid">
                {topics.length > 0 ? (
                    topics.map((topic) => (
                        <div
                            key={topic.id}
                            className="topic-card"
                            onClick={() => navigate(`/discussion/${encodeURIComponent(topic.title)}`)} // Redirects using the discussion name
                        >
                            <img
                                src={topic.image || "https://example.com/default.jpg"}
                                alt={topic.title}
                                className="topic-image"
                            />
                            <h3>{topic.title}</h3>
                            <p>{topic.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading discussions...</p>
                )}
            </div>
        </div>
    );
};

export default Community;
