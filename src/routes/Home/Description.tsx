import { ReactNode } from 'react'
import cx from 'classnames'

import { IDescription } from './constants/text'
import { BASE_URL } from './constants/images'

import styles from './home.module.scss'

interface IProps extends IDescription {
  imageList: string[]
  className?: string
  keyPrefix: string
  directory: string
  children?: ReactNode
}

const Description = ({ title, description, imageList, className, keyPrefix, directory, children }: IProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
      <ul className={cx(styles.imageList, styles[className || ''])}>
        {imageList.map((image) => (
          <li key={`${keyPrefix}-${image}`}>
            <img src={`${BASE_URL}/${directory}/${image}.jpeg`} alt={image} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Description
