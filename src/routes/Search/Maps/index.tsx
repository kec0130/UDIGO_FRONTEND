import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { getMapSearchApi } from 'services/map'
import { IPlace } from 'types/map'

import styles from './maps.module.scss'

const Maps = () => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [placeList, setPlaceList] = useState<IPlace[]>()

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  })

  useEffect(() => {
    getMapSearchApi({
      query: '백화점',
      x: longitude,
      y: latitude,
    })
      .then((res) => setPlaceList(res.data.documents))
      .catch((err) => console.log(err))
  }, [latitude, longitude])

  return (
    <div>
      <Map className={styles.mapWrapper} center={{ lat: latitude, lng: longitude }}>
        {placeList?.map((place) => {
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
