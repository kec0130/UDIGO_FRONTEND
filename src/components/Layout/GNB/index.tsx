import Navigation from './Navigation'

import { LogoText } from 'assets/svgs'
import styles from '../layout.module.scss'

const GNB = () => {
  return (
    <header>
      <div className={styles.logoWrapper}>
        <LogoText className={styles.logoText} />
      </div>
      <Navigation />
    </header>
  )
}

export default GNB
