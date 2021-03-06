import React from 'react'

import Button from '~/components/utils/Button'

export default function NotFound() {
  return (
    <>
      <div className="text-9xl font-extrabold text-indigo-600">
        404
      </div>
      <p className="text-xl mt-4 font-bold">Not found</p>
      <div className="w-60 mt-6">
        <Button url="/" fullWidth={true} label="Back home" />
      </div>
    </>
  )
}
