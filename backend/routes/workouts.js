const express = require('express'
)
const {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout} =  require('../controllers/workoutControllers')

const router = express.Router()

// get all workout
router.get('/', getWorkouts)

// get a single workout

router.get('/:id', getWorkout)

// POST a new workout

router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE  a workout
router.put('/:id', updateWorkout)


module.exports = router