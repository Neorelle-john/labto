const mongoose = require('mongoose');

const UserAccount = new mongoose.Schema({
    username : {
        type : String ,
        required : [true, "Username is required."], unique: true
    },
    password :{
        type : String,
        required : [true, "Password is required."], minlength: 4,
    },
});


module.exports = new mongoose.model("UserAccount", UserAccount);