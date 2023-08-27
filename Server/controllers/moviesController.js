const Movie = require('../models/Movie');
const User = require('../models/User');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las películas.' });
  }
};

exports.getOneMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Película no encontrada.' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la película.' });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const newMovie = new Movie({ ...req.body });

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (user.role !== 'Administrador') {
      return res.status(403).json({ error: 'No tienes permiso para crear películas.' });
    }

    newMovie.createdBy = userId;

    const insertedMovie = await newMovie.save();
    return res.status(201).json(insertedMovie);
  } catch (error) {
    return res.status(500).json({ error: 'Error al registrar la película.' });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;

  const user = await User.findById(userId);
  if (user.role !== 'Administrador') {
    return res.status(403).json({ error: 'No tienes permiso para editar películas.' });
  }

  try {
    await Movie.updateOne({ _id: id }, { ...req.body });
    const updatedMovie = await Movie.findById(id);
    return res.status(200).json(updatedMovie);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la película.' });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;

  const user = await User.findById(userId);
  if (user.role !== 'Administrador') {
    return res.status(403).json({ error: 'No tienes permiso para eliminar películas.' });
  }

  try {
    const movieToDelete = await Movie.findByIdAndDelete(id);
    return res.status(202).json(movieToDelete);
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la película.' });
  }
};
