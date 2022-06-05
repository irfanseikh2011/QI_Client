import React, {useState,wrapState} from "react";
import "./css/Header.css";
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

// export const [searchData,setSearchData] = () => wrapState(useState())

const Header = () => {

const user = useSelector(selectUser)
const history = useHistory()


  return (
    <header>
      <div className="header-container">
        <div className="header-left"> 
        <Link to="/">
        <img src="./logo.png" alt="logo"/>
        </Link>
          <Link to="/">
          <h3>Queue Interest</h3>
          </Link>
        </div>
        <div className="header-right">
        <div className="header-right-container">
          <span><Avatar src={user?.photo}/></span>
          <LogoutIcon onClick={()=> {auth.signOut() 
          history.push('/auth')}}/>
          <MailIcon/>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
