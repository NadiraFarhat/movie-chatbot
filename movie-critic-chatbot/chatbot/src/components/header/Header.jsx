import styles from './header.module.css'
import macBtns from '../../assets/mac-btns.png'



const Header = () => {
  return (
    <>
        <div className={styles.header}>
            <div className={styles.btns}>
                <img src={macBtns} alt='btns'/>
            </div>
        </div>
            <p>/home/fun - browser</p>
        <div className={styles.divider}></div>
    </>
  )
}

export default Header
