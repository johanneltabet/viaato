import React, { createRef, ChangeEvent } from 'react'

import { Field } from '~/components/forms/Form'

interface FieldProps extends Field {
  value: string
  onChange: (e: ChangeEvent) => void
}

export default function TextField({
  id,
  label,
  type = 'text',
  required,
  placeholder,
  value,
  minLength,
  maxLength,
  onChange,
}: FieldProps) {
  const input = createRef<HTMLInputElement>()
  const textarea = createRef<HTMLTextAreaElement>()

  const props = {
    id,
    ...(type !== 'textarea' && { type }),
    defaultValue: value,
    className: `${
      type === 'textarea' && 'h-40'
    } rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`,
    'described-by': `${id}-error-message`,
    placeholder,
    required,
    minLength: minLength,
    maxLength: maxLength,
    onChange,
  }
  return (
    <>
      {label && (
        <label className="mb-2 text-sm mb-2 block" htmlFor={id}>
          {label}
          {required && label ? '*' : ''}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea ref={textarea} {...props} />
      ) : (
        <input ref={input} {...props} />
      )}
    </>
  )
}
