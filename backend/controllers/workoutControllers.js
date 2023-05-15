const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// Get a single workout

const getWorkout = async (req, res) => {
  const { id } = req.params;
  //  check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    res.status(404).json({ error: "There's no workout like that !!" });
  }
  res.status(200).json(workout);
};

// Create a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  // add workout to DB
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  //  check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    res.status(404).json({ error: "There's no workout like that !!" });
  }
  res.status(200).json(workout);
};
// Update a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  //  check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    res.status(404).json({ error: "There's no workout like that !!" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
