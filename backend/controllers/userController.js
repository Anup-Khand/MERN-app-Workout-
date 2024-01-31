const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// create json web token

const createToken = (_id) => {
    jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

// login user

const loginUser = async (req, res) => {
    
    const { email, password } = req.body
    
      try {
        const user = await User.login(email, password)

        // get token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }

}

//signup user

const signupUser = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.signup(email, password)

        // get token
        const token = createToken(user._id)

        res.status(200).json({email,token,user})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}


module.exports = {loginUser,signupUser}