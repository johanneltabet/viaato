import React, { useState, FormEvent } from 'react'

import { LoginTypes, logUser } from '~/hooks/userProvider'

import Form from '~/components/forms/Form'
import PasswordReset from '~/components/user/PasswordReset'

const FIELDS = [
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
  },
]

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPasswordReset, setIsPasswordReset] = useState(false)

  const onSubmit = async (e: FormEvent, model: LoginTypes) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await logUser(model)
    } catch ({ message }) {
      setErrorMessage(message)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isPasswordReset && (
        <PasswordReset
          fields={[FIELDS[0]]}
          onLoginClick={() => setIsPasswordReset(false)}
        >
          <button
            className="text-sm w-full block mt-4 focus:outline-none text-indigo-400 underline"
            onClick={() => setIsPasswordReset(false)}
          >
            Login
          </button>
        </PasswordReset>
      )}
      {!isPasswordReset && (
        <Form
          fields={FIELDS}
          onSubmit={onSubmit as any}
          isLoading={isLoading}
          errorMessage={errorMessage}
        >
          <div className="text-right">
            <button
              type="button"
              className="focus:outline-none text-xs text-indigo-400 underline"
              onClick={() => setIsPasswordReset(true)}
            >
              Forgot your password?
            </button>
          </div>
        </Form>
      )}
    </>
  )
}
