import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth from './checkSession';

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Moved useNavigate here




  // const { user, loading, checkSession } = useAuth(); // Using the useAuth hook
  // console.log("user in session is present "+user);

  // useEffect(() => {
  //   // Call checkSession when the component mounts
  //   checkSession();
  // }, []); // Empty dependency array ensures it runs only once when the component mounts



//   useEffect(() => {
//     const auth = localStorage.getItem('user');
//     if (auth) {
//         const authObject = JSON.parse(auth); // Convert the JSON string to an object
//       //  const dataSection = authObject.data; // Access the 'data' property within the object
        
//         if (authObject.data) {
//           console.log(authObject.data); // Log the 'data' section
//           // Other operations with 'dataSection' if needed
//         }
    
//       //  console.log(auth)
//        // navigate('/')
//        console.log()

//     }
// }, [])

  const collectData = async () => {
    console.warn(username, email, password);

    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        email,
        password,
      }, {
        withCredentials: true, // Ensure credentials (cookies) are sent
      });

      console.warn(response);
     
    } catch (error) {
      console.log("error in signup")
      console.error("Error:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  
 
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};
export default Signup;
