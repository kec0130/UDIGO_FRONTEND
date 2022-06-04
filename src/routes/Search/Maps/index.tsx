import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoil } from 'hooks/useRecoil'
import { queryState, currentPositionState, mapCenterState } from 'states/map'
import { useCurrentPosition } from 'hooks/useCurrentPosition'
import { getMapSearchApi } from 'services/map'
import { IPlace } from 'types/map'

import { ArrowLeftIcon, ArrowRightIcon, MapIcon } from 'assets/svgs'
import styles from './maps.module.scss'

const PER_PAGE = 15

const Maps = () => {
  const [query] = useRecoil(queryState)
  const [currentPosition] = useRecoil(currentPositionState)
  const [mapCenter, setMapCenter] = useRecoil(mapCenterState)
  const [searchResult, setSearchResult] = useState<IPlace[]>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlePrevClick = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNextClick = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, PER_PAGE - 1))
  }

  useCurrentPosition()

  useEffect(() => {
    getMapSearchApi({
      query,
      lat: currentPosition.lat,
      lng: currentPosition.lng,
      size: PER_PAGE,
    })
      .then((res) => setSearchResult(res.data.documents))
      .catch((err) => console.log(err))
  }, [currentPosition.lat, currentPosition.lng, query])

  useEffect(() => {
    if (!searchResult) return
    setMapCenter({
      lat: Number(searchResult[selectedIndex].y),
      lng: Number(searchResult[selectedIndex].x),
    })
  }, [searchResult, selectedIndex, setMapCenter])

  return (
    <div>
      <Map className={styles.mapWrapper} center={mapCenter}>
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
      {searchResult && (
        <div className={styles.placeInfo}>
          <div className={styles.container}>
            <div className={styles.left}>
              <button type='button' onClick={handlePrevClick} disabled={selectedIndex === 0} aria-label='previous'>
                <ArrowLeftIcon />
              </button>
              <div>
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
                disabled={selectedIndex === PER_PAGE - 1}
                aria-label='next'
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Maps
