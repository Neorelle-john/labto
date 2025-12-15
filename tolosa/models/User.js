const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, "Name is required."],
    },
    age: {
        type : Number,
        required : [true, "Age is required"],
    },
    course :{
        type : String,
        enum : ["BSIT", "BSCE", "BSME"],
        required : [true, "course is required"],
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
});


module.exports = new mongoose.model("User", userSchema);