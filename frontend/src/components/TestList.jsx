import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api/api.js';

const TestList = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        api.getTests().then(response => {
            setTests(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Тесты</h1>
            <ul>
                {tests.map((test) => (
                    <li key={test.id}>
                        <Link to={`/test/${test.id}`}>{test.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/create-test">Создать тест</Link>
        </div>
    );
};

export default TestList;