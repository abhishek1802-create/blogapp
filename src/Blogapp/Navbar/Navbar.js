import React, { useState } from 'react'
import './Navbar.css'
import logo from '../assets/download.png'
import {useNavigate} from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';

function Navbar() {
let [menudata,setmenudata]=useState(false)
  let navigate = useNavigate();

  let res = localStorage.getItem('user');
  let user = JSON.parse(res);
 
  const {profilePic} = user;
  console.log(profilePic)
  // let imageurl = profilePic.split('\\uploads\\')[1]
  let imageurl = profilePic.split('\\uploads\\')[1]
  console.log(imageurl)
  console.log(`${process.env.REACT_APP_BACKENDURL}/uploads/${imageurl}`)

  function handleLogOut(){
     localStorage.clear();
     navigate('/');
  }

  return (
    <div className='Navbar'>
    {console.log(window.screen.width)}
    {menudata && <div id='menubox' style={{width:'33%',height:'6%',position:'absolute',right:0,top:"60px" , flexDirection: 'column', gap: '10px', padding: '10px 10px'}}>
    <div id='Menu_authButton' onClick={handleLogOut}>Logout</div>
    </div>}
    
        <div className="logo">
        <Link to='/blogList'><img src={logo} alt="logo" id='logoImage' style={{cursor:'pointer'}} /></Link>
        </div>
        <div className="navList">
             <img src={`${process.env.REACT_APP_BACKENDURL}/uploads/${imageurl}`} alt="userPic" id='userPic' />
              <button id='authButton' onClick={handleLogOut}>Logout</button>
              <div className='menu' onClick={()=>setmenudata((prev)=>!prev)}><IoIosMenu style={{fontSize:'30px'}}/></div>
        </div>
    </div>
  )
}

export default Navbar