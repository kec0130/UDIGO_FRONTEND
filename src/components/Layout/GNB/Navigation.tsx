import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import styles from '../layout.module.scss'

const Navagation = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink to='search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            검색
          </NavLink>
        </li>
        <li>
          <NavLink to='favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            즐겨찾기
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navagation
