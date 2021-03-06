import React from 'react'

import { UserContext } from '~/App'

import UserAvatar from '~/components/user/UserAvatar'
import UserSettings from '~/components/user/UserSettings'

export default function Settings() {
  return (
    <UserContext.Consumer>
      {(user) => (
        <div className="py-32 px-3 lg:px-8 w-full max-w-screen-lg	max-w-7xl mx-auto px-3 py-3 sm:px-6 lg:px-8">
          <div className="md:flex md:flex-wrap md:justify-between">
            <div className="w-2/12">
              <div className="w-28 text-center">
                <UserAvatar user={user} size={50} />
                <p className="mt-2 text-sm text-xl font-bold">
                  {user.name}
                </p>
              </div>
            </div>
            <div className="w-10/12">
              <UserSettings />
            </div>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  )
}
