import { useState, useEffect, useRef } from 'react';
import styles from './QuestionSquares.module.css';

interface QuestionSquareProps{
  setAnswerNote: React.Dispatch<React.SetStateAction<string>>;
  answerNote: string
  setShowSection: React.Dispatch<React.SetStateAction<string[]>>;
  setQuizMode: React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionSquare: React.FC<QuestionSquareProps> = (props) => {
  const [shuffledArray, setShuffledArray] = useState<string[]>([]);
  const {answerNote, setShowSection, setQuizMode, setAnswerNote} = props;
  const [displayTime, setDisplayTime] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkAnswer = (answer:string) =>{
    if(answer==shuffledArray[0]){
      setShuffledArray(shuffledArray.slice(1))
      setShowSection((shownNotes) => [...shownNotes, answer]);
    }
    if(shuffledArray.length==0){
      setQuizMode(false);
      stopTimer();
    }
    }
    if (answerNote) {
      checkAnswer(answerNote);
    }
  }, [answerNote, shuffledArray, setShowSection, setQuizMode]);
  
  const circleNotesMaj = ['C','G','D','A','E','B','Gb','Db','Ab','Eb','Bb','F'];

  const shuffleNoteDiv = () =>{
    setAnswerNote("");
    setQuizMode(true);
    setShowSection([]);
    setShuffledArray(randomizePositions(circleNotesMaj));
    startTimer();
  }

  const startTimer = () => {
    const start = Date.now();
    timerID.current = setInterval(()=>{
      const current = Date.now()-start;
      setDisplayTime(current)
    }, 100);
  }

  const stopTimer = () =>{
    clearTimeout(timerID.current);
    if(highScore==0){
      setHighScore(displayTime);
    }else if (displayTime<highScore){
      setHighScore(displayTime);
    }
    setDisplayTime(0);
  }
  
  const randomizePositions = (array:string[]) => {
    //Fisher–Yates shuffle
    let unshuffledLength = array.length;
    while (unshuffledLength != 0) {
      const randomIndex = Math.floor(Math.random() * unshuffledLength);
      unshuffledLength--;
      [array[unshuffledLength], array[randomIndex]] = [array[randomIndex], array[unshuffledLength]];
    }
    return array;
  }
  
  return (
    <div className={styles.questionSquareContainer}>
        <div onClick={shuffleNoteDiv} className={styles.questionButton}><span>Start Test</span></div>
        <div className={styles.questionNoteContainer}>
          {shuffledArray.map((note) => (
            <div key={note} data-note={note} className={styles.noteQuestion}><span>{note}</span></div>
          ))}
        </div>
        <div className={styles.timer}>Best time: {highScore/1000}</div>
        {displayTime ? <div className={styles.timer}>Timer: {displayTime/1000}</div> : null}
  </div>
  )
}

export default QuestionSquare
