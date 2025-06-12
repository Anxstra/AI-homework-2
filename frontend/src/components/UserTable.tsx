import React from 'react';
import { User } from '../types/types';
import styles from './UserTable.module.css';

interface UserTableProps {
    users: User[];
    onUserSelect: (user: User) => void;
    onUserDelete: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUserSelect, onUserDelete }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name / Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Company</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} onClick={() => onUserSelect(user)}>
                        <td>
                            <div className={styles.name}>{user.name}</div>
                            <div className={styles.email}>{user.email}</div>
                        </td>
                        <td>{user.address ? `${user.address.street}, ${user.address.suite}, ${user.address.city}` : 'N/A'}</td>
                        <td>{user.phone || 'N/A'}</td>
                        <td>
                            {user.website ? 
                                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a> 
                                : 'N/A'
                            }
                        </td>
                        <td>{user.company?.name || 'N/A'}</td>
                        <td>
                            <button 
                                className={styles.deleteButton} 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click event
                                    onUserDelete(user.id);
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable; 