let User = require ('../models/userSchema')
const bcrypt = require('bcrypt');

let userUpdate = async (req , res)=>{
    try {
        let {id} = req.params
        let data = await User.findByIdAndUpdate ({_id:id}, req.body , {new: true}).select('-password')
        return res.json({
            success : true ,
            message:" Updated ",
            data : data
        })
    } catch (error) {
        return res.json({
            success : false ,
            message:" errors"
        })
        
    }
}

let allUser = async (req , res ) => {
    try {
        let data = await User.find({})
        return res.json({
            success : true ,
            data : data
        })
    } catch (error) {
        return res.json({
            success : false ,
            message:" errors"
        })
    }
}

let getSingleUser = async ( req, res) => {
    try {

        let {id} = req.params
        let data = await User.find({_id:id})
        return res.json({
            success : true ,
            data : data
        })
    } catch (error) {
        return res.json({
            success : true ,
            message:" erorrs "
        })
    }
}

let deleteUser = async (req, res)=>{
    try {
        let {id} = req.params
        let data = await User.findByIdAndDelete({_id:id})
        return res.json({
            success : true ,
            message:" Deleted ",
        })
    } catch (error) {
        return res.json({
            success : false ,
            message:" errors"
        })
    }
}

let changePassword = async (req,res) =>{
   try {
    console.log("Hello")
    const {id} = req.params
     const {currentPassword , newPassword , confirmPassword } =req.body

     let existinguser = await User.findOne({_id:id})
     
            if(!existinguser){
             return res.json({
                 success : false ,
                 message:" Invalid"
             })
         }
     
         let pass = await bcrypt.compareSync (currentPassword,existinguser.password)
     
         if(!pass){
             return res.json({
                 success : false ,
                 message:" password Invalid"
             })
         }

         if(newPassword !== confirmPassword){
             return res.json({
            success : false ,
            message:" User Password Not Match"
        })
         }

         let hash = await bcrypt.hashSync (newPassword,10)

         let data = await User.findByIdAndUpdate({_id:id}, {password : hash}, {new:true})
          
         return res.json({
            success : true ,
            message:" password Updated"
        })


   } catch (error) {
    console.log(error)
     return res.json({
            success : false ,
            message:" errors"
        })
   }
}


module.exports = {userUpdate , allUser , getSingleUser , deleteUser ,changePassword}