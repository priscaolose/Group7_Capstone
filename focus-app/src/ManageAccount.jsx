import React, { useState } from 'react';
import Header2 from './Components/Header2';
import { updateUserInfo,extractUsersData } from './Api/accountManagement';
import { useUser } from './Components/context';
import { useEffect } from 'react';
const ManageAccountPage = () => {
    const { user } = useUser();
    console.log("user",user)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phonenumber: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return; 

            try {
                const originalFormData = await extractUsersData(user);
                console.log("originalFormData", originalFormData);
                
                if (originalFormData) {
                    console.log("originalFormData", originalFormData);
        
                    setFormData({
                        firstName: originalFormData.firstName ||originalFormData.displayName.split(' ')[0] ||'',
                        lastName: originalFormData.lastName || originalFormData.displayName.split(' ')[1]||'',
                        phonenumber: originalFormData.phonenumber || '',
                        email: originalFormData.email || '',
                        password: originalFormData.password || '',
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    },[] ); 


    const [message, setSuccessMessage] = useState('');
    const [selectedSection, setSelectedSection] = useState('profile'); // Track selected section
    const today = new Date();
    const year = today.getFullYear();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("user",user)
        console.log("berfore",user.firstName)
        try{
            updateUserInfo (user,formData);
            setSuccessMessage('Your account details have been successfully updated!');
        }catch (error) {
            console.error("Error updating user info:", error);
            setSuccessMessage('Failed to update account details. Please try again.');
        }
        console.log("after",user.firstName)
    };

    const handleSidebarClick = (section) => {
        setSelectedSection(section); 
        setSuccessMessage(' ');
    };

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword((prev) => !prev)
    };

    const [showNewPassword, setShowNewPassword] = useState(false);

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prev) => !prev)
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev)
    };
    
    return (
        <div style={styles.pageContainer}>
                  <Header2 />

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
    
                    </ul>
                </aside>
                <main style={styles.content}>
                    <h1 style={styles.heading}>Manage Account Details</h1>
                    
                    {selectedSection === 'profile' && (
                        <form style={styles.form} onSubmit={handleFormSubmit}>
                            <p>Adjust your profile settings.</p>
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
                                <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <button type="submit" style={styles.submitButton}>Save Changes</button>
                        </form>
                    )}
                    
                    {selectedSection === 'security' && (
                        <form style={styles.form} onSubmit={handleFormSubmit}>
                        <p>Adjust your password settings.</p>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Current Password</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type={showCurrentPassword ? "text" : "password"} 
                                    name="currentPassword" 
                                    value={formData.currentPassword} 
                                    onChange={handleInputChange} 
                                    style={styles.input} 
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleCurrentPasswordVisibility} 
                                    style={{
                                        background: 'none',
                                        border: '1px  #ccc',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {showCurrentPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>New Password</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type={showNewPassword ? "text" : "password"} 
                                    name="newPassword" 
                                    value={formData.newPassword} 
                                    onChange={handleInputChange} 
                                    style={styles.input} 
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleNewPasswordVisibility} 
                                    style={{
                                        background: 'none',
                                        border: '1px  #ccc',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {showNewPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Confirm Password</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleInputChange} 
                                    style={styles.input} 
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleConfirmPasswordVisibility} 
                                    style={{
                                        background: 'none',
                                        border: '1px  #ccc',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                            <p style={{ color: 'red'}}>Passwords do not match!</p>
                        )}
                        <button type="submit" style={styles.submitButton}>Save Changes</button>

                    </form>
                    )}
                    

                    {message && <p style={styles.messageText}>{message}</p>}
                    
                </main>
            </div>
            <footer style={styles.footer}>
                <p>&copy; {year} Focus. All rights reserved.</p>
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
        width: '200px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        alignItems: 'flex-start',
        textAlign: 'left',
        paddingLeft: '40px',
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
    notificationsSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '20px',
        paddingLeft: '100px',
        width: '100%',
    },

    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },

    checkbox: {
        width: '20px',
        height: '20px',
    },

    checkboxLabel: {
        fontSize: '14px',
        color: '#2c2f33',
    },
};

export default ManageAccountPage;