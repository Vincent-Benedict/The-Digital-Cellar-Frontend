import React, { useState, useEffect } from 'react';
import userLogo from '../../assets/user-logo.png';
import { Link } from 'react-router-dom';
import './User.css'
import axios from 'axios';
import UserModel from '../../models/UserModel';

export default function User(props){

    const user = props?.user;

    const [userAuth, setUserAuth] = useState(null);

    const handleDelete = () => {
        props.onDeleteClick(user?.id)
    }

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
                setUserAuth(new UserModel(data.id, data.username, data.email));
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='user-container'>
            <div className='user-container-identity'>
                <div className='user-image'>
                    <img src={userLogo} alt=""/>
                </div>
                <div className='user-name-email'>
                    <p className='user-name'>{user?.username}</p>
                    <p className='user-email'>{user?.email}</p>
                </div>
            </div>
            <div className='user-container-button'>
                <div>
                    <Link to={`/update/${user?.id}`}>
                        <button className='button-update'>Update</button>
                    </Link>
                </div>
                <div>

                { userAuth?.username != user.username ? 
                (<button onClick={handleDelete} 
                    className='button-delete'>Delete</button>) 
                    : (null)
                }
                    
                </div>
            </div>
        </div>



    )
}