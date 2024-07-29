// const { Schema, model } = require("mongoose");

// const userSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         gender: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             unique: true,
//             required: true,
//         },
//         password: { 
//             type: String, 
//             required: true 
//         },
//         role: {
//             type: String,
//             required: true,
//             default: 'normalUser',
//             enum: ['normalUser', 'admin']
//         }
//     },
//     { timestamps: true }
// );

// const User = model("User", userSchema);

// module.exports = User;