const express = require('express');
const app = express();
const port = 4000; // Choose any port you prefer
app.use(express.json());
//const connectDB = require('./db/Config'); // Assuming db.js is in the same directory

// Connect to the database by calling the function from db.js
connectDB();
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
    const responseData = 'Welcome to my Node.js server!';

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



////////////////////////////////////////
app.post("/add-product", async (req, resp) => {
  console.log(req.body);
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
})

app.get("/products", async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
      resp.send(products)
  } else {
      resp.send({ result: "No Product found" })
  }
})

app.delete("/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result)
}),

app.get("/product/:id",async (req, resp)=>{
  let result  = await Product.findOne({_id:req.params.id})
  if(result){
      resp.send(result)
  }else{
      resp.send({"result":"No Record Found."})
  }
})

app.put("/product/:id", async (req, resp) => {
  console.log(req.body);
  let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
  )
  resp.send(result)
});


app.get("/search/:key", async (req, resp) => {
  console.log( req.params.key);
  let result = await Product.find({
      "$or": [
          {
              name: { $regex: req.params.key }  
          },
          {
              company: { $regex: req.params.key }
          },
          {
              category: { $regex: req.params.key }
          }
      ]
  });
  console.log(result);
  resp.send(result);
})////////////////////////////////////////////











// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});