import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoil } from 'hooks/useRecoil'
import { currentPositionState, mapCenterState, queryState, selectedIndexState } from 'states/map'
import { IPlace } from 'types/map'

import styles from './maps.module.scss'

interface IProps {
  searchResult: IPlace[] | undefined
}

const KakaoMap = ({ searchResult }: IProps) => {
  const [query] = useRecoil(queryState)
  const [currentPosition] = useRecoil(currentPositionState)
  const [mapCenter] = useRecoil(mapCenterState)
  const [selectedIndex, setSelectedIndex] = useRecoil(selectedIndexState)

  return (
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
  )
}

export default KakaoMap
