const jwt  = require('jsonwebtoken');

const middleware = (req,res,next) =>{
    const authheader = req.headers.authorization;


    if(!authheader || !authheader.startsWith('Bearer '))
    {
        res.status(401).json({message : "No Token provided"});
    }

    const token = authheader.split(' ')[1];

    try{
        const decode = jwt.verify(token,process.env.jwt_secret);
        req.user = decode;
        next();

    }
    catch(error)
    {
        return res.status(401).json({message : 'Invalid token'})
    }

}

module.exports = middleware;
