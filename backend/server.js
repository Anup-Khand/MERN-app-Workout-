require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); 
const workoutsRoute = require('./routes/workouts')
const userRoute = require('./routes/user')
//express app
const app =express();


// middleware
app.use(cors());
app.use(express.json())

app.use((req,res,next) => {
    // console.log(req.path, req.method)
    next()
})

// routes

// app.get('/',(req,res)=> {
//     res.json({
//         msg:"welcome"
//     })
// })

app.use('/api/workouts', workoutsRoute)
app.use('/api/user',userRoute)

// connect to db
mongoose.set('debug', true);


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected")
    // listen for request

app.listen(process.env.PORT, () => {
    console.log(`server is listening at : ${process.env.PORT}`)
})
}).catch((error) => {
    console.log(error)
})


