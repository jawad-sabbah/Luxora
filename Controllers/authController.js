const bcrypt=require('bcrypt');
const userModel=require('../models/userModel');


exports.showLogin=(req,res)=>{
  try {
    res.render('auth/login',{ error: null });
  } catch (error) {
    console.log(error);
  }
}

exports.showRegister=(req,res)=>{
  try {
    res.render('auth/register',{error: null});
  } catch (error) {
    console.log(error);
  }
}


exports.registerUser= async(req,res)=>{

    const {name,email,password}=req.body

   try {
     
    const userExist=await userModel.findUserByEmail(email)
     if (userExist) {
      return res.render('auth/register',{error:'User already exists'});
     }

     const hashedPassword=await bcrypt.hash(password,10);
     await userModel.createUser(name,email,hashedPassword);

     res.redirect('/Hotels');

    } catch (error) {
    console.log(error);
  }
}

exports.loginUser= async(req,res)=>{

    const {email,password}=req.body

   try {
     
    const user=await userModel.findUserByEmail(email)
     if (!user) {
       return res.render('auth/login',{error:'Invalid email or password'});
     }

     const isMatch=await bcrypt.compare(password,user.hashed_password);
     if (!isMatch) {
      return res.render('auth/login',{error:'Invalid email or password'});
     }

     req.session.user={
      id: user.user_id,
      email: user.email
     }
     console.log(req.session.user);
     
     
     res.redirect('/Hotels');

    } catch (error) {
    console.log(error);
  }
} 

exports.logoutUser=(req,res)=>{ 
 
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect('/Hotels');
    }
     res.clearCookie('connect.sid', { path: '/' });
    res.redirect('/');
  })
}