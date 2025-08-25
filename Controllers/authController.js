

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