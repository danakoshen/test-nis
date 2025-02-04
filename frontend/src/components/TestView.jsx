import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import Question from './Question';
import api from '../services/api/api.js';

const TestView = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        api.getTests().then(response => {
            const fetchedTest = response.data.find((test) => test.id === parseInt(id));
            setTest(fetchedTest);
        }).catch(err => {
            console.error("Failed to fetch test", err);
        });
    }, [id]);

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
        }
        try {
            // console.log("FHEOIwJUDOWDw", answers);
            // console.log("FHEOIwJUDOWDw", token);
            const response = await api.submitTestResults(id, answers);
            // alert(`Правильных ответов: ${response.data.correctAnswers}, Процент выполнения: ${response.data.percentage}%`);
            const results = response.data;
            navigate('/results', { state: { results } });
        } catch (err) {
            console.error('Failed to submit test', err);
        }

    };

    return (
        <div>
            {test && (
                <>
                    <h1>{test.title}</h1>
                    <p>{test.description}</p>
                    {test.questions.map((question) => (
                        <Question
                            key={question.id}
                            question={question}
                            setAnswers={setAnswers}
                        />
                    ))}
                    <button onClick={handleSubmit}>Отправить тест</button>
                </>
            )}
        </div>
    );
};

export default TestView;