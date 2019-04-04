const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const AnnouncementSchema = new Schema({
    /*Author: {
        type: String,
        required: true
    },
        */
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// export the new Schema so we could modify it using Node.js
module.exports = Announcement = mongoose.model('announcement', AnnouncementSchema);