import React, { useState } from 'react'
import Logo from '~/components/utils/Logo'
import UserMenu from '~/components/user/UserMenu'
import Button from '~/components/utils/Button'
import Modal from '~/components/utils/Modal'
import CreatePost from '~/components/posts/CreatePost'

import { UserContext } from '~/App'

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <nav className="bg-white fixed right-0 left-0 top-0 border-b z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-3 py-3 sm:px-6 lg:px-8">
          <Logo />
          <UserContext.Consumer>
            {(user) =>
              !!user && (
                <div className="flex items-center pr-6">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    label="New Post"
                    small={true}
                  />
                  <UserMenu user={user} />
                </div>
              )
            }
          </UserContext.Consumer>
        </div>
      </nav>
      <Modal
        isActive={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New post"
      >
        <CreatePost onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}
