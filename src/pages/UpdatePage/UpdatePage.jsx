import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import UserModel from '../../models/UserModel';
import './UpdatePage.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function UpdatePage() {

    const { id } = useParams();
    const [user, setUser] = useState();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({username: '', email: '', password: '' })

    const [showSuccess, setShowSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [countdown, setCountdown] = useState(3); // 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    
        try {
            const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                credentials: 'include'
            });
            const data = await response.json();
            setUser(new UserModel(data.id, data.name, data.email));
            
            setForm({
                username: data.username,
                email: data.email,
                password: ''
            })
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:8000/api/users/update/${id}`,
                data: {
                    username: form.username,
                    email: form.email,
                    password: form.password
                },
                withCredentials: 'true'
            })

            if(response.status === 200) {
                setErrors({
                    username: '',
                    email: '',
                    password: ''
                })

                setShowSuccess(true);

                const timer = setInterval(() => {
                    setCountdown((prevCountdown) => prevCountdown - 1);
                  }, 1000);

                  setTimeout(() => {
                    clearInterval(timer);
                    setRedirect(true);
                  }, countdown * 1000);
            }

        } catch (error) {
            setErrors({
                username: error.response.data.errors?.username,
                email: error.response.data.errors?.email,
                password: error.response.data.errors?.password
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
                <div className='update-title'>Update Page</div>

                <form onSubmit={handleSubmit}>
                    <div className='label'>
                        <label>Username:</label>
                    </div>
                    <input type="text" value={form.username} name="username" onChange={handleChange} />
                    <p className='error-label'>{errors.username}</p>
                    <div className='label'>
                    <label className='label'>Email:</label>
                    </div>
                    <input type="text" value={form.email} name="email" onChange={handleChange} />
                    <p className='error-label'>{errors.email}</p>
                    <div className='label'>
                    <label>Password:</label>
                    </div>
                    <input type="password" name="password" onChange={handleChange} />
                    <p className='error-label'>{errors.password}</p>
                    <div className='btn-submit'>
                        <button type="submit">Update</button>
                    </div>
                    
                </form>

                {showSuccess && (
                    <div className='loading-spinner'>
                        <p>Update successful!</p>
                        <p>Redirecting in {countdown} seconds...</p>
                    </div>
                )}
            </main>
            
        </React.Fragment>
        
    );
}