const express = require('express');
const app = express();
const connectDb = require('./db/connection');
const userRoutes = require('./routes/UserRoutes');
const session = require('express-session');

app.use(session({
    secret: "secretkey",
    resave : false,
    saveUninitialized : true,
}));


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine', 'ejs');

connectDb();
app.use('/users',userRoutes);
app.listen(3000, ()=>{
    console.log("Running on port http://localhost:3000");
})