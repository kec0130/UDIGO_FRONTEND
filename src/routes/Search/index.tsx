import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { getPlaceInferenceApi } from 'services/place'
import { IPlaceApiRes, TSearchStatus } from 'types/place'
import { useModal } from 'hooks/useModal'
import { SAMPLE_IMAGES } from 'constants/images'

import Button from 'components/Button'
import Modal from 'components/Modal'
import ImageGrid from 'components/ImageGrid'
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
  const { isModalOpen, openModal, closeModal } = useModal()

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
      .catch(() => setStatus('error'))
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
        {imageSrc ? (
          <Buttons status={status} inputRef={inputRef} searchWord={searchWord} />
        ) : (
          <Button value='샘플 이미지 사용하기' buttonStyle='secondary' size='fullWidth' onClick={openModal} />
        )}
      </form>
      {isModalOpen && (
        <Modal closeModal={closeModal} title='샘플 이미지 선택하기'>
          <ImageGrid
            imageList={SAMPLE_IMAGES}
            className='sampleImagesInModal'
            keyPrefix='sample-image'
            directory='images_en'
          />
        </Modal>
      )}
    </div>
  )
}

export default Search
