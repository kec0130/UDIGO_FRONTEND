import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { getPlaceInferenceApi } from 'services/place'
import { IPlaceApiRes, TSearchStatus } from 'types/place'

import Description from './Description'
import Buttons from './Buttons'
import { ImageIcon } from 'assets/svgs'
import styles from './search.module.scss'

const Search = () => {
  const [status, setStatus] = useState<TSearchStatus>('init')
  const [imageSrc, setImageSrc] = useState('')
  const [imageFile, setImageFile] = useState<File>()
  const [response, setResponse] = useState<IPlaceApiRes>()
  const [searchWord, setSearchWord] = useState('')
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
    setStatus('init')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData()
    if (!imageFile) return
    formData.append('image', imageFile)

    getPlaceInferenceApi(formData)
      .then((res) => res.json())
      .then((data: IPlaceApiRes) => {
        setResponse(data)
        setSearchWord(data.label_category)
        setStatus('done')
      })

    // TODO: remove dummy data
    // const data: IPlaceApiRes = {
    //   label_category: '박물관',
    //   sentence: '화려한 박물관이군요!',
    // }
    // setResponse(data)
    // setSearchWord(data.label_category)
    // setStatus('done')
  }

  return (
    <div className='pageContainer'>
      <Description status={status} response={response} />
      <form onSubmit={handleSubmit} className={styles.imageUploadForm}>
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
        {imageSrc && <Buttons status={status} inputRef={inputRef} searchWord={searchWord} />}
      </form>
    </div>
  )
}

export default Search
