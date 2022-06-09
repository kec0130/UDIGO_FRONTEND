import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoil } from 'hooks/useRecoil'
import { queryState, currentPositionState, mapCenterState } from 'states/map'
import { useCurrentPosition } from 'hooks/useCurrentPosition'
import { getMapSearchApi } from 'services/map'
import { IPlace } from 'types/map'

import { ArrowLeftIcon, ArrowRightIcon, MapIcon, SearchIcon } from 'assets/svgs'
import styles from './maps.module.scss'

const ITEMS_PER_PAGE = 15

const Maps = () => {
  const [query, setQuery] = useRecoil(queryState)
  const [inputValue, setInputValue] = useState(query || '')
  const [currentPosition] = useRecoil(currentPositionState)
  const [mapCenter, setMapCenter] = useRecoil(mapCenterState)
  const [searchResult, setSearchResult] = useState<IPlace[]>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlePrevClick = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNextClick = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, ITEMS_PER_PAGE - 1))
  }

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
        query,
        lat: currentPosition.lat,
        lng: currentPosition.lng,
        size: ITEMS_PER_PAGE,
      }).then((res) => setSearchResult(res.data.documents))
  }, [currentPosition.lat, currentPosition.lng, query])

  useEffect(() => {
    if (!searchResult) return
    setMapCenter({
      lat: Number(searchResult[selectedIndex].y),
      lng: Number(searchResult[selectedIndex].x),
    })
  }, [searchResult, selectedIndex, setMapCenter])

  return (
    <div className={styles.mapPage}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div>
          <SearchIcon />
          <input type='text' value={inputValue} onChange={handleInputChange} />
        </div>
      </form>
      <Map className={styles.mapWrapper} center={query ? mapCenter : currentPosition}>
        {searchResult?.map((place, index) => {
          const { id, x, y, place_name: placeName } = place
          return (
            <MapMarker
              key={id}
              position={{ lat: Number(y), lng: Number(x) }}
              onClick={() => setSelectedIndex(index)}
              clickable
            >
              {index === selectedIndex && <div className={styles.infoWindow}>{placeName}</div>}
            </MapMarker>
          )
        })}
      </Map>
      {searchResult?.length && (
        <div className={styles.placeInfo}>
          <div className={styles.left}>
            <button type='button' onClick={handlePrevClick} disabled={selectedIndex === 0} aria-label='previous'>
              <ArrowLeftIcon />
            </button>
            <div className={styles.infoText}>
              <span className={styles.title}>{searchResult[selectedIndex].place_name}</span>
              <span>{searchResult[selectedIndex].address_name}</span>
            </div>
          </div>
          <div className={styles.right}>
            <a
              href={`https://map.kakao.com/link/map/${searchResult[selectedIndex].id}`}
              target='_blank'
              rel='noreferrer'
              title='Open in kakao map'
            >
              <MapIcon />
            </a>
            <button
              type='button'
              onClick={handleNextClick}
              disabled={selectedIndex === ITEMS_PER_PAGE - 1}
              aria-label='next'
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Maps
