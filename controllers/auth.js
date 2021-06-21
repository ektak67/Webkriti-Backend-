const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// SignUP 
exports.signUp = (req , res) =>{
    const{username , email , password , repassword} = req.body;

    client
    .query(`Select * From users WHERE email = '${email}';`)
    .then((data) => {
        isValid = data.row;


        if(isValid.length !== 0){
            res.status(400).json({
                error :"User already exists.",
            })
        }else{
            bcrypt.hash(password, 10 ,(err , hash) =>{
                if(err) {
                    res.status(500).json({
                        error : "Internal server error .",
                    });
                }

                const user = {
                    username , 
                    email , 
                    password :hash ,
                    repassword :hash ,
                };

                client
                .query(`Insert Into user (name , email , password) Values ('${user.username}' , '${user.email}' ,'${user.password}','${user.repassword}' );`)
                 
                .then((data) => {
                    const token = jwt.sign({
                        email :email,
                    },
                    process.env.TOKEN
                    );

                    res.status(200).json({
                        message : "Saved Successfully.",
                        token : token,
                    });
                })

                .catch((err) => {
                    res.status(500).json({
                        error : "Database error occurred! ",
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
};


// Sign In
exports.signIn = (req , res) =>{
    const{username , password} =req.body;

    client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;

      if(userData.length == 0){
          res.status(300).json({
              error : "User does not exist , singup instsed !",
          });
      }else{
          bcrypt.compare(password, userData[0].password ,(err, result) =>{
              if(err){
                  res.status(500).json({
                      error : "Server error",
                  });
              }else if (result == true){
                  const token = jwt.sign({
                      email : email,
                  },
                  process.env.TOKEN
                  );
                  res.status(200).json ({
                      message :"Signed In sucessfully!",
                      token :token,
                  });
              }else {
                  res.status(400).json ({
                      error : "Invaild password !!",
                  });
              }
          } );
      }
})

.catch((err)=> {
    res.status(500).json({
        error :"Database error occureed!",
    });
});
};