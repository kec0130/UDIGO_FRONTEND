import { LoadingIcon } from 'assets/svgs'
import styles from './loadingSpinner.module.scss'

const LoadingSpinner = () => {
  return (
    <div>
      <LoadingIcon className={styles.loadingIcon} />
    </div>
  )
}

export default LoadingSpinner
