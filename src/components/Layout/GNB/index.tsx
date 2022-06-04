import { Link } from 'react-router-dom'

import Navigation from './Navigation'
import { LogoText } from 'assets/svgs'
import styles from '../layout.module.scss'

const GNB = () => {
  return (
    <header className={styles.headerNav}>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Link to='/'>
            <LogoText />
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  )
}

export default GNB
