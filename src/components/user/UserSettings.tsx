import React from 'react'

import { UserContext } from '~/App'

import Form from '~/components/forms/Form'

const FIELDS = [
  {
    id: 'bio',
    type: 'textarea',
    required: false,
    label: 'Bio',
  },
  {
    id: 'website',
    type: 'text',
    required: false,
    label: 'Website',
  },
]

export default function UserSettings() {
  return (
    <UserContext.Consumer>
      {(user) => <h1 className="text-4xl font-bold">Coming soon</h1>}
    </UserContext.Consumer>
  )
}
