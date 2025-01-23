const jwt = require("jsonwebtoken")
const secretKey = "sigmaBoy"

const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, secretKey, { expiresIn });
}
const verifyToken = (req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token){
        return res.status(401).json({pesan:"akses di tolak!!"})
    }
    try {
        const decode = jwt.verify(token,secretKey)
        req.user = decode
        next()
    }catch(error){
        return res.status(401).json({pesan:"token tidak valid!"})
    }
}


module.exports ={ verifyToken, generateToken};