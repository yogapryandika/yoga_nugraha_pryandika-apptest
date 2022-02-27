import React from 'react'
import styles from './index.module.scss'

const Modal = ({ active, children }) => {
  return (
    <div className={`${styles.modal} ${active ? styles.active : ''}`}>
      <div className={styles.modalCard}>
        {children}
      </div>
    </div>
  )
}

export default Modal
