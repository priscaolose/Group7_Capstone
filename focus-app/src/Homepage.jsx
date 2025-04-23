// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useMediaQuery, useTheme,Button as MuiButton } from '@mui/material'; // Added useMediaQuery and useTheme
import logo from './Images/Focus-8.png';
import focusImage from './Images/focus.png';

const HomePage = () => {
    const [buttonText, setButtonText] = useState("Let's Get Started");
    const [showMessage, setShowMessage] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(false);
    const today = new Date();
    const year = today.getFullYear();
    const navigate = useNavigate();
    
    // Define theme and media query for responsive design
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={styles.pageContainer}>
                <header style={styles.header}>
                    <div style={styles.logoContainer}>
                        <img className="logo" src={logo} alt="Logo" style={styles.logo} />
                    </div>
                </header>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        px: isSmallScreen ? 2 : 6,
                        py: isSmallScreen ? 10 : 5,
                        backgroundColor: "white",
                        overflow: "auto",
                        width: '100%'
                    }}
                >
                    <main style={styles.content}>
                        {headerVisible && (
                            <h2 style={{
                                ...styles.headerText,
                                fontSize: isSmallScreen ? '32px' : '50px',
                                letterSpacing: isSmallScreen ? '8px' : '12.8px'
                            }}>
                                Welcome to the Evolution of
                            </h2>
                        )}
                        <img 
                            className="FOCUS" 
                            src={focusImage} 
                            alt="Focus" 
                            style={styles.centerImage} 
                        />
                        {textVisible && (
                            <p style={{
                                ...styles.simplifyText,
                                fontSize: isSmallScreen ? '24px' : '32px',
                                letterSpacing: isSmallScreen ? '4px' : '6.4px',
                                marginTop: isSmallScreen ? '30px' : '60px'
                            }}>
                                Simplify Your Tasks, Achieve Your Goals.
                            </p>
                        )}
                         {buttonVisible && (
                            <MuiButton
                                variant="contained"
                                onClick={handleClick}
                                sx={{
                                    width: '281px',
                                    height: '50px',
                                    backgroundColor: '#e2eaf1',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                                    color: 'black',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontSize: '20px',
                                    textTransform: 'none',
                                    opacity: 0,
                                    transform: 'translateY(50px)',
                                    animation: 'button-slide-in 1s forwards 1.7s',
                                    '&:hover': {
                                        backgroundColor: '#8AAEC6',
                                        color: 'white',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                {buttonText}
                            </MuiButton>
                        )}
                        {showMessage && (
                            <p style={{
                                ...styles.messageText,
                                fontSize: isSmallScreen ? '18px' : '24px'
                            }}>
                                Great choice! Let's make progress together.
                            </p>
                        )}
                    </main>
                </Box>
                <footer style={styles.footer}>
                    <p>&copy; {year} Focus. All rights reserved.</p>
                </footer>
            </div>
        </Box>
    );
};

const styles = {
    pageContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '100%',
    },
    header: {
        backgroundColor: '#ffffff',
        color: 'white',
        padding: '1px',
        paddingLeft: '10px',
        paddingRight: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)' /* Optional: Adds shadow for a dropdown effect */
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        height: '50px',
    },
    content: {
        flex: 1,
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
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
        maxWidth: '90%',
        height: 'auto',
        marginBottom: '20px',
        opacity: 0,
        transform: 'translateX(50px)',
        animation: 'image-fade-in 1s forwards 1.5s'
    },
    // centerButton: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: '281px',
    //     height: '50px',
    //     backgroundColor: '#e2eaf1',
    //     borderRadius: '10px',
    //     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    //     color: 'black',
    //     border: 'none',
    //     cursor: 'pointer',
    //     transition: 'background-color 0.3s, transform 0.2s',
    //     fontFamily: 'Poppins, sans-serif',
    //     fontSize: '20px',
    //     opacity: 0,
    //     transform: 'translateY(50px)',
    //     animation: 'button-slide-in 1s forwards 1.7s' ,
    //     '&:hover': {
    //         backgroundColor: '#8AAEC6',
    //         color: 'white',
    //         transform: 'scale(1.05)',
    //     },
    // },
      
    messageText: {
        marginTop: '20px',
        fontSize: '24px',
        color: 'black',
        fontFamily: 'Poppins, sans-serif'
    },
    footer: {
        backgroundColor: '#8AAEC6',
        color: 'black',
        textAlign: 'center',
        width: '100%',
        position: 'sticky',
        bottom: 0,
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 0',
        marginTop: '5%',
        flexShrink: 0,
        boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.2)',
        '@media (max-width: 600px)': {
            backgroundColor: '#8AAEC6',
            color: 'black',
            textAlign: 'center',
            width: '100%',
            position: 'sticky',
            bottom: -1,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px 0',
            marginTop: '5%',
            flexShrink: 0,
            boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.2)',
          },
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