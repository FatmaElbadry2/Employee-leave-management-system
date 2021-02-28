const express = require('express');
const router = express.Router();
const request_services=require("../services/requests");
const request=require("../models/requests");
const user = require("../models/user");
const env=require("../config/env");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Roles=require("../config/passport").Roles



router.post('/createrequest',passport.authenticate('jwt',{session:false}),Roles(['employee']),(req,res)=>{
    let request={
        userid:req.user.dataValues.id,
        reason:req.body.reason,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        additionaldetails:req.body.additionaldetails
    };  
    request_services.create_request(request,found=>{
        res.json(found)
    }); 
   
});

router.post('/viewmyrequest',passport.authenticate('jwt',{session:false}),Roles(['employee']),(req,res)=>{
    let request={
        id:req.user.dataValues.id,
        reason:req.body.reason,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        status:req.body.status
    };  
    request_services.view_my_requests(request,found=>{
        res.json(found)
    }); 
   
});





router.post('/viewemprequest',passport.authenticate('jwt',{session:false}),Roles(['manager']),(req,res)=>{
    let request={
        manager_id:req.user.dataValues.id,
        employee:req.body.employee,
        reason:req.body.reason,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        status:req.body.status
    };  
    request_services.view_employees_requests(request,found=>{
        res.json(found)
    }); 
   
});


router.post('/accept_reject',passport.authenticate('jwt',{session:false}),Roles(['manager']),(req,res)=>{
    let id = req.body.id;
    let status = req.body.status;
    let manager_id=req.user.dataValues.id;
    request_services.accept_reject(id,status,manager_id,found=>{
        res.json(found)
    }); 
   
});




router.post('/editrequest',passport.authenticate('jwt',{session:false}),Roles(['employee']),(req,res)=>{
    let request={
        userid:req.user.dataValues.id,
        id:req.body.id,
        reason:req.body.reason,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        additionaldetails:req.body.additionaldetails
    };  
    request_services.edit_request(request,found=>{
        res.json(found)
    }); 
   
});


router.post('/deleterequest',passport.authenticate('jwt',{session:false}),Roles(['employee']),(req,res)=>{
    let request={
        userid:req.user.dataValues.id,
        id:req.body.id,
    };  
    request_services.cancel_request(request,found=>{
        res.json(found)
    }); 
   
});


module.exports = router;
