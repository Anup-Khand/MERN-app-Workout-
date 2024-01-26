const Workout = require('../models/WorkoutModel')

const mongoose = require('mongoose')


// get all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt:-1})

    res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req,res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No sunch workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error:'No such Workout'})
    }

    res.status(200).json(workout)
}



// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyfield = []

    if (!title) {
        emptyfield.push('title')
    }
     if (!load) {
        emptyfield.push('load')
    }
     if (!reps) {
        emptyfield.push('reps')
    }

    if (emptyfield.length > 0) {
        return res.status(400).json({
            error:"Please fill in the all field",emptyfield
        })
    }
    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// delete a workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No sunch workout'})
    }

    const workout = await Workout.findOneAndDelete({ _id: id })
    
     if (!workout) {
        return res.status(400).json({error:'No such Workout'})
    }

    res.status(200).json(workout)
}


//update a workout

const updateWorkout = async (req, res) => {
     const { id } = req.params
    
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No sunch workout'})
    }

    const workout = await Workout.findOneAndUpdate({ _id: id },
        {
        ...req.body
    })
    
      if (!workout) {
        return res.status(400).json({error:'No such Workout'})
    }
  

    res.status(200).json(workout)
}


module.exports = {
    createWorkout, 
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
