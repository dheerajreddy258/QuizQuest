// // routes/quizRoutes.js
// const express = require('express');
// const router = express.Router();
// const quizController = require('../controllers/quizController');
// const auth = require('../middleware/auth'); // your existing auth middleware

// router.post('/create', auth, quizController.createQuiz);
// router.get('/user-quizzes', auth, quizController.getQuizzesByUser);
// router.put('/:id', auth, quizController.updateQuiz);
// module.exports = router;

// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const quizController = require('../controllers/quizController');

router.post('/create', authMiddleware, quizController.createQuiz);
router.get('/user-quizzes', authMiddleware, quizController.getQuizzesByUser);
router.put('/:id', authMiddleware, quizController.updateQuiz);
router.delete('/:id', authMiddleware, quizController.deleteQuiz);

module.exports = router;