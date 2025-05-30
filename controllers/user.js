const User = require('../models/user');
async function handleGetAllUser(req, res) {
  try {
    const users = await User.find();
    return res.json(users);
  }
  catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: `Internal server error ${error}` });
  }
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json(user);
}

async function deleteUserById(req, res){
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ status: 'success', message: 'User deleted successfully' });
}

async function updateUserById(req, res) {
  try {
    const body = req.body;

    // Optional strict check, but PATCH typically allows partial updates
    if (!body || (!body.first_name && !body.email && !body.last_name && !body.job_title && !body.gender)) {
      return res.status(400).json({ error: 'At least one field must be provided to update' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function addNewUser(req, res) {
  const body = req.body;
  console.log('Body: ', body);
  if (!body || !body.first_name || !body.email) {
    return res.status(400).json({ error: 'First name and email are required' });
  }
  try {
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      job_title: body.job_title,
      gender: body.gender
    });
    console.log("Result: ", result);
    return res.status(201).json({status: 'success'});
  }
  catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: `Internal server error ${error}`});
  }
}

module.exports = {
  handleGetAllUser,
  getUserById,
  deleteUserById, 
  updateUserById,
  addNewUser
};