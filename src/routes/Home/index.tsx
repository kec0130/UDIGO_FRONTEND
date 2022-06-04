import styles from './home.module.scss'

const IMAGE_BASE_URL = 'https://udigo-image.s3.ap-northeast-2.amazonaws.com/images_en'

const IMAGES = [
  '63building',
  'beach',
  'blue-house',
  'gym',
  'kids-cafe',
  'lotte-tower',
  'park',
  'pc-bang',
  'playground',
  'sebit-island',
  'shopping-mall',
  'ski-resort',
]

const Home = () => {
  return (
    <div className={styles.homepage}>
      <section className={styles.introduction}>
        <h1>AI가 찾아주는 나만의 Place</h1>
        <h2>AI가 이미지를 분석하여 장소를 추론합니다.</h2>
      </section>
      <section>
        <header>UDIGO 체험해보기</header>
        <p>아래 예시 이미지를 눌러 이미지 검색을 체험해보세요.</p>
        <ul className={styles.sampleImages}>
          {IMAGES.map((image) => (
            <li key={`image-${image}`}>
              <button type='button'>
                <img src={`${IMAGE_BASE_URL}/${image}.jpeg`} alt={image} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home
