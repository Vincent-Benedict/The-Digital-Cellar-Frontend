import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './LoginPage.css'

export default function LoginPage() {

    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({username: '', password: '', unauthorized: ''})

    const [showSuccess, setShowSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [countdown, setCountdown] = useState(2); // 

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: 'POST',
                url: `https://thedigitalcellarbackend.000webhostapp.com/api/login`,
                data: {
                    username: form.username,
                    password: form.password
                },
                withCredentials: 'true', 
            })

            if(response.status === 200 && response.data.error !== "Unauthorized") {
                
                setErrors({
                    username: '',
                    password: '',
                    unauthorized: ''
                })

                setShowSuccess(true);

                const timer = setInterval(() => {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                  }, 1000);

                  setTimeout(() => {
                    clearInterval(timer);
                    setRedirect(true);
                  }, countdown * 1000);
            } else if(response.status === 200 && response.data.error === "Unauthorized"){
                setErrors({
                    username: '',
                    password: '',
                    unauthorized: 'Invalid User'
                })
            }

        } catch (error) {
            console.log(error)
            setErrors({
                username: error.response.data.errors?.username,
                password: error.response.data.errors?.password,
                unauthorized: ''
            })
        }
        
    };

    if (redirect) {
        return <Navigate to="/home" />;
    }

    return (

        <React.Fragment>
        <Header/>
            <main className='main-update'>
                <div className='update-title'>Login Page</div>

                <form onSubmit={handleSubmit}>
                    <div className='label'>
                        <label>Username:</label>
                    </div>
                    <input type="text" value={form.username} name="username" onChange={handleChange} />
                    <p className='error-label'>{errors.username}</p>
                    <div className='label'>
                        <label>Password:</label>
                    </div>
                    <input type="password" name="password" onChange={handleChange} />
                    <p className='error-label'>{errors.password}</p>
                    <div className='btn-submit'>
                        <button type="submit">Login</button>
                    </div>

                    <p className='error-label unauth'>{errors.unauthorized}</p>
                    
                </form>

                {showSuccess && (
                    <div className='loading-spinner'>
                        <p>Login successful!</p>
                        <p>Redirecting in {countdown} seconds...</p>
                    </div>
                )}
            </main>
            
        </React.Fragment>
    )
}