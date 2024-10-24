// models/QuizAttempt.js
const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quizzes',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  score: Number,
  answers: [{
    questionIndex: Number,
    selectedOption: Number
  }],
  completedAt: { type: Date, default: Date.now }
});

const QuizAttempt = mongoose.model('quiz_attempts', quizAttemptSchema);
module.exports = QuizAttempt;