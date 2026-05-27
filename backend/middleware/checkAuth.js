const jwt = require('jsonwebtoken') 

module.exports= (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        const verify = jwt.verify(token,'123');
        next();
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            msg:"invalid token"
        })
    }
}