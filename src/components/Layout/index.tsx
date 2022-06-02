import { Outlet } from 'react-router-dom'

import GNB from './GNB'
import styles from './layout.module.scss'

const Layout = () => {
  return (
    <>
      <GNB />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
