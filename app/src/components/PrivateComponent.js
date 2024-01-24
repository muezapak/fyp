import React from 'react'
import { useState} from 'react';
import { Navigate, Outlet} from 'react-router-dom'
import { useEffect } from 'react';
import useAuth from './checkSession';

// import statements...

function PrivateComponent() {
    const { user, loading, checkSession } = useAuth();
    console.log("user in private cmponent  "+user)
    const [dataLoaded, setDataLoaded] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        await checkSession();
        setDataLoaded(true);
        console.log("user in private cmponent  "+user)
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
        //checkSession();
        console.log("user in private cmponent  "+user)
      }, [user]);

    if (!dataLoaded) {
      return <div>Loading...</div>;
    }
  
    // Check if user is present before rendering Outlet or Navigate
    return user  ? <Outlet user1={user} /> : <Navigate to="signup" />;
  }
  
  export default PrivateComponent;
  