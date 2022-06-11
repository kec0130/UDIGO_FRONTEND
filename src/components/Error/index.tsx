import { ErrorIcon } from 'assets/svgs'
import styles from './error.module.scss'

interface IProps {
  message: string
}

const ErrorMessage = ({ message }: IProps) => {
  return (
    <div className={styles.error}>
      <ErrorIcon />
      <span>{message}</span>
    </div>
  )
}

export default ErrorMessage
