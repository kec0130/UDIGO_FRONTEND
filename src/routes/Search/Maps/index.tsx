import { Map, MapMarker } from 'react-kakao-maps-sdk'

import styles from './maps.module.scss'

const Maps = () => {
  return (
    <div>
      <Map className={styles.mapWrapper} center={{ lat: 33.450701, lng: 126.570667 }}>
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }}>
          <div style={{ color: '#000' }}>Hello World!</div>
        </MapMarker>
      </Map>
    </div>
  )
}

export default Maps
