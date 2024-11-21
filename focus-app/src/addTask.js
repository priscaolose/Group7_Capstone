import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';

const AddTask = (email) =>{
    const navigate = useNavigate();
    return (
        <div className="mainContainer"> 
        <Header />
            Add Task
        <Footer />
        </div>
    )
}

export default AddTask;