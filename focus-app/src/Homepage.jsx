// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './Images/Focus-8.png'; // Import the logo image
import focusImage from './Images/focus.png';

const HomePage = () => {
    const [buttonText, setButtonText] = useState("Let's Get Started");
    const [showMessage, setShowMessage] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(false);

    const navigate = useNavigate(); // Initialize the navigation hook

    useEffect(() => {
        const timer = setTimeout(() => {
            setHeaderVisible(true);
        }, 500);

        const textTimer = setTimeout(() => {
            setTextVisible(true);
        }, 1500);

        const buttonTimer = setTimeout(() => {
            setButtonVisible(true);
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(textTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    const handleClick = () => {
        setButtonText('Getting Started...');
        setShowMessage(true);
        navigate('/login'); // Redirect to login
    };

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <div style={styles.logoContainer}>
                    <img className="logo" src={logo} alt="Logo" style={styles.logo} />
                </div>
            </header>
            <main style={styles.content}>
                {headerVisible && (
                    <h2 style={styles.headerText}>Welcome to the Evolution of</h2>
                )}
                <img 
                    className="FOCUS" 
                    src={focusImage} 
                    alt="Focus" 
                    style={styles.centerImage} 
                />
                {textVisible && (
                    <p style={styles.simplifyText}>Simplify Your Tasks, Achieve Your Goals.</p>
                )}
                {buttonVisible && (
                    <button 
                        style={styles.centerButton} 
                        onClick={handleClick}
                    >
                        {buttonText}
                    </button>
                )}
                {showMessage && <p style={styles.messageText}>Great choice! Let’s make progress together.</p>}
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
        backgroundColor: '#ffffff',
        color: 'white',
        padding: '0 20px 0px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)',
    
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
       
        height: '60px',
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
    simplifyText: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 200,
        lineHeight: 'normal',
        letterSpacing: '6.4px',
        marginTop: '60px',
        marginBottom: '20px',
        opacity: 0,
        transform: 'translateX(-50px)',
        animation: 'text-fade-in 1s forwards 1s'
    },
    centerImage: {
        width: '900px',
        height: 'auto',
        marginBottom: '20px',
        opacity: 0,
        transform: 'translateX(50px)',
        animation: 'image-fade-in 1s forwards 1.5s'
    },
    centerButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '281px',
        height: '50px',
        backgroundColor: '#e2eaf1',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        color: 'black',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '20px',
        opacity: 0,
        transform: 'translateY(50px)',
        animation: 'button-slide-in 1s forwards 2s' 
    },
    messageText: {
        marginTop: '20px',
        fontSize: '24px',
        color: 'black',
        fontFamily: 'Poppins, sans-serif'
    },
    footer: {
        backgroundColor: '#8AAEC6',
        color: 'black',
        padding: '5px 0',
        textAlign: 'center',
        width: '100%',
        position: 'fixed',
        bottom: 0
    }
};

const stylesSheet = document.styleSheets[0];
stylesSheet.insertRule(`
    @keyframes header-fade-in {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
`, stylesSheet.cssRules.length);

stylesSheet.insertRule(`
    @keyframes text-fade-in {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
`, stylesSheet.cssRules.length);

stylesSheet.insertRule(`
    @keyframes image-fade-in {
        0% { opacity: 0; transform: translateX(50px); }
        100% { opacity: 1; transform: translateX(0); }
`, stylesSheet.cssRules.length);

stylesSheet.insertRule(`
    @keyframes button-slide-in {
        0% { opacity: 0; transform: translateY(50px); }
        100% { opacity: 1; transform: translateY(0); }
`, stylesSheet.cssRules.length);

export default HomePage;
