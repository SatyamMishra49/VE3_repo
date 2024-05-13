const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

//SIGN-IN APIs
router.post("/sign-in", async(req, res)=> {
    try{
        const { username } = req.body;
        const { email } = req.body;
        const existingUser = await User.findOne({username:username});
        const existingEmail = await User.findOne({email:email});
        if (existingUser) {
            return res.status(300).json({message: "username already exists"});
        } else if (username.length<3){
            return res.status(400).json({message: "username should be atleast 4 characters"});
        }
        if (existingEmail) {
            return res.status(300).json({message: "email already exists"});
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPass,
        });
        await newUser.save();
        return res.json({message: "signin successful"});
    }catch(error){
        console.log(error);
        res.status(400).json({message: "error has occured"})
    }
});

//LOGIN APIs
router.post("/log-in", async(req, res)=> {
    const { username } = req.body;
    const { password } = req.body;
    const existingUser = await User.findOne({username:username});
    if (!existingUser) {
        return res.status(400).json({message: "username or password is incorrect"});
    }
    bcrypt.compare(password,existingUser.password, (err,data)=>{
        if (data){
            const authClaims = [{name:username},{jti:jwt.sign({}, "skm")}];
            const token = jwt.sign({authClaims},"skm", {expiresIn: "15d"});
            res.status(200).json({id:existingUser._id, token:token})
        }else{
            return res.status(400).json({message: "username or password incorrect"});
        }
    })
})

module.exports = router;
