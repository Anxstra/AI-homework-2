import React, { useState } from 'react';
import * as api from '../services/api';
import styles from './Login.module.css'; // Re-using login styles

interface RegisterProps {
    onRegisterSuccess: () => void;
    switchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, switchToLogin }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.register({ name, username, email, password });
            onRegisterSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Register</h2>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className={styles.submitButton}>Register</button>
                <p>
                    Already have an account? <button type="button" onClick={switchToLogin} className={styles.linkButton}>Login</button>
                </p>
            </form>
        </div>
    );
};

export default Register; 