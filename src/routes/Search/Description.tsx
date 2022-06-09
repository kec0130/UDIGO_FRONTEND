import { IPlaceApiRes, TSearchStatus } from 'types/place'

import LoadingSpinner from 'components/LoadingSpinner'
import styles from './search.module.scss'

interface IProps {
  status: TSearchStatus
  response: IPlaceApiRes | undefined
}

const INIT_TEXT = (
  <p>
    검색하고 싶은 이미지를 넣어주세요.
    <br />
    AI가 사진 속 장소를 구분해줄 거예요.
  </p>
)

const LOADING_TEXT = (
  <div className={styles.loading}>
    <LoadingSpinner />
    <span>이미지 분석 중</span>
  </div>
)

const Description = ({ status, response }: IProps) => {
  const getMarkedSentence = () => {
    if (!response) return null
    const { sentence, label_category: labelCategory } = response
    const startIndex = sentence.indexOf(labelCategory)
    const endIndex = startIndex + labelCategory.length

    return (
      <p>
        {sentence.slice(0, startIndex)}
        <mark>{sentence.slice(startIndex, endIndex)}</mark>
        {sentence.slice(endIndex)}
      </p>
    )
  }

  const resultSentence = getMarkedSentence()

  return (
    <div className={styles.textWrapper}>
      {status === 'init' && INIT_TEXT}
      {status === 'loading' && LOADING_TEXT}
      {status === 'done' && resultSentence}
    </div>
  )
}

export default Description
