const hostModel=require('../models/hostModel')
const hostRequestModel=require('../models/hostRequestModel')


exports.showHostRegister=async (req,res) => {

 const userHaveRequest=await hostRequestModel.showAllRequests(req.session.user.id)
 const userIsHost=await hostModel.getAllHosts(req.session.user.id) 

  try {
     if (userHaveRequest.length > 0) {
      return res.render('host/waitingApproval');
     }

     if (userIsHost.length > 0) {
      return res.render('host/host-dashboard');
     }

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

    
      res.render('host/waitingApproval');

  } catch (error) {
    console.log(error);
    
  }
}



