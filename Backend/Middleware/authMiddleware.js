const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, resizeBy, next) =>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded= jwt.verify(token, process.env.JWT_SECRET);

            
    }catch (error) {}
}
}