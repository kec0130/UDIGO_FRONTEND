import cx from 'classnames'

import { BASE_URL } from './constants/images'
import Description from './Description'
import styles from './home.module.scss'

const Home = () => {
  return (
    <div className={cx('pageContainer', styles.homepage)}>
      <div
        className={styles.introBackground}
        style={{ backgroundImage: `url(${BASE_URL}/images/home-background.jpeg)` }}
      >
        <div className={styles.introduction}>
          <h1>AI가 찾아주는 나만의 Place</h1>
          <p>
            사진 속 장소를 찾아주는 UDIGO로
            <br /> 장소 검색도 스마트하게.
          </p>
        </div>
      </div>
      <div className={styles.description}>
        <Description />
      </div>
    </div>
  )
}

export default Home
