import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import "./quiz.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const username = currentUser?.displayName || currentUser?.email || "GuestUser";

    useEffect(() => {
        fetchQuestions("easy");
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/quiz/questions/easy`);
            setQuestions(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch questions:", error);
            setLoading(false);
        }
    };

    const handleAnswer = (isCorrect) => {
        if (questions.length === 0) return;

        const baseScore = questions[currentIndex].difficulty === "easy"
            ? 10
            : questions[currentIndex].difficulty === "medium"
                ? 20
                : 30;

        let newScore = score;
        let newStreak = streak;

        if (isCorrect) {
            newStreak++;
            newScore += baseScore + (newStreak >= 3 ? 5 : 0) - timeTaken;
        } else {
            newStreak = 0;
            newScore -= 5;
        }

        setScore(newScore);
        setStreak(newStreak);
        setTimeTaken(0);

        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
        } else {
            submitScore(newScore);
        }
    };

    const submitScore = async (finalScore) => {
        try {
            await axios.post("http://localhost:8080/api/leaderboard", {
                username: username,
                score: finalScore,
            });
            navigate("/leaderboard", { state: { score: finalScore } });
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    return (
        <div className="quiz-container">
            {loading ? (
                <p>Loading questions...</p>
            ) : (
                <>
                    <QuestionCard
                        questions={questions}
                        currentQuestion={currentIndex}
                        onAnswerSelect={handleAnswer}
                    />
                    <div className="score-display">
                        <h3>Score: {score}</h3>
                        <h4>Streak: {streak}</h4>
                    </div>
                    <div className="quiz-buttons">
                        <button className="end-quiz-btn" onClick={() => submitScore(score)}>End Quiz</button>
                        <button className="leaderboard-btn" onClick={() => navigate("/leaderboard")}>Leaderboard</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Quiz;
