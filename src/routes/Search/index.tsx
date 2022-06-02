import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { getPlaceInferenceApi } from 'services/place'
import { IPlaceApiRes } from 'types/place'

import styles from './search.module.scss'

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

  return (
    <>
      <div>
        <h3>Title</h3>
        {response ? <div>{response.sentence}</div> : <p>description</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            ref={inputRef}
            className={styles.hidden}
            id='image-input'
          />
          {imageSrc ? (
            <img src={imageSrc} alt='preview' />
          ) : (
            <label htmlFor='image-input'>이미지를 업로드하세요.</label>
          )}
        </div>
        {imageSrc && (
          <div>
            <button type='button' onClick={handleNewImageButtonClick}>
              다른 이미지 선택
            </button>
            {response ? <button type='button'>지도에서 찾기</button> : <button type='submit'>장소 추론</button>}
          </div>
        )}
      </form>
      <div>image examples</div>
    </>
  )
}

export default Search
