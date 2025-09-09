const hostModel=require('../models/hostModel')
const hostRequestModel=require('../models/hostRequestModel')


exports.showHostRegister=async (req,res) => {
  try {
   
    const Data={
        user: req.session.user ,
        error: null
    }

    res.render('host/host-register', {Data});
  } catch (error) {
    console.log(error);
  }
}


exports.RegisterAsHost=async (req,res) => {
  
  const userID=req.session.user.id;
  const {payout_email, bank_account, phone_number}=req.body;  
  
  try {
     const HostReq= await hostRequestModel.createRequest(userID,'pending', phone_number,payout_email, bank_account)

    
      res.redirect('/');

  } catch (error) {
    console.log(error);
    
  }
}



