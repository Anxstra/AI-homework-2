import React, { useState, useEffect } from 'react';
import { User } from './types/types';
import * as api from './services/api';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('jwt-token'));
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (token) {
                try {
                    setIsLoading(true);
                    setError('');
                    const fetchedUsers = await api.getUsers(token);
                    setUsers(fetchedUsers);
                    localStorage.setItem('jwt-token', token);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                    setToken(null); // Clear token on error
                    localStorage.removeItem('jwt-token');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchUsers();
    }, [token]);

    const handleLogin = async (credentials: any) => {
        try {
            setIsLoading(true);
            setError('');
            const receivedToken = await api.authenticate(credentials);
            setToken(receivedToken);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('jwt-token');
    };

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleUserDelete = async (userId: number) => {
        if (token) {
            try {
                await api.deleteUser(userId, token);
                setUsers(users.filter(user => user.id !== userId));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete user');
            }
        }
    };

    if (!token) {
        if (isRegistering) {
            return <Register 
                onRegisterSuccess={() => {
                    setIsRegistering(false);
                    setError('Registration successful! Please log in.');
                }}
                switchToLogin={() => setIsRegistering(false)}
            />;
        }
        return <Login 
            onLoginSuccess={setToken} 
            switchToRegister={() => {
                setIsRegistering(true);
                setError('');
            }} 
        />;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>User Directory</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <main>
                {isLoading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                <UserTable users={users} onUserSelect={handleUserSelect} onUserDelete={handleUserDelete} />
            </main>
            <UserModal user={selectedUser} onClose={handleCloseModal} />
        </div>
    );
};

export default App;
