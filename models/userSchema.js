const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema ({

    firstName : {
        type : String,
        // required : true ,
        trim : true
    },
     lastName : {
        type : String,
        // required : true ,
        trim : true
    },
    address :{
        type : String
    },
     email: {
        type : String
    },
    password: {
        type : String
    },
    phone: {
        type : String
    },

//     billingAddress:{
//           firstName : {
//         type : String,
//         required : true ,
//         trim : true
//     },
//      lastName : {
//         type : String,
//         required : true ,
//         trim : true
//     },
//      email: {
//         type : String
//     },
//     country: {
//         type : String
//     },
//     companyName: {
//         type : String
//     },
//     state: {
//         type : String
//     },
//     street: {
//         type : String
//     },
//     zipcode: {
//         type : String
//     },

//  },

    isVerified: {
        type : Boolean,
        default: false
    },

    role: {
        type : String,
        enum : ['user','admin', 'editor'],
        default: 'user'
    },

    status: {
        type : String,
        enum : ['approved','pendding', 'rejected'],
        default: 'approved'
    },



})


module.exports = mongoose.model('User', userSchema);