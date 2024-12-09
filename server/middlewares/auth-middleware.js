const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const auth_middleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not Provided" });
    }
    
    const jwtToken = token.replace("Bearer ", "");
    console.log("token from log:", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        // req.user = isVerified;
        const userData = await User.findOne({ email : isVerified.email }).select({ password:0 });

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        // console.log(userData);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth_middleware;