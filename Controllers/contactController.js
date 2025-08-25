
exports.showContact=async (req,res) => {
  try {
    res.render('Contact/contact')
  } catch (error) {
    console.log(error);
  }
}