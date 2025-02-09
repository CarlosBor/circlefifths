import styles from './Circle.module.css';

interface CircleProps{
  setAnswerNote: React.Dispatch<React.SetStateAction<string>>;
  showSection: string[]
  quizMode: boolean
}

const Circle: React.FC<CircleProps> = (props) => {
  const handleClick = (event:React.MouseEvent<HTMLDivElement>) => {
    const clickedDiv = event.target as HTMLDivElement;
    const clickedNote = clickedDiv.getAttribute('data-note');
    if(clickedNote!=null){
      props.setAnswerNote(clickedNote)
    }
  };

  const circleNotesMaj = ['C','G','D','A','E','B','Gb','Db','Ab','Eb','Bb','F'];
  const circleNotesMin = ['Am','Em','Bm','F#m','C#m','G#m','D#m','A#m','Fm','Cm','Gm','Dm'];

  return (
    <div className={styles.circleContainer}>
    <div className={`${styles.circle} ${styles.circleMajor}`}>
      {circleNotesMaj.map((note,index) => (
        <div onClick={handleClick}
        key={note}
        data-note={note}
        className={!props.quizMode ? `${styles.section} ${styles[`section${index + 1}`]}`
        :
        props.showSection.includes(note) ? `${styles.section} ${styles[`section${index + 1}`]}`
        :
        `${styles.section} ${styles[`section${index + 1}`]} ${styles.hideSection}`}>
          <span>{note}</span>
        </div>
      ))}
    </div>
    <div className={`${styles.circle} ${styles.circleMinor}`}>
    {circleNotesMin.map((note,index) => (
        <div key={note}
        className={!props.quizMode ? `${styles.section} ${styles[`section${index + 1}`]}`
        :
        props.showSection.includes(circleNotesMaj[circleNotesMin.indexOf(note)]) ? `${styles.section} ${styles[`section${index + 1}`]}`
        :
        `${styles.section} ${styles[`section${index + 1}`]} ${styles.hideSection}`
      }><span>{note}</span></div>
      ))}
    </div>
  </div>
  )
}

export default Circle