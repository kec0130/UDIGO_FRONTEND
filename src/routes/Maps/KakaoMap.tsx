import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoil } from 'hooks/useRecoil'
import { currentPositionState, mapCenterState, selectedIndexState } from 'states/map'
import { IPlace } from 'types/map'

import styles from './maps.module.scss'
import { useEffect } from 'react'

interface IProps {
  searchResult: IPlace[]
}

const KakaoMap = ({ searchResult }: IProps) => {
  const [currentPosition] = useRecoil(currentPositionState)
  const [mapCenter, setMapCenter] = useRecoil(mapCenterState)
  const [selectedIndex, setSelectedIndex] = useRecoil(selectedIndexState)

  useEffect(() => {
    setMapCenter(
      searchResult.length === 0
        ? currentPosition
        : {
            lat: Number(searchResult[selectedIndex].y),
            lng: Number(searchResult[selectedIndex].x),
          }
    )
  }, [currentPosition, searchResult, selectedIndex, setMapCenter])

  return (
    <Map className={styles.mapWrapper} center={mapCenter}>
      {searchResult.map((place, index) => {
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
  )
}

export default KakaoMap
