import React, { useState, FormEvent } from 'react'

import { createUser, RegisterTypes } from '~/hooks/userProvider'

import Form from '~/components/forms/Form'

const FIELDS = [
  {
    id: 'username',
    type: 'text',
    required: true,
    label: 'Username',
  },
  {
    id: 'email',
    type: 'email',
    required: true,
    label: 'Email',
  },
  {
    id: 'password',
    type: 'password',
    required: true,
    label: 'Password',
    minLength: 6,
  },
]

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e: FormEvent, model: RegisterTypes) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await createUser(model)
    } catch ({ message }) {
      setErrorMessage(message)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Form
        fields={FIELDS}
        onSubmit={onSubmit as any}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </>
  )
}
