const bcrypt = require('bcryptjs');
const User = require("../models/user");


const encryptPass = (newUSer, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt, (err, hash) => {
            if (err) return err;
            newUSer.password = hash;
            callback(err, newUSer)
        })
    });
};

const registerUser = (user, callback) => {
    encryptPass(user, (err, user) => {
        if(err) throw err;
        if (user.manager != null){
        User.findOne({
            where: {username: user.manager}
        }).then( manager=>{
            user.UserId=manager.id;
            User.create(user).then(addedUser => {
            callback(addedUser);
        }).catch(err => {
            callback(err);
        })}).catch(err=>{
            callback(err);
        })}
        else{
            User.create(user).then(addedUser => {
                callback(addedUser);
            }).catch(err => {
                callback(err);
            })
        }
    })
};

const get_managers=(callback)=>{
 User.findAll({where:{role:'manager'}, attributes: ['username']}).then(managers=>{
    callback(managers);
}).catch(err=>{
    callback(err.errors);
})
}

const get_emp_of_manager=(id,callback)=>{
    User.findAll({where:{UserId:id},attributes: ['username']}).then(managers=>{
        callback(managers);
    }).catch(err=>{
        callback(err.errors);
    })

}

const comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        callback(err, isMatch)
    })
};

module.exports = { comparePassword, registerUser,get_managers,get_emp_of_manager};