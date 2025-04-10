import React, { useEffect, useState } from "react";
import "./nh.css";

const Newshub = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = "http://localhost:8080/api/news/articles"; // Local Spring Boot API endpoint

    useEffect(() => {
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setArticles(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
                setError("Failed to load news. Please try again later.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <h1>Space News</h1>

            {/* Tailwind Loader */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            <div className="news-grid">
                {!loading && !error && articles.length > 0 ? (
                    articles.map((article) => (
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-card"
                            key={article.id}
                        >

                            <img
                                src={article.image_url || "https://via.placeholder.com/300"}
                                alt={article.title}
                            />
                            <div className="news-content">
                                <h2>{article.title}</h2>
                                <p>{article.summary.substring(0, 100)}...</p>
                            </div>
                        </a>
                    ))
                ) : (
                    !loading && !error && <p>No news available.</p>
                )}
            </div>
        </div>
    );
};

export default Newshub;
