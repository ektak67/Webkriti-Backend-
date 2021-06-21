const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exportS.allPost = (req, res) => {
    // TODO
}

exportS.allfollowPost = (req, res) => {
    // TODO
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
    Post.find({
        postedBy : req.user._id
    })


}


exportS.comment = (req, res) => {
    const comment = {
        text :req.body.text ,
        postedBy : req.user._id
    }
    
    
}


exportS.deletePost = (req, res) => {
    // TODO
}


exportS.deleteComment = (req, res) => {
    // TODO
}