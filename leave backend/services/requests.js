const Request = require("../models/requests");
const User= require("../models/user");
const {Op} = require('sequelize');


const create_request = (request, callback) => {
    Request.findOrCreate({
        where:{
            UserId:request.userid,
            status: {[Op.or]:['pending','accepted']},
            startdate:{[Op.lte]: request.startdate},
            enddate:{[Op.gte]: request.enddate}
        },
        defaults:{
            reason: request.reason,
            startdate:request.startdate,
            enddate:request.enddate,
            status:'pending',
            additionaldetails:request.additionaldetails,
            UserId:request.userid
        }
    }).then(req=>{callback(req)}).catch(err=>{
        callback(err.errors);
    })
}

const view_my_requests= (mreq,callback)=>{
    Request.findAll({
        where:{
            UserId:mreq.id,
            status: mreq.status == null? {
                [Op.ne]: null
              } :  mreq.status,
            reason: mreq.reason == null ? {
                [Op.ne]: null
              } : mreq.reason,
            startdate: mreq.startdate==null?{
                [Op.ne]:null
            }:{[Op.gte]: mreq.startdate},
            enddate: mreq.enddate==null?{
                [Op.ne]: null
            }:{[Op.lte]: mreq.enddate},    
        }
    }).then(req=>{
        callback(req);
    }).catch(err=>{
        callback(err.errors);
    })
}

const view_employees_requests=(request,callback)=>{
    Request.findAll({
        include:[User],
        where:{
           '$User.UserId$' :request.manager_id,
           '$User.username$':request.employee ==null ? {
            [Op.ne]: null
          } : request.employee,
            status: request.status ==null ? {
            [Op.ne]: null
          } : request.status,
          reason: request.reason == null ? {
            [Op.ne]: null
          } : request.reason,
          startdate: request.startdate== null?{
            [Op.ne]: null
        }:{[Op.gte]: request.startdate},
        enddate: request.enddate==null?{
            [Op.ne]: null
        }:{[Op.lte]: request.enddate},     
        }
    }).then(req=>{
        callback(req);
    }).catch(err=>{
        callback(err.errors);
    })
}

const accept_reject=(id,status,manager_id,callback)=>{
    Request.findOne({ include:[User],where: { id: id,'$User.UserId$':manager_id } }).then(req => {
        if (req != null) {
            req.update({
                status: status,
            }).then(req => { callback(req) }).catch(err => {
                callback(err.errors);
            })
        }
        else {
            callback({ message: "The request you are looking for doesn't exist!!" })
        }
    })
}

const edit_request=(request,callback)=>{
Request.findOne({ where: { id: request.id,UserId:request.userid } }).then(req => {
    if (req != null) {
        req.update({
            reason: req.reason,
            startdate: req.startdate,
            enddate: req.enddate,
            additionaldetails:req.additionaldetails
        }).then(req => { callback(req) }).catch(err => {
            callback(err.errors);
        })
    }
    else {
        callback({ message: "The request you are trying to edit is not found" })
    }
})
}

const cancel_request=(id,callback)=>{
    Request.findOne({where:{id:id,UserId:request.userid,status:'pending'}}).then(req=>{
        if (req !=null){
        req.destroy().then(destroyed=>{
            callback(destroyed)
        }).catch(err=>{
            callback(err.errors)
        });
 }else{
   callback({message:"request not found !"})
 } });
}

module.exports={create_request,view_my_requests,view_employees_requests,accept_reject,edit_request,cancel_request}