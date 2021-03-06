import React from 'react'

import { UserTypes } from '~/hooks/userProvider'

export default function UserAvatar({
  user,
  size = 10,
}: {
  user: UserTypes
  size?: number
}) {
  return (
    <>
      {!user.image ? (
        <div
          className={`rounded-full bg-gray-400 flex items-center justify-center w-${size} h-${size}`}
        >
          <span className="text-white text-lg font-bold">
            {user.name && user.name.charAt(0)}
          </span>
        </div>
      ) : (
        <img
          className={`h-${size} w-${size} rounded-full`}
          src={user.image}
          alt={`Avatar of ${user.name}`}
        />
      )}
    </>
  )
}
