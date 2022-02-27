import React, { useEffect, useState } from 'react'
import ContactForm from '../../../components/ContactForm'

import styles from './index.module.scss'

const ContactDetail = ({ submitEdit, selectedContact, setDetailModal, isLoading }) => {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsEdit(false)
    }
  }, [isLoading])

  return (
    <>
      {
        selectedContact &&
        <div className={styles.detailContainer}>
          <div className={`${styles.detailSection} ${isEdit ? styles.detailEdit : ''}`}>
            <div className={styles.pictureContainer}>
              {
                selectedContact.photo === "N/A" ?
                  <div className={styles.photoNotAvailable}>
                    Photo Not Available
                  </div>
                  :
                  <img src={selectedContact.photo} alt="" />
              }
            </div>
            <div className={styles.textContainer}>
              <h2>{`${selectedContact.firstName} ${selectedContact.lastName}`}</h2>
              <p>{selectedContact.age} Y.O</p>
            </div>
          </div>
          <div className={`${styles.editContainer} ${isEdit ? styles.editActive : ''}`}>
            <ContactForm initialValue={selectedContact} isLoading={isLoading} onSubmit={submitEdit} />
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.editButton} onClick={() => setIsEdit(prevState => !prevState)}>{isEdit ? 'Cancel Edit' : 'Edit Contacts'}</div>
            {
              isEdit ? <></> : <div className={styles.closeButton} onClick={() => setDetailModal(false)}>close</div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default ContactDetail
