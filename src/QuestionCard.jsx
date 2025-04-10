import React from "react";
import "./QuestionCard.css";

const QuestionCard = ({ questions, currentQuestion, onAnswerSelect }) => {
    if (!questions || questions.length === 0) {
        return <div className="loading">Loading questions...</div>;
    }

    const { question, optionA, optionB, optionC, optionD, correctAnswer } = questions[currentQuestion];

    return (
        <div className="question-card">
            <h2>{question}</h2>
            <div className="options">
                <button onClick={() => onAnswerSelect(optionA === correctAnswer)}>{optionA}</button>
                <button onClick={() => onAnswerSelect(optionB === correctAnswer)}>{optionB}</button>
                <button onClick={() => onAnswerSelect(optionC === correctAnswer)}>{optionC}</button>
                <button onClick={() => onAnswerSelect(optionD === correctAnswer)}>{optionD}</button>
            </div>
        </div>
    );
};

export default QuestionCard;
