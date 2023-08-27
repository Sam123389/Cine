const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña con factor de coste 10

    const newUser = new User({ username, email, password: hashedPassword });
    const insertedUser = await newUser.save();
    return res.status(201).json(insertedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
};

exports.getOneUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ userName: username });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
};

exports.editUser = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;

  const currentUser = await User.findById(userId);
  if (currentUser.role !== 'Administrador') {
    return res.status(403).json({ error: 'No tienes permiso para editar usuarios.' });
  }

  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña con factor de coste 10

    await User.updateOne({ _id: id }, { username, email, password: hashedPassword });
    const updatedUser = await User.findById(id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Error al editar el usuario.' });
  }
};
