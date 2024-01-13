// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const reviewSchema = new Schema({
//   rating: {
//     type: Number,
//     min: 1,
//     max: 10,
//     default: 10
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   userName: String,
//   userAvatar: String
// }, {
//   timestamps: true
// });

// const restaurantSchema = new Schema({
//   name: {
//    type: String,
//    required: true
//   },
//   location: {
//     type: String,
//     match: /[A-Z][a-z]+, [A-Z]{2}/,
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   image: {
//     type: String,
//     // default: ADD Image,
//   },
//   reviews: [reviewSchema]
// }, {
//   timestamps:true 
// });

// module.exports = mongoose.model('Restaurant', restaurantSchema);