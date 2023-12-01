const express = require('express');
const app = express();
const port = 4000; // Choose any port you prefer
app.use(express.json());
// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// Define a route
app.get('/', (req, res) => {
  try {
    // Your logic here to process the request and generate a response
    console.log("hitttttted")
    const responseData = 'hello Welcome to my Node.js server!';

    // Setting status code and sending response
    res.status(200).send(responseData);
  } catch (error) {
    // Handling errors, if any
    console.error('Error:', error);
    res.status(500).send('Internal Server Error'); // Sending an error response with status code 500
  }

});


const Credentials = {
  userId: 'admin',
  password: 'admin'
};



// Route for login verification
app.post('/login', (req, res) => {
  console.log("came")
  const { userId, password } = req.body;

  // Comparing user credentials with hardcoded credentials
  if (userId === Credentials.userId && password === Credentials.password) {
    // If verified, send 'verified' as response
    res.send('verified');
  } else {
    // If not verified, send 'unverified' as response
    res.send('unverified');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});