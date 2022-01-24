const jwt = require('jsonwebtoken');


const JWT_SECRET = "youcannothack";
const fetchuser = (req,res,next)=>{

    const token = req.header("auth-token")
    if(!token)
    return res.status(400).send("not valdeted by token")

    try
    {
        
        let data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()

    }
    catch(err)
    {
        return res.status(401).send("acesss denied")
    }
}

module.exports = fetchuser