import { ChangeEvent, FormEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useRecoil } from 'hooks/useRecoil'
import { useCurrentPosition } from 'hooks/useCurrentPosition'
import { queryState, currentPositionState, selectedIndexState } from 'states/map'
import { getMapSearchApi } from 'services/map'
import { ITEMS_PER_PAGE } from './constants'

import KakaoMap from './KakaoMap'
import PlaceCard from './PlaceCard'
import { SearchIcon } from 'assets/svgs'
import styles from './maps.module.scss'

const Maps = () => {
  const [query, setQuery] = useRecoil(queryState)
  const [inputValue, setInputValue] = useState(query || '')
  const [currentPosition] = useRecoil(currentPositionState)
  const [, , resetSelectedIndex] = useRecoil(selectedIndexState)

  const { data } = useQuery(
    ['getMapSearchApi', query],
    () => getMapSearchApi({ ...currentPosition, query, size: ITEMS_PER_PAGE }).then((res) => res.data.documents),
    {
      refetchOnWindowFocus: false,
      enabled: !!query,
    }
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || inputValue === query) return
    setQuery(inputValue)
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
      {query && <PlaceCard data={data} />}
    </div>
  )
}

export default Maps
