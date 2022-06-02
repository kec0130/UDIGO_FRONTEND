import Navagation from './Navigation'

import { LogoImage, LogoText } from 'assets/svgs'
import styles from '../layout.module.scss'

const GNB = () => {
  return (
    <header>
      <div className={styles.logoWrapper}>
        <LogoImage className={styles.logo} />
        <LogoText className={styles.logoText} />
      </div>
      <Navagation />
    </header>
  )
}

export default GNB
