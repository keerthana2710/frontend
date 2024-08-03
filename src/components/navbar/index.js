import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const Navbar = () => {
    const navigation = useNavigate();
    const [status,setStatus] = useState(false);

    useEffect(()=>{
        try{
            const data = JSON.parse(localStorage.getItem('Logged_in'))
        if(data.user.id){
            setStatus(true)
        }
        else{
            setStatus(false)
        }
        }
        catch(err){
            console.log(err)
        }
    })
    const naviLogin=()=>{
        navigation('/login')
    }
    const naviHome = ()=>{
        navigation('/')
    }
    const naviLogout = ()=>{
        localStorage.clear('logged_in');
        navigation('/login')
    }
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Event Management</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <button className='btn' onClick={naviHome}>Home</button>
                </li>
                {status ?<li>
                    <button className='btn' onClick={naviLogout}>Logout</button>
                </li> :<li>
                    <button className='btn' onClick={naviLogin}>Login</button>
                </li>}
            </ul>
        </nav>
        
    );
};

export default Navbar;
