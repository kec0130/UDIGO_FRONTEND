import { Route, Routes } from 'react-router-dom'

import Layout from 'components/Layout'
import Home from './Home'
import Favorites from './Favorites'
// import styles from './routes.module.scss'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
}

export default App
