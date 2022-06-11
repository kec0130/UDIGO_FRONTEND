import { ChangeEvent, FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { useRecoil } from 'hooks/useRecoil'
import { useCurrentPosition } from 'hooks/useCurrentPosition'
import { currentPositionState, selectedIndexState } from 'states/map'
import { getMapSearchApi } from 'services/map'
import { ITEMS_PER_PAGE } from './constants'

import KakaoMap from './KakaoMap'
import PlaceCard from './PlaceCard'
import { SearchIcon } from 'assets/svgs'
import styles from './maps.module.scss'

const Maps = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchWord = searchParams.get('keyword') || ''

  const [inputValue, setInputValue] = useState(searchWord || '')
  const [currentPosition] = useRecoil(currentPositionState)
  const [, , resetSelectedIndex] = useRecoil(selectedIndexState)

  const { data, isLoading } = useQuery(
    ['getMapSearchApi', searchWord],
    () =>
      getMapSearchApi({ ...currentPosition, query: searchWord, size: ITEMS_PER_PAGE }).then(
        (res) => res.data.documents
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !!searchWord,
    }
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || inputValue === searchWord) return
    setSearchParams({ keyword: inputValue })
    resetSelectedIndex()
  }

  useCurrentPosition()

  return (
    <div className={styles.mapPage}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div>
          <SearchIcon />
          <input type='text' placeholder='장소를 검색하세요.' value={inputValue} onChange={handleInputChange} />
        </div>
      </form>
      <KakaoMap data={data} />
      {!isLoading && searchWord && <PlaceCard data={data} />}
    </div>
  )
}

export default Maps
