import cx from 'classnames'
import styles from './imageGrid.module.scss'

import { BASE_URL } from 'constants/images'

export interface IImageGridProps {
  imageList: string[]
  className?: string
  keyPrefix: string
  directory: string
}

const ImageGrid = ({ imageList, className, keyPrefix, directory }: IImageGridProps) => {
  return (
    <ul className={cx(styles.imageList, styles[className || ''])}>
      {imageList.map((image) => (
        <li key={`${keyPrefix}-${image}`}>
          <img src={`${BASE_URL}/${directory}/${image}.jpeg`} alt={image} />
        </li>
      ))}
    </ul>
  )
}

export default ImageGrid
