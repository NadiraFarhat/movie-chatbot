import React from 'react'
import styles from './welcome.module.css'
import Header from '../../components/header/Header'
import WelcomeBox from '../../components/welcomeBox/WelcomeBox'

const Welcome = () => {
  return (
    <>
        <div className={styles.welcome}>
          <Header />
          <WelcomeBox />
        </div>
    </>
  )
}

export default Welcome
