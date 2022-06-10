import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useRecoil } from 'hooks/useRecoil'
import { useCurrentPosition } from 'hooks/useCurrentPosition'
import { queryState, currentPositionState } from 'states/map'
import { getMapSearchApi } from 'services/map'
import { IPlace } from 'types/map'
import { ITEMS_PER_PAGE } from './constants'

import PlaceCard from './PlaceCard'
import KakaoMap from './KakaoMap'
import { SearchIcon } from 'assets/svgs'
import styles from './maps.module.scss'

const Maps = () => {
  const [query, setQuery] = useRecoil(queryState)
  const [inputValue, setInputValue] = useState(query || '')
  const [searchResult, setSearchResult] = useState<IPlace[]>([])
  const [currentPosition] = useRecoil(currentPositionState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || inputValue === query) return
    setQuery(inputValue)
  }

  useCurrentPosition()

  useEffect(() => {
    query &&
      getMapSearchApi({
        ...currentPosition,
        query,
        size: ITEMS_PER_PAGE,
      }).then((res) => setSearchResult(res.data.documents))
  }, [currentPosition, query])

  return (
    <div className={styles.mapPage}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div>
          <SearchIcon />
          <input type='text' placeholder='장소를 검색하세요.' value={inputValue} onChange={handleInputChange} />
        </div>
      </form>
      <KakaoMap searchResult={searchResult} />
      <PlaceCard searchResult={searchResult} />
    </div>
  )
}

export default Maps
