import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../components/Header/Header';
import User from '../../components/User/User';
import './HomePage.css'
import { Link } from 'react-router-dom';
import UserModel from '../../models/UserModel';

export default function HomePage() {

    const [users, setUsers] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
    
        try {
            const response = await fetch(`http://localhost:8000/api/users?page=${currentPage}`, {
                credentials: 'include',
            });
            const data = await response.json();
            
            let users = [];
            for(let u of data.data){
                users.push(new UserModel(u.id, u.username, u.email))
            }
       
            setUsers(users)
            setLastPage(data.last_page)
            setCurrentPage(data.current_page)
        } catch (error) {
            console.error('Error fetching data:', error);
          }
    
    };

    const onDeleteClick = async (id) => {

        const isConfirmed = window.confirm('Are you sure you want to delete this user?');

        if(isConfirmed) {
            try {
                await fetch(`http://localhost:8000/api/users/delete/${id}`, {
                  method: 'DELETE',
                  credentials: 'include',
                });
                
                if((users.length - 1)% 5 == 0) {
                    setCurrentPage(currentPage-1)
                    return;
                }
                
                fetchData();
                
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
        
    }

    const handleCickPrev = () => {
        if(currentPage>1) {
            setCurrentPage(currentPage-1)
        }
    };

    const handleCickNext = (e) => {
        if(currentPage<lastPage){
            setCurrentPage(currentPage+1)
        }
    };

    return (
        <React.Fragment>
            <Header/>
            <main className='main-home'>
                <div className='main-title'>
                    <div>
                        <p>User List</p>
                    </div>
                    <div>
                        <Link to={`/insert`}>
                            <button className='btn-add-user'>Add User Here..</button>
                        </Link>
                       
                    </div>
                </div>
                <div className='main-data'>
                {
                    users?.map((u, index) => 
                        <User key={index} index={index}  user={u} onDeleteClick={onDeleteClick}/>
                    )
                }
                </div>
                <div className='main-btn'>
                    <button onClick={handleCickPrev} className='btn-prev'>
                        prev
                    </button>
                    <p>{currentPage} / {lastPage}</p>
                    <button onClick={handleCickNext} className='btn-next'>
                        next
                    </button>
                </div>
            </main>
        </React.Fragment>
    )
}