import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/">Главная</Link>
            {isAuthenticated ? (
                <button onClick={handleLogout}>Выйти</button>
            ) : (
                <Link to="/login">Войти</Link>
            )}
        </nav>
    );
};

export default Navbar;