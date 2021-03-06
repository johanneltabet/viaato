import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'

import transition from '~/utils/transition'

import useOnClickOutside from '~/hooks/useClickOutside'
import { UserTypes, logOut } from '~/hooks/userProvider'

import UserAvatar from '~/components/user/UserAvatar'

export default function UserMenu({ user }: { user: UserTypes }) {
  const root = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  useOnClickOutside(root, () => setIsOpen(false))

  return (
    <div ref={root} className="ml-5 relative">
      <div>
        <button
          className="flex text-sm rounded-full"
          id="user-menu"
          aria-haspopup="true"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Open user menu</span>
          <UserAvatar user={user as UserTypes} />
        </button>
      </div>
      <Transition
        show={isOpen}
        {...transition('scale')}
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
      >
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Your Profile
        </Link>
        <Link
          to="/settings"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Settings
        </Link>
        <button
          onClick={logOut}
          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
          role="menuitem"
        >
          Sign out
        </button>
      </Transition>
    </div>
  )
}
