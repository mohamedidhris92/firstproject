const {signUp} = require('./user')
const loginUser = async(req,res) => {
    const { email, password } = req.body;
    try {
        const doc = await signUp.findOne({ email: email })
        .then(user => {
          if (user) {
            if (user.password === password) {
              res.json("success")
            } else {
              res.json("the password is incorrect")
            }
          } else {
            res.json("no record found")
          }
        })
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

module.exports = {
    loginUser
  };
  