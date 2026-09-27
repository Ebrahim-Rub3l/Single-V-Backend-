const User = require ('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {verifyMail , forgotMail} = require ('../utils/mailSender')

const registrationController = async (req , res)=>{
    const {firstName ,lastName , email , password , confirmpassword , terms} = req.body

    if(!email ){
        return res.json({
            success : false ,
            message:" Can Not Be Empty Email Feild"
        })
    }

     if(!terms){
        return res.json({
            success : false ,
            message:" accept the terms"
        })
    }

     if(password !== confirmpassword){
        return res.json({
            success : false ,
            message:" Does Not Match The Password"
        })
    }

    let existinguser = await User.findOne({email})

    if(existinguser){
    return res.json({
        success: false,
        message: "User Already Exists"
    });
}

    let pass = await bcrypt.hashSync (password,10)

   const newUser = new User({
    firstName,
    lastName,
    email,
    password: pass,
    terms,

    // billingAddress: {
    //     firstName,
    //     lastName
    // }
});
   let hash = await bcrypt.hashSync (password,10)

    await newUser.save();

    let token = jwt.sign(
    {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1D"
    }
);

     verifyMail (email , token) ;

    return res.json({
            success : true ,
            message:" Registration Succesfully"
        })
}

const verificationController = async (req, res) => {
    const { token } = req.params;

    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {

        if (err) {
            return res.json({
                success: false,
                message: "Invalid Token"
            });
        }

        try {
            const userId = decoded.id;

            const existinguser = await User.findById(userId);

            if (!existinguser) {
                return res.json({
                    success: false,
                    message: "Invalid Token"
                });
            }

            existinguser.isVerified = true;
            await existinguser.save();

            return res.json({
                success: true,
                message: "Verified Successfully"
            });

        } catch (error) {
            return res.json({
                success: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    });
};

const loginController = async (req , res) =>{
    const {email , password} = req.body
    if(!email || !password){
        return res.json({
            success : false ,
            message:" Can Not Be Empty Any Feild"
        })
    }

     let existinguser = await User.findOne({email:email})

       if(!existinguser){
        return res.json({
            success : false ,
            message:" User Not Found"
        })
    }

    let pass = await bcrypt.compareSync (password,existinguser.password)

    if(!pass){
        return res.json({
            success : false ,
            message:" password Not Match"
        })
    }

        let AccessToken = jwt.sign(
    {
        _id: existinguser._id,
        email: existinguser.email,
        role: existinguser.role
    },
    process.env.ACCESS_SECRET,
    {
        expiresIn: "1D"
    }
);

        return res.json({
            success : true ,
            message:" Login Successfully",
            accesstoken : AccessToken ,
            data:{
                _id:existinguser._id,
                email: existinguser.email,
                role: existinguser.role,
                status:existinguser.status,
                isVerified: existinguser.isVerified,
                firstName: existinguser.firstName ,
                lastName : existinguser.lastName,
                address : existinguser.address
            }
        })
}

const forgotController = async (req, res)=>{
    const {email} = req.body


    if(!email ){
        return res.json({
            success : false ,
            message:" Can Not Be Empty Email Feild"
        })
    }

     let existinguser = await User.findOne({email:email})

    if(!existinguser){
        return res.json({
            success : false ,
            message:" User Not Found"
        })
    }

     let token = jwt.sign(
    {
        id: existinguser._id,
        email: existinguser.email,
        role: existinguser.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1D"
    }
);

       await forgotMail(email, token);

    return res.json({
        success: true,
        message: "Password reset email sent successfully"
    });

}

const resetpassController = async (req, res) => {
    const { newpassword, confirmpassword } = req.body;
    const { token } = req.params;

    // Check password
    if (!newpassword || !confirmpassword) {
        return res.json({
            success: false,
            message: "New password and confirm password are required"
        });
    }

    // Check password match
    if (newpassword !== confirmpassword) {
        return res.json({
            success: false,
            message: "Password and confirm password do not match"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {

        if (err) {
            return res.json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        try {
            const userId = decoded.id;

            const existinguser = await User.findById(userId);

            if (!existinguser) {
                return res.json({
                    success: false,
                    message: "User not found"
                });
            }

            // Hash new password
            const pass = await bcrypt.hash(newpassword, 10);

            // Update password
            existinguser.password = pass;

            await existinguser.save();

            return res.json({
                success: true,
                message: "Password reset successfully"
            });

        } catch (error) {
            return res.json({
                success: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    });
};

const reverificationController = async (req ,res) =>{
    const {email} = req.body

     if(!email ){
        return res.json({
            success : false ,
            message:" Can Not Be Empty Email Feild"
        })
    }
     let existinguser = await User.findOne({email:email})

    if(!existinguser){
        return res.json({
            success : false ,
            message:" User Not Found"
        })
    }

     let token = jwt.sign(
    {
        id: existinguser._id,
        email: existinguser.email,
        role: existinguser.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1D"
    }
   );
  
    verifyMail (email , token) ;

    return res.json({
            success : true ,
            message:" Reverification Email Sent Succesfully",
            token
        })


}

module.exports = { registrationController , verificationController, loginController , forgotController , resetpassController , reverificationController }