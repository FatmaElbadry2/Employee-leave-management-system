const express = require('express');
const router = express.Router();
const user_services=require("../services/user");
const user=require("../models/user");
const env=require("../config/env");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Roles=require("../config/passport").Roles


router.post('/register', (req,res) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
        email:req.body.email,
        role:req.body.role,
        manager:req.body.manager
    };
    user_services.registerUser(user, returned => {
        res.json(returned)
    });

});


router.post('/login', (req,res) => {

    let data = {
        username: req.body.username,
        password: req.body.password
        
    };  
   user.findOne({where: {username: data.username}}).then(user => {
       if (user!=null){
        user_services.comparePassword(data.password,user.password, (err, isMatched) => {
            console.log("from compare",isMatched);
            if (err) throw err;
            if(isMatched){
                const token = jwt.sign({
                    type: "user",
                    _id: user.id,
                    username: user.username,
                    role: user.role
                },env.secret,
                    {
                        expiresIn: 604800
                    });
                return res.json({
                    token: token,
                    role:user.role
                })
            }else{
                return res.json({
                    message: "Wrong Password"
                })
            }
        })
    }
    else{
        return res.json({
            message:"This user name doesn't exist"
        })
    }}

).catch(err => {
        return res.json(err.errors)
    })

});

module.exports = router;