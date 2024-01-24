import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      //http://localhost:4000/register
      const response = await axios.get('http://localhost:4000/checkSession', { withCredentials: true });
      console.log(response.data); // The user information or session status returned by the server
            setUser(response.data.user_id);
          
       console.log("response id"+response.data.user_id)
      // setUser(34)
      
    } catch (error) {
      console.error('Error checking session:', error);
      console.log("error"+error)
      setUser(null);
    } finally {
      setLoading(false);
    }




    //     console.log("checking session");
    //   const response = await axios.get('http://localhost:4000/checkSession');
    //   setUser(response.data.user);
    //   console.log(response.data.user)
    // } catch (error) {
  
  };

  useEffect(() => {
    checkSession();
    //console.log("user in check session  "+user)
  }, [user]);
  useEffect(() => {
    //checkSession();
    console.log("user in check session  "+user)
  }, [user]);
  

  return { user, loading, checkSession };
};

export default useAuth;
