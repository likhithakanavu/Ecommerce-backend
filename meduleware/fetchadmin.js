var jwt = require('jsonwebtoken');
const JWT_SECRET ="hello";
const fetchadmin =(req,res, next)=>{
     const token = req.header('auth-token');
     if(!token){
        res.status(401).send({error:"Please authonticate using valid token"})
     }
     try {
        const data = jwt.verify(token,JWT_SECRET);
        req.admin=data.admin;
        next()
     } catch (error) {
        res.status(401).send({error:"Please authonticate using valid token"})
     }
}
module.exports =fetchadmin