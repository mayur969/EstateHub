import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next)=>{
    // console.log(res.cookies)
    const token = req.cookies.token;
    // console.log(token)
    if(!token) return res.status(401).json({message: "User Not Authenticated !"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload) => {
        if(err) return res.status(403).json({message: "Token Is Not Valid !"})

        req.userId = payload.id;

        next();
    })
}