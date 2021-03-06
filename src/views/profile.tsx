import React from 'react'

import { UserContext } from '~/App'

import UserAvatar from '~/components/user/UserAvatar'
import Button from '~/components/utils/Button'

export default function ProfilePage() {
  return (
    <div className="py-32 px-3 lg:px-8 w-full max-w-screen-lg	m-x-auto flex justify-center">
      <UserContext.Consumer>
        {(user) => (
          <div className="text-center">
            <UserAvatar user={user} size={300} />
            <h1 className="text-4xl font-extrabold mt-4">
              {user.name}
            </h1>
            <p>{user.email}</p>
            <div className="mt-8">
              <Button url="/settings" label="Edit settings" />
            </div>
          </div>
        )}
      </UserContext.Consumer>
    </div>
  )
}
