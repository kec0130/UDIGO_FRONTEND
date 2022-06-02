import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { getPlaceInferenceApi } from 'services/place'
import { IPlaceApiRes } from 'types/place'

import Button from 'components/Button'
import { ImageIcon } from 'assets/svgs'
import styles from './search.module.scss'

const INIT_TEXT = (
  <>
    검색하고 싶은 이미지를 넣어주세요.
    <br />
    AI가 사진 속 장소를 구분해줄 거예요.
  </>
)

const Search = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [imageFile, setImageFile] = useState<File>()
  const [response, setResponse] = useState<IPlaceApiRes>()
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
    const formData = new FormData()
    if (!imageFile) return
    formData.append('image', imageFile)

    getPlaceInferenceApi(formData)
      .then((res) => res.json())
      .then((data: IPlaceApiRes) => setResponse(data))
      .catch((err) => console.log(err))
  }

  const handleNewImageButtonClick = () => inputRef.current?.click()

  const highlightSentence = () => {
    if (!response) return null
    const { sentence, label_category: labelCategory } = response
    const startIndex = sentence.indexOf(labelCategory)
    const endIndex = startIndex + labelCategory.length

    return (
      <p className={styles.resultSentence}>
        {sentence.slice(0, startIndex)}
        <mark>{sentence.slice(startIndex, endIndex)}</mark>
        {sentence.slice(endIndex)}
      </p>
    )
  }

  const highlightedSentence = highlightSentence()

  return (
    <div className={styles.searchPage}>
      <div className={styles.textWrapper}>{response ? highlightedSentence : INIT_TEXT}</div>
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
              <Button value='다른 이미지 선택' buttonStyle='secondary' onClick={handleNewImageButtonClick} />
              {response ? <Link to='maps'>지도에서 찾기</Link> : <Button value='장소 검색' type='submit' />}
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default Search
