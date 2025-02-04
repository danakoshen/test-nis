import React, { useState, useEffect } from "react";

const Question = ({ question, setAnswers }) => {
    const [draggedItem, setDraggedItem] = useState(null);
    const [sortedOptions, setSortedOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState({});
    const [availablePairs, setAvailablePairs] = useState([]);

    useEffect(() => {
        if (question.type === "sorting" || question.type === "multiple") {
            setSortedOptions(Array.isArray(question.options) ? [...question.options] : []);
        } else if (question.type === "drag-and-drop") {
            const initialOptions = typeof question.options === "object" ? { ...question.options } : {};
            setOptions(initialOptions);
            setAvailablePairs(Object.values(initialOptions).filter((pair) => pair !== ""));
        }
    }, [question.options, question.type]);

    const handleSingleChoice = (e) => {
        setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }));
    };

    const handleMultipleChoice = (e) => {
        const value = e.target.value;

        setSelectedOptions((prev) => {
            const newSelectedOptions = prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value];

            setAnswers((answers) => ({ ...answers, [question.id]: newSelectedOptions }));
            return newSelectedOptions;
        });
    };

    const handleDrop = (e, targetKey) => {
        e.preventDefault();
        if (!draggedItem) return;

        setOptions((prev) => {
            const newOptions = { ...prev, [targetKey]: draggedItem };
            setAnswers((answers) => ({ ...answers, [question.id]: newOptions }));
            setAvailablePairs((pair) => pair.filter((c) => c !== draggedItem));

            return newOptions;
        });

        setDraggedItem(null);
    };

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSortChange = (index, newIndex) => {
        const newOrder = [...sortedOptions];
        const [movedItem] = newOrder.splice(index, 1);
        newOrder.splice(newIndex, 0, movedItem);
        setSortedOptions(newOrder);
        setAnswers((prev) => ({ ...prev, [question.id]: newOrder }));
    };

    return (
        <div>
            <h3>{question.question}</h3>
            {question.type === "single" &&
                Array.isArray(question.options) &&
                question.options.map((option) => (
                    <label key={option}>
                        <input
                            type="radio"
                            name={question.id}
                            value={option}
                            onChange={handleSingleChoice}
                        />
                        {option}
                    </label>
                ))}
            {question.type === "multiple" &&
                Array.isArray(question.options) &&
                question.options.map((option) => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={handleMultipleChoice}
                        />
                        {option}
                    </label>
                ))}
            {question.type === "drag-and-drop" && (
                <div>
                    {Object.keys(options).map((pair1) => (
                        <div
                            key={pair1}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, pair1)}
                            style={{
                                border: "1px solid black",
                                padding: "10px",
                                margin: "5px",
                                background: "#f0f0f0",
                            }}
                        >
                            <strong>{pair1}:</strong> {options[pair1] || "—"}
                        </div>
                    ))}
                    <h4>Перетащите ответы:</h4>
                    {availablePairs.map((pair) => (
                        <div
                            key={pair}
                            draggable
                            onDragStart={(e) => handleDragStart(e, pair)}
                            style={{
                                padding: "10px",
                                margin: "5px",
                                background: "#c0c0c0",
                                cursor: "grab",
                            }}
                        >
                            {pair}
                        </div>
                    ))}
                </div>
            )}
            {question.type === "sorting" && (
                <div>
                    {sortedOptions.map((num, index) => (
                        <div key={num} style={{ display: "flex", alignItems: "center" }}>
                            <button
                                onClick={() =>
                                    index > 0 && handleSortChange(index, index - 1)
                                }
                            >
                                ⬆
                            </button>
                            <button
                                onClick={() =>
                                    index < sortedOptions.length - 1 &&
                                    handleSortChange(index, index + 1)
                                }
                            >
                                ⬇
                            </button>
                            <span style={{ marginLeft: "10px" }}>{num}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Question;
