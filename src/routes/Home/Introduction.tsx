import { INTRO } from './constants/text'
import { BASE_URL, BANNER_IMAGE } from 'constants/images'

import styles from './home.module.scss'

const Introduction = () => {
  return (
    <div className={styles.introBackground} style={{ backgroundImage: `url(${BASE_URL}/images/${BANNER_IMAGE}.jpeg)` }}>
      <div className={styles.introduction}>
        <h1>{INTRO.title}</h1>
        <p>{INTRO.description}</p>
      </div>
    </div>
  )
}

export default Introduction
