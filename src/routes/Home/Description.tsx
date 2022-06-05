import { BASE_URL, GUIDE_IMAGES, SAMPLE_IMAGES } from './constants/images'
import styles from './home.module.scss'

const Description = () => {
  return (
    <>
      <section>
        <h3>UDIGO 사용 방법</h3>
        <p>
          검색 탭에서 이미지를 업로드하고 <mark>장소 검색</mark> 버튼을 누르세요. AI가 장소를 추론한 후,{' '}
          <mark>지도에서 찾기</mark> 버튼을 누르면 관련 장소를 지도에서 찾을 수 있어요.
        </p>
        <ul className={styles.guideImages}>
          {GUIDE_IMAGES.map((image) => (
            <li key={`guide-image-${image}`}>
              <img src={`${BASE_URL}/user_guide/${image}.jpg`} alt={image} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>예시 이미지</h3>
        <p>
          UDIGO가 어떤 장소들을 판별할 수 있는지 궁금하시면 아래 이미지를 다운로드 받아 활용해보세요. 물론, 다른
          이미지를 사용하셔도 좋습니다.
        </p>
        <ul className={styles.sampleImages}>
          {SAMPLE_IMAGES.map((image) => (
            <li key={`sample-image-${image}`}>
              <img src={`${BASE_URL}/images_en/${image}.jpeg`} alt={image} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Description
