import React, {
  useRef,
  useState,
  ReactNode,
  FormEvent,
  ChangeEvent,
  useEffect,
} from 'react'

import TextField from '~/components/forms/TextField'
import Button from '~/components/utils/Button'

export interface Field {
  id: string
  label: string
  type: string
  required: boolean
  placeholder?: string
  minLength?: number
  maxLength?: number
}

interface Props {
  children?: ReactNode
  fields: Field[]
  isLoading?: boolean
  errorMessage?: string
  submitButtonClass?: string
  inline?: boolean
  onSubmit: (e: FormEvent, model: object) => void
}

type Model = {
  [key: string]: string
}

export default function Form({
  fields,
  isLoading,
  children,
  errorMessage,
  submitButtonClass = 'mt-8',
  inline,
  onSubmit,
}: Props) {
  const [model, setModel] = useState<Model>({})
  const [errors, setErrors] = useState<Model>({})

  const hasValidate = useRef(false)
  const hasErrors = useRef(false)

  const checkErrors = (errors: Model) =>
    (hasErrors.current = Object.keys(errors).some(
      (key) => !!errors[key],
    ))

  useEffect(() => {
    checkErrors(errors)
  }, [model])

  const onChange = (e: ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement
    setModel({ ...model, [element.id]: element.value })
    setErrors({
      ...errors,
      [element.id]: element.validationMessage,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    hasValidate.current = true
    const localErrs: Model = {}
    const elements: NodeListOf<HTMLInputElement> = e.currentTarget.querySelectorAll(
      'input, select, textarea',
    )
    elements.forEach((element) => {
      localErrs[element.id] = element.validationMessage
    })
    if (checkErrors(localErrs)) {
      setErrors({ ...errors, ...localErrs })
      return
    }
    return onSubmit(e, model)
  }

  return (
    <form
      noValidate
      className={`${
        isLoading ? 'opacity-50 pointer-events-none' : ''
      } ${inline ? 'flex flex-wrap' : ''} `}
      onSubmit={handleSubmit as any}
    >
      {Object.values(fields).map(
        (field, index) =>
          ['text', 'password', 'email', 'textarea', 'tel'].includes(
            field.type,
          ) && (
            <div
              className={`${
                index < fields.length - 1 ? 'mb-4' : ''
              } ${inline ? 'flex-1 mr-2' : ''}`}
              key={field.id}
            >
              <TextField
                {...field}
                value={model[field.id]}
                onChange={onChange}
              />
              {!!errors[field.id] && hasValidate.current && (
                <span
                  id={`${field.id}-error-message`}
                  className="text-red-500 text-xs mt-1 leading-4"
                >
                  {errors[field.id]}
                </span>
              )}
            </div>
          ),
      )}
      {children}
      {errorMessage && (
        <p className="my-4 text-red-500 text-xs">{errorMessage}</p>
      )}
      <div className={!inline ? submitButtonClass : ''}>
        <Button
          small={inline}
          isLoading={isLoading}
          label="Submit"
          fullWidth={!inline}
          style={{ minWidth: '100px' }}
          type="submit"
        />
      </div>
    </form>
  )
}
