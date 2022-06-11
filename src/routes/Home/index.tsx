import cx from 'classnames'

import { SAMPLE, GUIDE } from './constants/text'
import { GUIDE_IMAGES, SAMPLE_IMAGES } from './constants/images'

import Introduction from './Introduction'
import Description from './Description'
import styles from './home.module.scss'

const Home = () => {
  return (
    <div className={cx('pageContainer', styles.homepage)}>
      <Introduction />
      <div className={styles.description}>
        <Description
          title={GUIDE.title}
          description={GUIDE.description}
          imageList={GUIDE_IMAGES}
          className='guideImages'
          keyPrefix='guide-image'
          directory='user_guide'
        />
        <Description
          title={SAMPLE.title}
          description={SAMPLE.description}
          imageList={SAMPLE_IMAGES}
          className='sampleImages'
          keyPrefix='sample-image'
          directory='images_en'
        />
      </div>
    </div>
  )
}

export default Home
