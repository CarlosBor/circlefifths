import './App.css'
import { useState } from 'react';
import Circle from './components/Circle';
import QuestionSquares from './components/QuestionSquares';

function App() {
  const [answerNote, setAnswerNote] = useState<string>("");
  const [showSection, setShowSection] = useState<string[]>([]);
  const [quizMode, setQuizMode] = useState<boolean>(false);

  return (
    <>
      <div>
        <Circle 
          setAnswerNote = {setAnswerNote}
          showSection = {showSection}
          quizMode = {quizMode}
        />
        <QuestionSquares 
          setAnswerNote = {setAnswerNote}
          answerNote = {answerNote}
          setShowSection = {setShowSection}
          setQuizMode = {setQuizMode}
        />
      </div>
    </>
  )
}

export default App
