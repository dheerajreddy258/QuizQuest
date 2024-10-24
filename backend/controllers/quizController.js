// // controllers/quizController.js
// const Quiz = require('../models/Quiz');
// const User = require('../models/User'); // your existing user model

// exports.createQuiz = async (req, res) => {
//   try {
//     const { title, questions, participants } = req.body;
//     const quiz = new Quiz({
//       title,
//       questions,
//       participants,
//       creator: req.user._id
//     });
//     await quiz.save();
//     res.status(201).json(quiz);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getQuizzesByUser = async (req, res) => {
//   try {
//     const userEmail = req.user.email;
//     const quizzes = await Quiz.find({
//       $or: [
//         { creator: req.user._id },
//         { participants: userEmail }
//       ]
//     }).populate('creator', 'username email');
//     res.json(quizzes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateQuiz = async (req, res) => {
//     try {
//       const { title, questions, participants } = req.body;
//       const quiz = await Quiz.findOne({ _id: req.params.id, creator: req.user._id });
      
//       if (!quiz) {
//         return res.status(404).json({ error: 'Quiz not found' });
//       }
  
//       quiz.title = title;
//       quiz.questions = questions;
//       quiz.participants = participants;
      
//       await quiz.save();
//       res.json(quiz);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


// controllers/quizController.js
const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  try {
    const { title, questions, participants } = req.body;
    
    const quiz = new Quiz({
      title,
      questions,
      participants,
      creator: req.user._id // This comes from the auth middleware
    });

    const savedQuiz = await quiz.save();
    
    // Populate creator information before sending response
    const populatedQuiz = await Quiz.findById(savedQuiz._id)
      .populate('creator', 'username email');
    
    res.status(201).json(populatedQuiz);
  } catch (error) {
    console.error('Quiz creation error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getQuizzesByUser = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      $or: [
        { creator: req.user._id },
        { participants: req.user.email }
      ]
    }).populate('creator', 'username email');
    
    res.json(quizzes);
  } catch (error) {
    console.error('Quiz fetch error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    
    const quiz = await Quiz.findOneAndUpdate(
      { _id: id, creator: req.user._id },
      update,
      { new: true }
    ).populate('creator', 'username email');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.json(quiz);
  } catch (error) {
    console.error('Quiz update error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findOneAndDelete({ 
      _id: id,
      creator: req.user._id 
    });
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Quiz deletion error:', error);
    res.status(500).json({ error: error.message });
  }
};