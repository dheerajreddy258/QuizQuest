import React from 'react';

const QuizCard = ({ quiz, isCreator, handleEdit, handleTakeQuiz }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold">{quiz.title}</h2>
      <p className="text-gray-600">{quiz.questions.length} questions</p>
      <p className="text-gray-600">{quiz.participants.length} participants</p>

      {isCreator && (
        <div className="flex justify-end">
          <button
            onClick={() => handleEdit(quiz._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>
        </div>
      )}

      {!isCreator && (
        <div className="flex justify-end">
          <button
            onClick={() => handleTakeQuiz(quiz._id)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Take Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;