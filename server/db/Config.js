const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-com', {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = connectDB;