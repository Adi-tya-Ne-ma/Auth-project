const User = require("../models/user-models");
const bcrypt = require("bcryptjs");

const home = async(req, res) => {
    try{
        res
        .status(200)
        .send("welcome to ROUTER HomePage-uc");
    }
    catch(error){
        console.log(error);
    }
};


const register = async(req, res) => {
    try{        
        const {username, email, phone, password} = req.body;

        // console.log(req.body);

        const userExist = await User.findOne({ email });

        if(userExist){
            return res.status(400).json({msg : "Email already Exists"});
        }        

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({ 
            username, 
            email, 
            phone, 
            password
        });        

        // console.log(req.body);

        res.status(201).send({
            msg : "Registration Complete", 
            token : await userCreated.generateToken(), 
            userId: userCreated._id.toString() 
        });
    }
    catch(error){
        // res.status(400).send({msg: error + "Page not found"});
        next(error);
    }
};

// User Login Logic 
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // const verification = await bcrypt.compare(password, userExist.password);        
        
        const verification = await userExist.validatePassword(password);

        if(verification){
            res.status(200).json({
                message : "Login Successful", 
                token : await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        }
        else{
            res.status(401).json({message : "Invalid email or password"});
        }
    } 

    catch (error) {
        res.status(500).json("internal server error");
    }
}

const user = async(req, res) => {
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
        // console.log({msg: "Hi user"});
        
    }
    catch(error){
        // res.status(500).json("internal server error");
        console.log("Error from user controller", error);
    }
}


module.exports = { home, register, login, user };