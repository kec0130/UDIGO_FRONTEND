import { Outlet } from 'react-router-dom'

import GNB from './GNB'
import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.container}>
      <GNB />
      <Outlet />
    </div>
  )
}

export default Layout
