import { atom } from 'recoil'

export const queryState = atom({
  key: 'queryState',
  default: '',
})

export const currentPositionState = atom({
  key: 'currentPositionState',
  default: {
    lat: 0,
    lng: 0,
  },
})

export const mapCenterState = atom({
  key: 'mapCenterState',
  default: {
    lat: 0,
    lng: 0,
  },
})
