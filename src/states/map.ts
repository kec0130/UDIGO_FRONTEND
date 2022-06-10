import { atom } from 'recoil'

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

export const selectedIndexState = atom({
  key: 'selectedIndexState',
  default: 0,
})
