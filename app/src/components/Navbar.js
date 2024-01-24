import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from './checkSession';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Nav = () => {
  const { user, loading, checkSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await checkSession();
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("user in nav component " + user);
  }, [user]);

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/logout", {
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
      }

      navigate('/signup');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        alt='logo'
        className='logo'
        src='https://yt3.ggpht.com/ytc/AKedOLR09bCpy_XTq2scU91URc0pWG0EqS_Yc_Zg-r9pBQ=s900-c-k-c0x00ffffff-no-rj'
      />

      {user ? (
        <ul className="nav-ul">
          <li><Link to="/">Documents</Link></li>
          <li><Link to="/upload">Upload Documents</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/example">Example</Link></li>
          <li><Link onClick={logout} to="/signup">Logout</Link></li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
