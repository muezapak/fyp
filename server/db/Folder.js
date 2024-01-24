const mongoose= require('mongoose');
const User = require('./User');
const  Document= require("./Document")



const folderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  folderName: {
    type: String,
    required: true,
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document', // Reference to the Document model
  }],// Array to hold uploaded documents
});

module.exports = mongoose.model('folders', folderSchema);
