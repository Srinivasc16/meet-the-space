import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import "./Discussion.css";

const API_URL = "http://localhost:8080/api/discussion";

const Discussion = () => {
    const { communityType } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth(); // Get Firebase auth instance\
    useEffect(() => {
        console.log("Community Type from URL:", communityType); // Debugging
        if (communityType) {
            fetchMessages();
        }
    }, [communityType]);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set Firebase user data
            } else {
                setUser(null);
            }
        });

        fetchMessages();
        return () => unsubscribe(); // Cleanup listener on unmount
    }, [communityType]);

    const fetchMessages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${communityType}`);
            if (!response.ok) throw new Error("Failed to fetch messages");

            const data = await response.json();
            setMessages(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const postMessage = async () => {
        if (!user) {
            alert("Please log in to post a message!");
            return;
        }

        if (newMessage.trim() === "") return;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: newMessage,
                    emailId: user.email, // Get email from Firebase Auth
                    communityType
                }),
            });

            if (!response.ok) throw new Error("Failed to post message");

            setNewMessage("");
            setIsPopupOpen(false);
            fetchMessages();
        } catch (error) {
            console.error("Error posting message:", error);
        }
    };

    return (
        <div className="layout-container">
            <div className="discussion-container">
                <div className="discussion-header">
                    <h2>💬 {communityType} Discussions</h2>
                    {user ? (
                        <button className="create-post-btn header-post-btn" onClick={() => setIsPopupOpen(true)}>
                            + New Post
                        </button>
                    ) : (
                        <button className="login-btn" onClick={() => navigate("/login")}>
                            Login to Post
                        </button>
                    )}
                </div>

                {loading ? <p className="loading-text">Loading messages...</p> : null}
                {error ? <p className="error-text">Error: {error}</p> : null}

                <div className="messages-list">
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className="message-card">
                                <p className="message-text">{msg.message}</p>
                                <p className="message-info">
                                    <strong>{msg.emailId}</strong> • {new Date(msg.timestamp).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="no-messages">No messages yet. Be the first to post!</p>
                    )}
                </div>


                {!user && (
                    <p className="login-reminder">🔒 Log in to add messages</p>
                )}
            </div>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Create a New Post</h3>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Write your message..."
                        />
                        <div className="popup-actions">
                            <button className="cancel-btn" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                            <button className="post-btn" onClick={postMessage}>Post</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Discussion;
