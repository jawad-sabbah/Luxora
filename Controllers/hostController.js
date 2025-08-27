
exports.showHostRegister=async (req,res) => {
  try {
   
    const demoData={
        user: req.user || null,
        error: null
    }

    res.render('host/host-register', demoData);
  } catch (error) {
    console.log(error);
  }
}
exports.showTermsAndConditions=async (req,res) => {
 try {
  res.render('host/terms');
 } catch (error) {
  console.log(error);
 }
} 


