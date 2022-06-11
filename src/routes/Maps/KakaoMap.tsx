import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoil } from 'hooks/useRecoil'
import { currentPositionState, selectedIndexState } from 'states/map'
import { IMapProps, IPosition } from 'types/map'

import styles from './maps.module.scss'

const KakaoMap = ({ data }: IMapProps) => {
  const [currentPosition] = useRecoil(currentPositionState)
  const [selectedIndex, setSelectedIndex] = useRecoil(selectedIndexState)
  const [mapCenter, setMapCenter] = useState<IPosition>({ lat: 0, lng: 0 })

  useEffect(() => {
    setMapCenter(
      !data || data.length === 0
        ? currentPosition
        : {
            lat: Number(data[selectedIndex].y),
            lng: Number(data[selectedIndex].x),
          }
    )
  }, [currentPosition, data, selectedIndex, setMapCenter])

  return (
    <Map className={styles.mapWrapper} center={mapCenter}>
      {data?.map((place, index) => {
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
