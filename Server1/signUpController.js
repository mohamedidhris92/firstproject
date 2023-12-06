const { signUp } = require('./user')

const signUpUser = async (req, res) => {
    const { email } = req.body;
    const msg = "Email Id already exist";
    console.log("email",email);
    try {
        const validate = await signUp.findOne({ email: email })
        if (validate) {
            console.log("inside");
            return res.status(201).json("Email Id already exist");
        }
        else {
            console.log("Received request body:", req.body);
            const user = new signUp();
            const doc = await signUp.create(req.body);
            return res.status(200).json(doc);
            
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signUpUser
};
