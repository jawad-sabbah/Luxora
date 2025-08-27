const bcrypt=require('bcrypt');
const userModel=require('../models/userModel');


exports.showLogin=(req,res)=>{
  try {
    res.render('auth/login');
  } catch (error) {
    console.log(error);
  }
}

exports.showRegister=(req,res)=>{
  try {
    res.render('auth/register');
  } catch (error) {
    console.log(error);
  }
}


exports.registerUser= async(req,res)=>{

    const {name,email,password}=req.body

   try {
     
    const userExist=await userModel.findUserByEmail(email)
     if (userExist) {
       return res.status(400).send('User already exists');
     }

     const hashedPassword=await bcrypt.hash(password,10);
     await userModel.createUser(name,email,hashedPassword);

     res.redirect('/Hotels');

    } catch (error) {
    console.log(error);
  }
}