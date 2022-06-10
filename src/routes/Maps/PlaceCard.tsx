import cx from 'classnames'

import { useRecoil } from 'hooks/useRecoil'
import { selectedIndexState } from 'states/map'
import { IPlace } from 'types/map'
import { ITEMS_PER_PAGE } from './constants'

import { ArrowLeftIcon, ArrowRightIcon, MapIcon } from 'assets/svgs'
import styles from './maps.module.scss'

interface IProps {
  searchResult: IPlace[]
}

const PlaceCard = ({ searchResult }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useRecoil(selectedIndexState)

  const handlePrevClick = () => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNextClick = () => {
    setSelectedIndex((prev) => Math.min(prev + 1, ITEMS_PER_PAGE - 1))
  }

  if (searchResult.length === 0)
    return <div className={cx(styles.placeCard, styles.noResult)}>검색 결과가 없습니다.</div>

  const selectedPlace = searchResult[selectedIndex]

  return (
    <div className={styles.placeCard}>
      <div className={styles.left}>
        <button type='button' onClick={handlePrevClick} disabled={selectedIndex === 0} aria-label='previous'>
          <ArrowLeftIcon />
        </button>
        <div className={styles.textWrapper}>
          <span className={styles.title}>{selectedPlace.place_name}</span>
          <span>{selectedPlace.address_name}</span>
        </div>
      </div>
      <div className={styles.right}>
        <a
          href={`https://map.kakao.com/link/map/${selectedPlace.id}`}
          target='_blank'
          rel='noreferrer'
          title='카카오맵에서 열기'
        >
          <MapIcon />
        </a>
        <button
          type='button'
          onClick={handleNextClick}
          disabled={selectedIndex === ITEMS_PER_PAGE - 1}
          aria-label='next'
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}

export default PlaceCard
