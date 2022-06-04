import { Link } from 'react-router-dom'

import Navigation from './Navigation'
import { LogoText } from 'assets/svgs'
import styles from '../layout.module.scss'

const GNB = () => {
  return (
    <header>
      <div className={styles.logoWrapper}>
        <Link to='/'>
          <LogoText className={styles.logoText} />
        </Link>
      </div>
      <Navigation />
    </header>
  )
}

export default GNB
