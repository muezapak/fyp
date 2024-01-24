
import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import useAuth from './checkSession';
function Login() {
  
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const { user, loading, checkSession } = useAuth();
    const navigate = useNavigate();
    const fetchData = async () => {
      await checkSession();
     
    };
    useEffect(() => {
    
  
      fetchData();
     // console.log("user in session in nav"+user)
    }, []);
  


    if (loading) {
      return <div>Loading...</div>;
    }

    if(user)
    {
      navigate('/')
    }
    const handleLogin = async () => {
        console.warn( email, password);
    
        try {
          const response = await axios.post("http://localhost:4000/login", {
            email,
            password,
          }, {
            withCredentials: true, // Ensure credentials (cookies) are sent
          });
          if (response.data.username) {
            localStorage.setItem('user', JSON.stringify(response.data));
          
        } 
        else {
           // alert("Please enter correct details")
           console.log("not valid")
        }
        navigate("/")
        } catch (error) {
          console.error("Error:", error);
          // Handle error (e.g., show a message to the user)
        }
    }

   

    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
  
}

export default Login
