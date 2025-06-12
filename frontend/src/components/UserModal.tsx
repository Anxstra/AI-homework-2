import React from 'react';
import { User } from '../types/types';
import styles from './UserModal.module.css';

interface UserModalProps {
    user: User | null;
    onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
    if (!user) {
        return null;
    }

    const mapLink = user.address?.geo ? `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}` : null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>{user.name} ({user.username})</h2>
                <div className={styles.content}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                    <p><strong>Website:</strong> {user.website ? <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a> : 'N/A'}</p>
                    {user.address && (
                        <div className={styles.section}>
                            <h4>Address</h4>
                            <p>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
                            {mapLink && <a href={mapLink} target="_blank" rel="noopener noreferrer">View on Map</a>}
                        </div>
                    )}
                    {user.company && (
                        <div className={styles.section}>
                            <h4>Company</h4>
                            <p><strong>Name:</strong> {user.company.name}</p>
                            <p><strong>Catchphrase:</strong> "{user.company.catchPhrase}"</p>
                            <p><strong>Business:</strong> {user.company.bs}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserModal; 