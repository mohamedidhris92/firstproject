
const deleteUser = async (User,req, res) => {
  try {
    const doc = await User.deleteOne({ _id: req.params.id }); // Assuming 'User' is your model
    res.json(doc);
    console.log("doc", doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteUser;