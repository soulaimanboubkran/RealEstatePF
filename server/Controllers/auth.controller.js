import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

import jwt from 'jsonwebtoken';

export const SignUp = async (req,res,next)=>{

    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });

    try {
        await newUser.save();

        res.status(201).json('User created successfully!');
    } catch (error) {
        next(error)
    }
}
export const  SignIn =async (req,res,next)=>{
    const {email,password} = req.body;

    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,"User not found!"));

        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Wrong credentials!"));

        const token  = jwt.sign({id:validUser._id},process.env.JWT_SECRET) //in .env you can put any string
        const {password:pass,...rest} = validUser._doc; // rest is the row of that user  without password
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({rest,token})
    } catch (error) {
        next(error)
    }
}
export const signOut =async(req, res, next)=>{
    try {
      res.clearCookie('access_token');
      res.status(200).json('Logged Out!')
    } catch (error) {
      next(error)
    }
  }
// khli hadi db !! hadi katdkhl les donnes ldatabase
export const google = async (req,res, next)=>{
    
}  