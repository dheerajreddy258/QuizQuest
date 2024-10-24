// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required: true 
  },
  participants: [{ type: String }],
  questions: [{
    text: String,
    options: [String],
    correctAnswer: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('quizzes', quizSchema);
module.exports = Quiz;