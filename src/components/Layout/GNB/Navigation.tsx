import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import styles from '../layout.module.scss'

interface INavItem {
  to: string
  title: string
}

const navList: INavItem[] = [
  {
    to: '/',
    title: '홈',
  },
  {
    to: 'search',
    title: '검색',
  },
]

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        {navList.map((item) => (
          <li key={`gnb-item-${item.title}`}>
            <NavLink to={item.to} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
