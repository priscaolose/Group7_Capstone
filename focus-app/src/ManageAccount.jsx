import React, { useState, useEffect } from 'react';
import logo from './Images/logo.png';

const ManageAccountPage = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [newValue, setNewValue] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleFieldSelection = (field) => {
        setSelectedField(field);
        setNewValue('');
        setConfirmValue('');
        setMessage('');
    };

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (type === 'new') {
            setNewValue(value);
        } else {
            setConfirmValue(value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 phone number format

        if (newValue === '' || confirmValue === '') {
            setMessage('Please fill out both fields.');
            return;
        }

        if (selectedField === 'email' && !emailRegex.test(newValue)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        if (selectedField === 'phoneNumber' && !phoneRegex.test(newValue)) {
            setMessage('Please enter a valid phone number.');
            return;
        }

        if (newValue !== confirmValue) {
            setMessage('The information provided does not match. Please try again.');
            return;
        }

        setFormData((prevData) => ({ ...prevData, [selectedField]: newValue }));
        setMessage(`Your ${selectedField.replace(/([A-Z])/g, ' $1')} has been successfully updated!`);
        setNewValue('');
        setConfirmValue('');
    };

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <div style={styles.logoContainer}>
                    <img className="logo" src={logo} alt="Logo" style={styles.logo} />
                </div>
            </header>
            <main style={styles.content}>
                <h1 style={styles.heading}>Manage Account Details</h1>
                <p style={styles.description}>
                    Select the detail you want to update and provide the new account details. Confirm the new account details to save changes.
                </p>
                {formVisible ? (
                    <div style={styles.box}>
                        <div style={styles.selectionContainer}>
                            <button style={styles.button} onClick={() => handleFieldSelection('firstName')}>Update First Name</button>
                            <button style={styles.button} onClick={() => handleFieldSelection('lastName')}>Update Last Name</button>
                            <button style={styles.button} onClick={() => handleFieldSelection('phoneNumber')}>Update Phone Number</button>
                            <button style={styles.button} onClick={() => handleFieldSelection('email')}>Update Email</button>
                            <button style={styles.button} onClick={() => handleFieldSelection('password')}>Update Password</button>
                        </div>
                        {selectedField && (
                            <form style={styles.form} onSubmit={handleFormSubmit}>
                                <label style={styles.label}>
                                    New {selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}:
                                    <input
                                        type={selectedField === 'password' ? 'password' : 'text'}
                                        value={newValue}
                                        onChange={(e) => handleInputChange(e, 'new')}
                                        style={styles.input}
                                    />
                                </label>
                                <label style={styles.label}>
                                    Confirm {selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}:
                                    <input
                                        type={selectedField === 'password' ? 'password' : 'text'}
                                        value={confirmValue}
                                        onChange={(e) => handleInputChange(e, 'confirm')}
                                        style={styles.input}
                                    />
                                </label>
                                <button type="submit" style={styles.submitButton}>Save Changes</button>
                            </form>
                        )}
                    </div>
                ) : (
                    <p style={styles.loadingText}>Loading...</p>
                )}
                {message && <p style={styles.messageText}>{message}</p>}
            </main>
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
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#e2e9f1',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'flex-start', // Align content to the left
        alignItems: 'center', // Vertically align
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'flex-start', // Ensure logo container aligns to the left
    },
    logo: {
        height: '40px',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    description: {
        fontSize: '16px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    box: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    selectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#e2eaf1',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '20px',
    },
    label: {
        fontSize: '14px',
    },
    input: {
        width: '90%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#093966',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    messageText: {
        marginTop: '20px',
        fontSize: '16px',
        color: '#093966',
    },
    footer: {
        backgroundColor: '#8AAEC6',
        color: 'black',
        padding: '5px 0',
        textAlign: 'center',
    },
};


export default ManageAccountPage;
