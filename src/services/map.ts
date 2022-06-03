import axios from 'axios'
import { IMapSearchApiRes } from 'types/map'

interface Params {
  query: string
  x: number
  y: number
  radius?: number
  size?: number
  sort?: string
}

const MAP_BASE_URL = 'https://dapi.kakao.com/v2/local'

export const getMapSearchApi = (params: Params) =>
  axios.get<IMapSearchApiRes>(`${MAP_BASE_URL}/search/keyword`, {
    params: {
      ...params,
    },
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
    },
  })
