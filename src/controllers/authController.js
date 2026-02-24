const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class authController {
    static async register(req, res) {
        try {
            const data = req.body;
            const hashedPass = await bcrypt.hash(data.password, 10)
            const user = new User({ ...data, password: hashedPass });
            const newUser = await user.save();
            res.status(200).json({message: `User registered with username ${data.username}`})
        }
        catch (error) {
            console.log(error)
        }
    }

    static async login(req, res){
       try{
             const {username, password} = req.body;
             const user = await User.findOne({username: username})
             if(!user){
                return res.status(404).json({error: "User not found"})
             }
             const isMatch = await bcrypt.compare(password, user.password)
             if(!isMatch){
                return res.status(400).json({error: "Invalid Credentials"})
             }
             const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'})
             res.status(200).json({message: "User has logged-in successfully", token})
       }
       catch(error){
           console.log(error);
       }
    }
}

module.exports = authController;