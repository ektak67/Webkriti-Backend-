const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");


router.post('/login', (req, res) => { 

   const{name , email, password } = req.body;

   client 
   .query(`SEELCT * FROM user WHERE email = '${email}';`)
   .then((data) => {
       isValid = data.rows;

       if(isValid.legth != 0){
           res.status(400).json({
               error :"User already exists "
           });
       }
       else{
           bcrypt.hash(password,10,(err , hash) => {
               if(err){
                   res.status(500).json({
                       error : "Internal server error" 
                   });
               }
               const user = {
                   username ,
                   email ,
                   password :hash,
                   Repassword :hash,
               };

               client
               .query(
                   `INSERT INTO user (username , email , password , Repassword) VALUES ('${user.username}', '${user.email}' ,'${user.password}','${user.Repassword}');`)
                   
                   .then((data) => {
                
                    const token = jwt.sign(
                      {
                        email: email,
                      },
                      process.env.SECRET_KEY
                    );

                    res.status(200).json({
                        message: "User added successfully to database",
                        token: token,
                      });
                    });
           });
        }
    })
                
                    .catch((err) => {
                      res.status(500).json({
                        error: "Database error occurred!",
                      });
       });
    });



router.post('/signup', (req, res, next) => { 
    let newUser = new User();  
    newUser.name = req.body.name, 
    newUser.email = req.body.email,
    newUser.password=req.body.password                
    newUser.setPassword(req.body.password); 

    newUser.save((err, User) => { 
        if (err) { 
            return res.status(400).send({ 
                message : "Failed to add user."
            }); 
        } 
        else { 
            return res.status(200).send({ 
                message : "User added successfully."
            }); 
        } 
    }); 
}); 

module.exports = router;