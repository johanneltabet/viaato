import React, { useState, FormEvent, ReactNode } from 'react'

import Form, { Field } from '~/components/forms/Form'
import Button from '~/components/utils/Button'

import { resetPassword } from '~/hooks/userProvider'

interface Props {
  children?: ReactNode
  fields: Field[]
  onLoginClick: (e: MouseEvent) => void
}

export default function PasswordReset({
  fields,
  children,
  onLoginClick,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSucess, setIsSuccess] = useState(false)

  const onSubmit = async (e: FormEvent, model: { email: string }) => {
    setErrorMessage('')
    setIsLoading(true)
    try {
      await resetPassword(model)
      setIsSuccess(true)
    } catch ({ message }) {
      setErrorMessage(message)
    }
    setIsLoading(false)
  }

  return (
    <>
      {!isSucess ? (
        <>
          <h2 className="text-xl text-center font-bold text-indigo-500">
            Reset your password
          </h2>
          <Form
            fields={fields}
            onSubmit={onSubmit as any}
            isLoading={isLoading}
            errorMessage={errorMessage}
          >
            {children}
          </Form>
        </>
      ) : (
        <>
          <p className="text-center">
            Please check your email for a reset link.
          </p>
          <div className="mt-6">
            <Button
              onClick={onLoginClick}
              label="Log in"
              fullWidth={true}
            />
          </div>
        </>
      )}
    </>
  )
}
