import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (userData) => {
        await axios.post('https://kanban-backend-gamma.vercel.app/api/auth/register', userData).then((res) => {
            console.log(`User registration success`, res);
            setUser(JSON.stringify(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
            localStorage.setItem('token', res.data.token);
        });
    };

    const login = async (userData) => {
        await axios.post('https://kanban-backend-gamma.vercel.app/api/auth/login', userData).then((res) => {
            console.log(`User login success`, res);
            setUser(JSON.stringify(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
            localStorage.setItem('token', res.data.token);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
