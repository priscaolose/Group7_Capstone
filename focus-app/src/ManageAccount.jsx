import React, { useState, useEffect } from 'react';
import logo from './Images/logo.png';
import { getAuth } from 'firebase/auth';
import { db } from './firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { updateUserInfo } from './Api/accountManagement';

const ManageAccountPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [selectedSection, setSelectedSection] = useState('profile'); // Track selected section

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) return;
            const userCollection = collection(db, 'Users');
            const q = query(userCollection, where('username', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                setFormData({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    phoneNumber: userData.phonenumber || '',
                    email: userData.email || '',
                    password: '',
                });
            } else {
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                setMessage('No user is currently signed in.');
                return;
            }
            await updateUserInfo(user, formData);
            setMessage('Your account details have been successfully updated!');
        } catch (error) {
            setMessage(`Update failed: ${error.message}`);
        }
    };

    const handleSidebarClick = (section) => {
        setSelectedSection(section); // Update the selected section
    };

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <div style={styles.logoContainer}>
                    <img className="logo" src={logo} alt="Logo" style={styles.logo} />
                </div>
            </header>
            <div style={styles.mainContainer}>
                <aside style={styles.sidebar}>
                    <h2 style={styles.sidebarTitle}>Account Settings</h2>
                    <ul style={styles.sidebarList}>
                        <li 
                            style={styles.sidebarItem} 
                            onClick={() => handleSidebarClick('profile')}
                        >
                            Profile
                        </li>
                        <li 
                            style={styles.sidebarItem} 
                            onClick={() => handleSidebarClick('security')}
                        >
                            Security
                        </li>
                        <li 
                            style={styles.sidebarItem} 
                            onClick={() => handleSidebarClick('notifications')}
                        >
                            Notifications
                        </li>
                        <li 
                            style={styles.sidebarItem} 
                            onClick={() => handleSidebarClick('privacy')}
                        >
                            Privacy
                        </li>
                    </ul>
                </aside>
                <main style={styles.content}>
                    <h1 style={styles.heading}>Manage Account Details</h1>
                    
                    {selectedSection === 'profile' && (
                        <form style={styles.form} onSubmit={handleFormSubmit}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Phone Number</label>
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <button type="submit" style={styles.submitButton}>Save Changes</button>
                        </form>
                    )}
                    
                    {selectedSection === 'security' && (
                        <div style={styles.securitySection}>
                            {/* You can add the security settings form here */}
                            <p>Change your password or enable two-factor authentication.</p>
                        </div>
                    )}
                    
                    {selectedSection === 'notifications' && (
                        <div style={styles.notificationsSection}>
                            {/* You can add the notification settings here */}
                            <p>Choose your notification preferences.</p>
                        </div>
                    )}
                    
                    {selectedSection === 'privacy' && (
                        <div style={styles.privacySection}>
                            {/* You can add privacy settings here */}
                            <p>Adjust your privacy settings.</p>
                        </div>
                    )}

                    {message && <p style={styles.messageText}>{message}</p>}
                    
                </main>
            </div>
            <footer style={styles.footer}>
                <p>&copy; 2024 Focus. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    pageContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    logo: {
        height: '40px',
    },
    mainContainer: {
        display: 'flex',
        flex: 1,
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    },
    sidebarTitle: {
        fontSize: '20px',
        marginBottom: '15px',
        color: '#2c2f33',
    },
    sidebarList: {
        listStyleType: 'none',
        padding: 0,
    },
    sidebarItem: {
        padding: '10px 0',
        fontSize: '16px',
        color: '#2c2f33',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start', 
        padding: '20px',
        paddingLeft: '100px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', 
        gap: '15px',
        textAlign: 'left',
        width: '100%', 
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', 
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#2c2f33',
    },
    label: {
        fontSize: '14px',
        color: '#2c2f33',
        marginBottom: '5px',
    },
    input: {
        width: '40%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
    },
    submitButton: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#7289da',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    messageText: {
        marginTop: '20px',
        fontSize: '16px',
        color: '#43b581',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: 'black',
        padding: '5px 0',
        textAlign: 'center',
    },
};

export default ManageAccountPage;
