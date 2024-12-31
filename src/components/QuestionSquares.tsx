import { useState, useEffect } from 'react';
import styles from './QuestionSquares.module.css';

interface QuestionSquareProps{
  answerNote: string
  setShowSection: React.Dispatch<React.SetStateAction<string[]>>;
  setQuizMode: React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionSquare: React.FC<QuestionSquareProps> = (props) => {
  const [shuffledArray, setShuffledArray] = useState<string[]>([]);

  const {answerNote, setShowSection, setQuizMode} = props;

  useEffect(() => {
    const checkAnswer = (answer:string) =>{
      if(answer==shuffledArray[0]){
        setShuffledArray(shuffledArray.slice(1))
        setShowSection((shownNotes) => [...shownNotes, answer]);
        console.log()
      }
      if(shuffledArray.length==0){
        console.log("End");
        setQuizMode(false);
      }
    }

    if (answerNote) {
      checkAnswer(answerNote);
    }
  }, [answerNote, shuffledArray, setShowSection, setQuizMode]);

  const circleNotesMaj = ['C','G','D','A','E','B','Gb','Dd','Ab','Eb','Bb','F'];

  const shuffleNoteDiv = () =>{
    setQuizMode(true);
    setShowSection([]);
    setShuffledArray(randomizePositions(circleNotesMaj));
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
  </div>
  )
}

export default QuestionSquare
