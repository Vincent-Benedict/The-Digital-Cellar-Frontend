import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../models/UserModel';

export default function Header(){

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            await axios({
                method: 'GET',
                url: `https://thedigitalcellarbackend.000webhostapp.com/api/user`,
                withCredentials: 'true'
            }).then(response => {
                const data = response.data;
                setUser(new UserModel(data.id, data.username, data.email));
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async () => {
        try {
            await axios({
                method: 'POST',
                url: `https://thedigitalcellarbackend.000webhostapp.com/api/logout`,
                withCredentials: 'true'
            }).then(response => {
                console.log(response);
                navigate('/');
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id='header'>
            { 
            user?.username != null ? (
                <div className='welcome-message'>
                    <p>Welcome {user?.username}!</p>
                    <Link onClick={handleLogout} to={`/`}>
                    <button id='logout-btn'>Logout</button>
                    </Link>  
                </div>) : (null)
            }
            
            <div className='title-container'>
                {
                    user?.username != null ? (
                        <Link to={`/home`}><p className='title'>The Digital Cellar</p></Link>  
                    ) : (
                        <p className='title'>The Digital Cellar</p>
                    )
                }
                
            </div>
                
            
        </div>
        
    );
}