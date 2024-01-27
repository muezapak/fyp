// Import necessary modules
const express = require('express');
const passport = require('passport');
const Product = require("./db/Product")
const  Document= require("./db/Document")
const  Folder= require("./db/Folder")
const multer = require('multer')
const AWS = require('aws-sdk');
const cors=require('cors')
const fs = require('fs');
const mongoSanitize = require('express-mongo-sanitize');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./db/User'); // Import the User model
const passportLocalMongoose = require('passport-local-mongoose');
const connectDB=require("./db/Config");
const MongoStore = require('connect-mongo');
const path = require('path');
//const flash=require('connect-flash')
const flash = require('express-flash');
const userRoutes = require('./routes/users');
 require("dotenv").config()

let id=0;
console.log(process.env.KeyId)
console.log(process.env.AccessKey)


// Initialize Express app
const app = express();
// app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // Replace with your React app's URL
//     credentials: true, // Enable credentials (cookies)
//   }));


  const corsOptions = {
    origin: 'http://localhost:3000', // Replace this with your React app's URL
    credentials: true, // Enable CORS with credentials
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json()); 
connectDB();


// Middleware setup
const store = MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/e-com',
    collectionName: 'sessions', // Optional: Specify the session collection name
    ttl: 24 * 60 * 60, // Time-to-live (expiration time) in seconds
  });
  
  // Configure session middleware with MongoDBStore
 
  app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      },
    })
  );
  


  
// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log("session info in use")
    console.log(req.session)
    console.log("user info in session use")
    console.log(req.user)
     //res.locals.currentUser = req.user;
    //  res.locals.success = req.flash('success');
    //  res.locals.error = req.flash('error');
    next();
})

  // AWS S3 configuration
  const s3 = new AWS.S3({
    accessKeyId: process.env.KeyId,
    secretAccessKey: process.env.AccessKey
  });

