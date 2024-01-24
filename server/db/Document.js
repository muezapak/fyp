const mongoose= require('mongoose');
//getting user model
const User = require('./User');
const documentSchema= new mongoose.Schema({
    name: String,
    url: String,
    bucket: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
    access: { type: String, default: 'prv' },
    date: { type: Date, default: Date.now },
});

// module.exports = mongoose.model('UploadInfo', documentSchema);
module.exports = mongoose.model('documents', documentSchema);
 