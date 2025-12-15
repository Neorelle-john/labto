const e = require('express');
const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/pracexam', {
        });
        console.log("Connected sucessfully");
    } catch (err){
        console.error("Connection faild", err.message);
        process.exit(1);
    };
};

module.exports = connectDb;