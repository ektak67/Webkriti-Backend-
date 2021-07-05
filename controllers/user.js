const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require("../configs/database");

// exportS.Id = (req, res) =>{
//     User.findOne({_id:req.params.id})
//     .select("-password")
//     .then(user=>{
//         Post.find({postedBy:req.params.id})
//     .populate("postedBy","userId name")
//     .exec((err,posts)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//         res.json({user,posts})
//     })
// }).catch(err=>{
//     return res.status(404).json({error:"User not found"})
//     })
// }


exportS.follow = (req, res) =>{
    const {following_id} = req.body;
    client.query(`SELECT * FROM Following WHERE user_id = '${UserId}'`)
    .then((data) =>{
            res.json(data)
        })
    .catch(err=>{
            return res.status(422).json({
                error:err})
        })
};


exportS.unfollow = (req, res) =>{
    const {following_id} = req.body;
    client.query(`SELECT following_id FROM Following WHERE user_id = '${UserId}'`)
   
};


exportS.update_profile = (req, res) =>{
    // User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
            if(err){
                return res.status(422).json({error:"pic cannot be posted"})
            }
      res.json(result)
   // })
};


exportS.search = (req , res) => {
    const { user_id , }
};
