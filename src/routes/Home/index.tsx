import { ChangeEvent, FormEvent, useState } from 'react'

import { getPlaceInferenceApi } from 'services/place'
import { IPlaceApiRes } from 'types/place'

const Home = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [imageFile, setImageFile] = useState<File>()
  const [response, setResponse] = useState<IPlaceApiRes>()

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = e

    if (!files) return
    const file = files[0]
    setImageFile(file)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const { result } = reader
      if (!result) return
      setImageSrc(result as string)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input type='file' accept='image/*' onChange={handleFileChange} />
        </label>
        <button type='submit'>제출</button>
        {imageSrc && <img src={imageSrc} alt='preview' />}
      </form>
      <div>{response?.sentence}</div>
    </>
  )
}

export default Home
