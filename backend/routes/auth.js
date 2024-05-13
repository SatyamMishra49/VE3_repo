const jwt = require('jsonwebtoken');

const authenticateToken = (req,res,next) => {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (token===null){
        return res.status(400).json({message: "authentication token required"});
    }

    jwt.verify(token, "skm", (err,user)=> {
        if (err){
            return res.status(403).json({err});
        }
        req.user = user;
        next();
    });
}
module.exports = { authenticateToken }