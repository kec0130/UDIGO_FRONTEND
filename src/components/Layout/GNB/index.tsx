import { Link } from 'react-router-dom'

import NavBar from './NavBar'
import { LogoText } from 'assets/svgs'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <header className={styles.gnb}>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Link to='/'>
            <LogoText />
          </Link>
        </div>
        <NavBar />
      </div>
    </header>
  )
}

export default GNB
