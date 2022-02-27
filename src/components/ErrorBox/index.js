import React from 'react'

import styles from './index.module.scss'

const ErrorBox = ({ message }) => {
  return (
    <div className={`${styles.errorBox} ${message ? styles.active : ''}`}>
      {message}
    </div>
  )
}

export default ErrorBox
