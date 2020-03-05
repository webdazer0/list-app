const { Schema, model } = require('mongoose');

const Users = new Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3 
    }
}, {
    timestamps: true
})

module.exports = model('Users', Users)