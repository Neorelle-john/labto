const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserAccount = require('../models/userAccounts');
const bcrypt = require('bcrypt');

const requireLogin = (req, res,next) =>{
    if(!req.session.userId){
        return res.redirect('/users/login')
    };
    next();
}

router.get('/new', (req, res)=>{
    res.render('new' , {formData : {}, errors : {}});
});


router.post('/', async (req, res)=>{
    try{
    const user = await User.create(req.body);
    res.redirect('/users');
    }catch(err){
        console.error(err)
        res.render('/new', {formData : {}, errors: err.errors})
    }
    
});

router.get('/', requireLogin,async (req, res)=>{
    const users = await User.find();
    res.render('user', {users});
});


router.get('/login', async (req,res)=>{
    res.render('login');
});

router.post('/login', async (req,res)=>{
    try{
        const {username, password } = req.body;
        const user = await UserAccount.findOne({username});
        if (user && await bcrypt.compare(password, user.password)){
            req.session.userId= user._id;
            res.redirect('/users');
        }else{
            res.status(400).json({message: "Invalid username"});
        }
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Login Failed"});
    }
});

router.get('/register', async(req, res)=>{
    res.render('registration');
});

router.post('/register', async (req,res)=>{
    try{
        const {username , password  } = req.body;
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new UserAccount({username, password : hashedPass});
        await newUser.save();
        res.redirect('/users/login');
    }catch (err){
        console.log(err);
        res.status(500).json({error: "cannot Register"});
    }
});  // LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.status(500).send("Could not log out. Please try again.");
        }
        res.redirect('/users/login'); // redirect to login after logout
    });
});

// DELETE USER
router.post('/delete/:id', requireLogin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users'); // redirect back to user list
    } catch (err) {
        console.log(err);
        res.status(500).send("Cannot delete user");
    }
});



module.exports = router;