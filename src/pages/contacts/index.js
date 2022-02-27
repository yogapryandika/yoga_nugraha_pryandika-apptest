import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactForm from '../../components/ContactForm'
import ErrorBox from '../../components/ErrorBox'
import Modal from '../../components/Modal'
import ContactDetail from './contactDetail'
import { deleteContact, getContacts, postContact, putContacts } from './contactSlice'
import styles from './index.module.scss'

const Contact = () => {
  const dispatch = useDispatch()
  const contactState = useSelector(state => state.contact)

  const [addModal, setAddModal] = useState(false)
  const [detailModal, setDetailModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const [selectedContact, setSelectedContact] = useState()
  const [deleteContactId, setDeleteContact] = useState()

  useEffect(() => {
    dispatch(getContacts())
  }, [dispatch])

  useEffect(() => {
    if (!contactState.loading.post) {
      setAddModal(false)
    }
  }, [contactState.loading.post])

  useEffect(() => {
    if (!contactState.loading.put) {
      setDetailModal(false)
    }
  }, [contactState.loading.put])

  useEffect(() => {
    if (!contactState.loading.delete) {
      setDeleteModal(false)
    }
  }, [contactState.loading.delete])

  const addContact = (data) => {
    dispatch(postContact({ contact: data }))
  }

  const dispatchEdit = (data) => {
    dispatch(putContacts({ contact: data }))
  }

  const selectDetail = (id) => {
    setDetailModal(true)
    setSelectedContact(contactState.contactList.find(item => item.id === id))
  }

  const selectDelete = (id) => {
    setDeleteModal(true)
    setDeleteContact(id)
  }

  const dispatchDelete = () => {
    console.log(deleteContactId)
    dispatch(deleteContact({ id: deleteContactId }))
  }

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactCard}>
        <div className={styles.cardHeader}>
          <h2>Contacts</h2>
        </div>
        <div className={styles.cardContent}>
          {
            contactState.contactList && contactState.contactList.length > 0 && (
              contactState.contactList.map(item => {
                return (
                  <div className={styles.cardItem}>
                    <div className={styles.container}>
                      <div className={styles.cardItemContainer} onClick={() => selectDetail(item.id)}>
                        <div className={styles.profileContainer}>
                          {
                            item.photo === "N/A" ?
                              <div className={styles.photoNotAvailable}>
                                Photo Not Available
                              </div>
                              :
                              <img src={item.photo} alt="" />
                          }
                        </div>
                        <div className={styles.profileTextContainer}>
                          <h3>{`${item.firstName} ${item.lastName}`}</h3>
                          <p>{item.age} y.o</p>
                        </div>
                      </div>
                      <button className={styles.buttonDelete} onClick={() => selectDelete(item.id)}>
                        Delete
                      </button>
                    </div>
                    <hr />
                  </div>
                )
              })
            )
          }
        </div>
        <div className={styles.addButtonContainer}>
          <div className={styles.addButton} onClick={() => setAddModal(true)}>
            +
          </div>
        </div>
      </div>

      <Modal
        active={addModal}
      >
        <div className={styles.addContactContainer}>
          <div className={styles.closeButton} onClick={() => setAddModal(false)}>x</div>
          <ContactForm onSubmit={addContact} isLoading={contactState.loading.post} />
        </div>
      </Modal>

      <Modal
        active={deleteModal}
      >
        <div className={styles.deleteContactContainer}>
          <h2>Are you sure want to delete?</h2>
          <div className={styles.deleteButtonContainer}>
            <button className={styles.btnDelete} onClick={dispatchDelete} disabled={contactState.loading.delete}>Delete</button>
            <button className={styles.btnCancel} onClick={() => {
              setDeleteContact()
              setDeleteModal()
            }}>Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal
        active={detailModal}
      >
        <ContactDetail submitEdit={dispatchEdit} selectedContact={selectedContact} setDetailModal={setDetailModal} isLoading={contactState.loading.put} />
      </Modal>

      <ErrorBox message={contactState.error} />

    </div>
  )
}

export default Contact
