import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useRecoil } from 'hooks/useRecoil'
import { queryState } from 'states/map'
import { getPlaceInferenceApi } from 'services/place'
import { IPlaceApiRes } from 'types/place'

import Button from 'components/Button'
import LoadingSpinner from 'components/LoadingSpinner'
import { ImageIcon } from 'assets/svgs'
import styles from './search.module.scss'

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

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [imageFile, setImageFile] = useState<File>()
  const [response, setResponse] = useState<IPlaceApiRes>()
  const [, setQuery] = useRecoil(queryState)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = e

    if (!files) return
    const file = files[0]
    setImageFile(file)
    setResponse(undefined)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const { result } = reader
      if (!result) return
      setImageSrc(result as string)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    if (!imageFile) return
    formData.append('image', imageFile)

    getPlaceInferenceApi(formData)
      .then((res) => res.json())
      .then((data: IPlaceApiRes) => {
        setResponse(data)
        setQuery(data.label_category)
        setIsLoading(false)
      })
  }

  const handleNewImageButtonClick = () => inputRef.current?.click()

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

  const getGuideText = () => {
    if (isLoading) return LOADING_TEXT
    if (response) return resultSentence
    return INIT_TEXT
  }

  const resultSentence = <>{getMarkedSentence()}</>

  const guideText = getGuideText()

  return (
    <div className='pageContainer'>
      <div className={styles.textWrapper}>{guideText}</div>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={handleFileChange} ref={inputRef} id='image-input' />
        <div className={styles.imageWrapper}>
          {imageSrc ? (
            <img src={imageSrc} alt='preview' />
          ) : (
            <label htmlFor='image-input'>
              <ImageIcon />
              <span>이미지를 업로드하세요.</span>
            </label>
          )}
        </div>
        <div className={styles.buttonWrapper}>
          {imageSrc && (
            <>
              <Button
                value='다른 이미지 선택'
                buttonStyle='secondary'
                disabled={isLoading}
                onClick={handleNewImageButtonClick}
              />
              {response ? (
                <Link to='maps'>지도에서 찾기</Link>
              ) : (
                <Button value='장소 검색' type='submit' disabled={isLoading} />
              )}
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default Search
