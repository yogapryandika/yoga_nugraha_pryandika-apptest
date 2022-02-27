import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import styles from './index.module.scss'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.string().required(),
  photo: yup.string()
})

const ContactForm = ({ initialValue, onSubmit, isLoading }) => {

  const { reset, handleSubmit, register, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      photo: initialValue?.photo ?? 'N/A',
      firstName: initialValue?.firstName ?? '',
      lastName: initialValue?.lastName ?? '',
      age: initialValue?.age ?? ''
    }
  })

  useEffect(() => {
    reset(initialValue)
  }, [initialValue, reset])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label>firstname</label>
        <input type="text" {...register("firstName")} data-testid="firstName" />
        {errors.firstName && <p role="alert">Please provide the firstname</p>}
      </div>
      <div className={styles.formGroup}>
        <label>lastname</label>
        <input type="text" {...register("lastName")} data-testid="lastName" />
        {errors.lastName && <p role="alert">Please provide the lastname</p>}
      </div>
      <div className={styles.formGroup}>
        <label>age</label>
        <input type="text" {...register("age")} data-testid="age" />
        {errors.age && <p role="alert">Please provide the age</p>}
      </div>
      <div className={styles.formGroup}>
        <label>photo</label>
        <input type="text" {...register("photo")} data-testid="photo" />
        {errors.photo && <p role="alert">Please provide the photo</p>}
      </div>
      <button
        type='submit'
        disabled={isLoading}
        data-testid="submit"
      >
        Submit
      </button>
    </form>
  )
}

export default ContactForm
