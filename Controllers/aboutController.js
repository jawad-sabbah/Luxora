
module.exports.showAboutPage=(req,res)=>{
  try {
    res.render('About/about')
  } catch (error) {
    console.log(error);
  }
}
