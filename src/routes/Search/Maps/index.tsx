import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoil } from 'hooks/useRecoil'
import { queryState, currentPositionState, mapCenterState } from 'states/map'
import { useCurrentPosition } from 'hooks/useCurrentPosition'
import { getMapSearchApi } from 'services/map'
import { IPlace } from 'types/map'

import styles from './maps.module.scss'

const Maps = () => {
  const [query] = useRecoil(queryState)
  const [currentPosition] = useRecoil(currentPositionState)
  const [mapCenter, setMapCenter] = useRecoil(mapCenterState)
  const [searchResult, setSearchResult] = useState<IPlace[]>()

  useCurrentPosition()

  useEffect(() => {
    getMapSearchApi({
      query,
      lat: currentPosition.lat,
      lng: currentPosition.lng,
    })
      .then((res) => setSearchResult(res.data.documents))
      .catch((err) => console.log(err))
  }, [currentPosition.lat, currentPosition.lng, query])

  useEffect(() => {
    if (!searchResult) return
    setMapCenter({
      lat: Number(searchResult[0].y),
      lng: Number(searchResult[0].x),
    })
  }, [searchResult, setMapCenter])

  return (
    <div>
      <Map className={styles.mapWrapper} center={{ lat: mapCenter.lat, lng: mapCenter.lng }}>
        {searchResult?.map((place) => {
          const { id, x, y, place_name: placeName } = place
          return (
            <MapMarker key={id} position={{ lat: Number(y), lng: Number(x) }}>
              <div style={{ color: '#000' }}>{placeName}</div>
            </MapMarker>
          )
        })}
      </Map>
    </div>
  )
}

export default Maps