// Configure Passport local strategy to authenticate users using email
passport.use(new LocalStrategy(
    {
      usernameField: 'email', // Specify that the 'email' field will be used for authentication
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
  
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
  
        const isAuthenticated = await user.authenticate(password);
  
        if (!isAuthenticated) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  



// Registration Route
app.post('/register', async (req, res) => {
    console.log("in register");
    const { username, password, email } = req.body;
  
    try {
      const newUser = await User.register(new User({ username, email }), password);
  
      req.login(newUser, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error creating user session.');
        }
  
        console.log(req.user);
  
        const folderName = `${newUser.username}_${newUser._id}`;
  
        // Create a new folder for the user in AWS S3
        const s3Params = {
          Bucket: 'newmulterbucket',
          Key: `${folderName}/`,
          Body: '',
        };
  
        await s3.putObject(s3Params).promise();
  
        console.log("new folder created in AWS S3");
  
        const newFolder = new Folder({
          userId: newUser._id,
          folderName: folderName,
          documents: [],
        });
  
        await newFolder.save();
  
        // Store the user ID in the session
        req.session.userId = newUser._id;
        console.log("session created " + req.session.userId);
  
        const userWithoutPassword = {
            userId: newUser._id,
            username: newUser.username,
          };
    
        res.status(200).json(userWithoutPassword); // Send the response after all operations complete
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error registering user.');
    }
  });
  

  // app.post("/documents", async (req, resp) => {
  //   const {  userId } = req.body;
  //   const folder = await Folder.find();
  //   if (docs.length > 0) {
  //       resp.send(docs)
  //   } else {
  //       resp.send({ result: "No document found" })
  //   }
  // })
  app.get('/checkSession', async (req, res) => {
    console.log("check session called")
    console.log(req.session)
    //_id
    console.log("Ging")
      if (req.session && req.user) {
        // User is logged in
        console.log("req.user in session check"+req.user)
        const user_id = req.user._id;
        id=req.user._id;
        res.status(200).json({ message: 'User is logged in', user_id });
       // res.status(200).json({ loggedIn: true, userId: req.session.userId });
      } else {
        // User is not logged in
        res.status(200).json({ loggedIn: false });
      }
    
      });
  
  app.post("/documents", async (req, res) => {

    console.log("documents called")
console.log(req.session)
//_id
console.log("hi")
console.log("global id"+id)



    try {
     // const { userId } = req.body;
     
     const userId = id;
      // Find the folder associated with the userId
      const folder = await Folder.findOne({ userId });
  
      if (!folder) {
        return res.send({ result: "No folder found for this user" });
      }
  
      // Retrieve documents using the IDs stored in the folder's documents array
      const documents = await Document.find({ _id: { $in: folder.documents } });
  
      if (documents.length > 0) {
        res.send(documents);
      } else {
        res.send({ result: "No documents found in this folder" });
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).send({ error: 'Failed to fetch documents' });
    }
  });
  

app.post('/echo', (req, res) => {
    // const { url, method, headers, body } = req; // Extracting non-circular properties
    // const safeRequestObject = { url, method, headers, body }; // Creating a safe object to send
  
    // res.json({ request: safeRequestObject });
    if(req.session.userId)
    {
        res.send
    }
  });


  app.post('/login', passport.authenticate('local'), async (req, res) => {
    console.log("in login")
    const {  email } = req.body;
    const user = await User.findOne({ email: email });
    
    // If the authentication was successful, this callback function will be executed
    // `passport.authenticate('local')` middleware handles the authentication process
    
    // At this point, if the control reaches here, it means the user is authenticated

    const userWithoutPassword = {
        userId: user._id,
        username: user.username,
      };

    res.status(200).json(userWithoutPassword);
    //res.status(200).send('Login successful');
  });




  async function findFolderIDByUserID(userId) {
    try {
      console.log("in find folder")
     // const userID = localStorage.getItem('user');
      const folder = await Folder.findOne({ userId}); // Assuming userID is the field name in your schema
      
      if (!folder) {
       // return null; 
        // Return null or any default value if folder is not found
        console.log("no folder found");
      }
      console.log("folder  "+folder);
      return folder; // Return the folderId (assuming it's stored as _id in MongoDB)
    } catch (error) {
      console.error('Error fetching folder:', error);
      return null; // Return null or any default value on error
    }
  }


  


  
// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// Route to upload a file to S3 bucket
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const userId = id;
    console.log("in upload the user id is "+userId)
    const folder = await findFolderIDByUserID(userId);

if(!folder)
{
  //folderName
  res.send("no folder found");
}
     
    const fileContent = fs.readFileSync(req.file.path);
    
    // const params = {
    //   Bucket: 'newmulterbucket',
    //   Key: req.file.originalname,
    //   Body: fileContent,
    // };


    const params = {
      Bucket: 'newmulterbucket',
      Key: `${folder.folderName}/${req.file.originalname}`, // Include folder name in Key
      Body: fileContent,
    };


    const uploadResult = await s3.upload(params).promise();

    fs.unlinkSync(req.file.path);

  const newFileDocument = new Document({ name: req.file.originalname, url: uploadResult.Location, bucket: uploadResult.Bucket, userId: userId });

    let savedDocument = await newFileDocument.save();
    console.log(savedDocument);
    folder.documents.push(savedDocument._id);
    await folder.save();
    console.log('Upload information stored in MongoDB');

  
    res.status(200).json({ message: 'File uploaded successfully', data: uploadResult });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});



app.post("/search/:key", async (req, resp) => {
  const userId = id;
  console.log("in search the user id is " + userId);
  console.log(req.params.key);

  try {
    // Search documents with the given key, considering the userId
    const documents = await Document.find({
      userId: userId, // Assuming 'userId' is the field name in your Document schema
      name: { $regex: req.params.key, $options: 'i' } // Case-insensitive search
    });

    console.log(documents);
    resp.send(documents);
  } catch (error) {
    console.error("Error searching documents:", error);
    resp.status(500).send("Failed to search documents");
  }
});

////////////////////////////////////////////

app.post('/logout', async (req, res) => {
  try {
    // Destroy the session on the server side
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Clear any client-side session-related information (e.g., cookies)
      res.clearCookie('connect.sid');
     id=0;
      // Send a response indicating successful logout
      res.status(200).json({ message: 'Logout successful' });
    });

    // Remove the session data from the MongoDB store
    await store.clear();
  } catch (error) {
    console.error('Error clearing session from MongoDB:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
