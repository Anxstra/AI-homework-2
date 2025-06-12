import { User } from '../types/types';

const API_URL = 'http://localhost:8080';

export const authenticate = async (credentials: any) => {
    const response = await fetch(`${API_URL}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Authentication failed: ${errorText}`);
    }

    const data = await response.json();
    if (!data.token) {
        throw new Error('Authentication failed: No token received');
    }
    return data.token;
};

export const register = async (userData: Omit<User, 'id' | 'address' | 'company' | 'phone' | 'website'>) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
    }

    return response.json();
};

export const getUsers = async (token: string): Promise<User[]> => {
    const response = await fetch(`${API_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const deleteUser = async (id: number, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
}; 