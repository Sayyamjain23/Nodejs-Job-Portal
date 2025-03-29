import userModel from "../models/userModel.js";

export const registerController = async (req, res,next) => {
    
        const {name, email, password} = req.body;
        if (!name) {
            next("name is required");
        } 
        if(!email){
            next("email is required");
        }
        if(!password){
            next("password is required");
        }
        const existingUser =await userModel.findOne({email});
        if(existingUser){
        next("User already exists");
        }   
    const user = await userModel.create({name, email, password});
    //token
    const token=user.createJWT();
    res.status(201).send({
        status: "success",
        success: true,
         user:{
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                location: user.location,
                location: user.location,
         },
         token,
    });
}

export const loginController = async (req, res,next) => {
    const {email, password} = req.body;
    if (!email ||!password) {
        next("Please provide email and password");
    }
    //find user by email
    const user = await userModel.findOne({email});
    if(!user){
        next("User not found");
    }
    //comapre password
    const isMatch= await user.comparePassword(password);
    if(!isMatch){
        next("Invalid credentials");
    }
    //token
    const token=user.createJWT();
    res.status(200).json({
        message: "Logged in successfully",
        success: true,
         user:{
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                location: user.location,
                location: user.location,
         },
         token,
    });
}


  
