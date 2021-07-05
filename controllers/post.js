const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require("../configs/db");

exportS.allPost = (req, res) => {
    posts = client.query(`SELECT post_id ,userId name , caption , post_url FROM posts`),
    clinet.query(`SELECT content ,userId name FROM comments`) 
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
}

exportS.allfollowPost = (req, res) => {
    const { post_url , content} = req.body ;
    client.query(`SELECT `)
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","userId name")
     .populate("comments.postedBy","userId name")
     .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
}


exportS.createPost = (req, res) => {
    const { caption ,snap} = req.body 

    if(!snap ){
        return res.status(400).json ({
            error : "Add Post!",
        })
    }

    req.user.password = undefined;
    const post = new Post ( {
        caption,
        photo : snap ,
        postedBy : req.user
    })

    post.save()
    .then(result => {
        res.json({
            post : result
        })
    })

    .catch(err => {
        console.log(err)
    })
}


exportS.myPost = (req, res) => {
    mypost = client.query(
        `SELECT * FROM POSTS WHERE user_id = '${req.userId}'`
    )
    .then(mypost =>{
        res.json({mypost})
    })
    .catch(err =>{
        console.log(err)
    })
}

exportS(like )=(req,res)=>{
    const {like } = req.body;
    // Post.findByIdAndUpdate(req.body.postId,{
    //     $push:{likes:req.user._id}
    // },{
    //     new:true
    // })
    // .populate("postedBy","_id name")
    // .populate("comments.postedBy","_id name")
    client.query(`INSERT INTO `)
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
}
exportS(dislike) =(req,res)=>{
    
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
}


exportS.comment = (req, res) => {
    const comment = {
        text :req.body.text ,
        postedBy : req.user.userId
    }
    client.query(`INSERT INTO comments (content) VALUES ('${comment.content}');`)
    client.query(`SELECT comments content , post_id WHERE post_id = '${post_id}' `)
    // Post.findByIdAndUpdate(req.body.postId,{
    //     $push:{comments:comment}
    // },{
    //     new:true
    // })
    // .populate("comments.postedBy","userId name")
    // .populate("postedBy","userId name") 
    .then((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
    
}


exportS.deletePost = (req, res) => {
    const{ postedBy : user_id };
    client.query(`DELETE FROM posts Where user_id IS userId ;`)
    // .populate("postedBy","userId")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({
                error:"Failed To Delete"
            })
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }
    })
}


exportS.deleteComment = (req, res) => {
    client.query(`DELETE FROM comment Where user_id IS userId ;`)
    // Post.findByIdAndUpdate({_id:req.params.postId},{
    //     $pull:{comments:{_id : req.params.commentId}}
    // },{
    //     new:true
    // })
    // .populate("comments.postedBy","userId name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({
                error:"UNSECCUSSFULL "
            })
        }
        else{
            res.json({
                message : "Comment Deleted"
            })
        }
    })
}