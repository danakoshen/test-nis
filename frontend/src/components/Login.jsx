import React, { useState } from 'react';
import api from '../services/api/api.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.login(username, password);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError('Неправильный пароль');
            console.error('Login failed', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Вход</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;