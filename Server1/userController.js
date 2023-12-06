const { User } = require('./user');

// Define functions for user-related operations

//Create User
const createUser = async (req, res) => {
  try {
    const doc = await User.create(req.body);
    res.json(doc);
    console.log("doc", doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update User
const updateUser = async (req, res) => {
  try {
    const doc = await User.findOneAndUpdate(
      { _id: req.params.id }, // Filter: Find the document by ID
      { $set: req.body },     // Update: Set the fields to the values in req.body
      { new: true }           // Options: Return the modified document (optional)
    );
    res.json(doc);
    console.log("doc", doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Fetch(Read) User
const fetchAllUser = async (req, res) => {
  try {
    const doc = await User.find({});
    res.json(doc);
    console.log("doc", doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//FetchOne(Read) User
const fetchOneUser = async (req, res) => {
  try {
    const doc = await User.findById(req.params.id);
    res.json(doc);
    console.log("doc", doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//Delete User
const deleteUserById = async (req, res) => {
  console.log("request", req);
  try {
    const doc = await User.deleteOne({ _id: req.params.id });
    res.json(doc);
    console.log("doc", doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  deleteUserById, createUser, fetchAllUser, updateUser, fetchOneUser
};
