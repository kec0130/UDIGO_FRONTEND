import { RefObject } from 'react'
import { Link } from 'react-router-dom'

import { TSearchStatus } from 'types/place'

import Button from 'components/Button'
import styles from './search.module.scss'

interface IProps {
  status: TSearchStatus
  inputRef: RefObject<HTMLInputElement>
}

const Buttons = ({ status, inputRef }: IProps) => {
  const handleNewImageButtonClick = () => inputRef.current?.click()

  return (
    <div className={styles.buttonWrapper}>
      <Button
        value='다른 이미지 선택'
        buttonStyle='secondary'
        disabled={status === 'loading'}
        onClick={handleNewImageButtonClick}
        className={styles.button}
      />
      {status === 'done' ? (
        <Link to='/maps'>지도에서 찾기</Link>
      ) : (
        <Button value='장소 검색' type='submit' disabled={status === 'loading'} className={styles.button} />
      )}
    </div>
  )
}

export default Buttons
