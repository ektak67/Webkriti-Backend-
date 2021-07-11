const express = require("express");
const router = express.Router();
const{Id , follow, unfollow,update_profile,search} = require("../controllers/user");

// router.get("/user/:id",requireLogIn, Id );
router.put("/follow",requireLogIn, follow);
router.put("/unfollow",requireLogIn, unfollow);
router.put('/update_profile_pic',requireLogIn,update_profile);
router.post("/search-users", requireLogIn , search);

module.exports = router;