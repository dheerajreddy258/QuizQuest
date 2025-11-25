import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import QuizCreatorHomePage from './components/QuizCreatorHomePage';
import QuizTakerHomePage from './components/QuizTakerHomePage';
import CreateQuiz from './components/CreateQuiz';
import TakeQuizPage from './components/TakeQuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/creator-home" element={<QuizCreatorHomePage />} />
        <Route path="/taker-home" element={<QuizTakerHomePage />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/take-quiz/:_id" element={<TakeQuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
