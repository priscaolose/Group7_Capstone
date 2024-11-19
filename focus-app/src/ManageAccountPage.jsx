import React, { useState, useEffect } from 'react';
import logo from './img/logo.png';
import focusImage from './img/FOCUS.png'; 


const ManageAccountPage = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setMessage('Your account details have been updated!');
    };

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <div style={styles.logoContainer}>
                    <img className="logo" src={logo} alt="Logo" style={styles.logo} />
                </div>
            </header>
            <main style={styles.content}>
                {formVisible ? (
                    <form style={styles.form} onSubmit={handleFormSubmit}>
                        <label style={styles.label}>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </label>
                        <label style={styles.label}>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </label>
                        <label style={styles.label}>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </label>
                        <button type="submit" style={styles.button}>
                            Update Account
                        </button>
                    </form>
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
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        height: '40px',
    },
    content: {
        flex: 1,
        marginTop: '50px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    headerText: {
        color: '#093966',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '50px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        letterSpacing: '12.8px',
        opacity: 0,
        transform: 'translateX(-50px)',
        animation: 'header-fade-in 1s forwards'
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '400px',
    },
    label: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '18px',
        backgroundColor: '#e2eaf1',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontFamily: 'Poppins, sans-serif',
    },
    buttonHover: {
        backgroundColor: '#d1dbe1',
    },
    loadingText: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '20px',
        color: '#093966',
    },
    messageText: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#093966',
        fontFamily: 'Poppins, sans-serif',
    },
    footer: {
        backgroundColor: '#8AAEC6',
        color: 'black',
        padding: '5px 0',
        textAlign: 'center',
    },
};

export default ManageAccountPage;
