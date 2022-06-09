import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useRecoil } from 'hooks/useRecoil'
import { queryState } from 'states/map'
import { IPlaceApiRes, TSearchStatus } from 'types/place'

import Button from 'components/Button'
import Description from './Description'
import { ImageIcon } from 'assets/svgs'
import styles from './search.module.scss'

const Search = () => {
  const [status, setStatus] = useState<TSearchStatus>('init')
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
    setStatus('loading')

    const formData = new FormData()
    if (!imageFile) return
    formData.append('image', imageFile)

    // getPlaceInferenceApi(formData)
    //   .then((res) => res.json())
    //   .then((data: IPlaceApiRes) => {
    //     setResponse(data)
    //     setQuery(data.label_category)
    //     setStatus('done')
    //   })

    // dummy data
    const data: IPlaceApiRes = {
      label_category: '쇼핑몰',
      sentence: '화려한 쇼핑몰이군요!',
    }
    setResponse(data)
    setQuery(data.label_category)
    setStatus('done')
  }

  const handleNewImageButtonClick = () => inputRef.current?.click()

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
        <div className={styles.buttonWrapper}>
          {imageSrc && (
            <>
              <Button
                value='다른 이미지 선택'
                buttonStyle='secondary'
                disabled={status === 'loading'}
                onClick={handleNewImageButtonClick}
              />
              {response ? (
                <Link to='/maps'>지도에서 찾기</Link>
              ) : (
                <Button value='장소 검색' type='submit' disabled={status === 'loading'} />
              )}
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default Search
