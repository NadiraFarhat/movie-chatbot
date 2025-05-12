import React from 'react'
import styles from './welcomebox.module.css'
import youtube from '../../assets/youtube.png'
import google from '../../assets/google.png' 
import reddit from '../../assets/reddit.png' 
import github from '../../assets/github.png'
import { useNavigate } from 'react-router-dom'


const WelcomeBox = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/chatbox')
  }
  
  return (
    <>
      <div className={styles.rectangle1}>
        <h3>WELCOME TO THE MOVIE CRITIC CHATBOT</h3>
        <div><button onClick={handleEnter} className={styles.startButton}>ENTER</button></div>
      </div>
      {/* <div className={styles.shadow-box}></div> */}
      <div className={styles.socialBox}>
        <div className={styles.socialIcons}>
          <img src={youtube} alt='Youtube'/>
          <img src={google} alt='Google'/>
          <img src={reddit} alt='Reddit'/>
          <img src={github} alt='Github'/>
        </div>
      </div>
    </>
  )
}

export default WelcomeBox
