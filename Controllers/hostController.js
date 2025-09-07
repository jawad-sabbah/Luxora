
exports.showHostRegister=async (req,res) => {
  try {
   
    const demoData={
        user: req.session.user ,
        error: null
    }

    res.render('host/host-register', {demoData});
  } catch (error) {
    console.log(error);
  }
}




