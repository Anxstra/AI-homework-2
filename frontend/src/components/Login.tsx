import React, { useState } from 'react';
import styles from './Login.module.css';
import * as api from '../services/api';

interface LoginProps {
    onLoginSuccess: (token: string) => void;
    switchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, switchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const token = await api.authenticate({ email, password });
            onLoginSuccess(token);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Login</button>
                <p>
                    Don't have an account? <button type="button" onClick={switchToRegister} className={styles.linkButton}>Register</button>
                </p>
            </form>
        </div>
    );
};

export default Login; 