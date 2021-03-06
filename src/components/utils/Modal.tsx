import React, { useEffect, ReactNode } from 'react'
import { Transition } from '@headlessui/react'

import { CgClose } from 'react-icons/cg'

interface Props {
  type?: 'default' | 'sidepanel'
  title?: string
  isActive: boolean
  onClose: (e: MouseEvent) => void
  children: ReactNode
}

export default function Modal({
  type,
  title,
  isActive,
  onClose,
  children,
}: Props) {
  const handleEscape = (e: any) => {
    if (e.code === 'Escape') onClose(e)
  }
  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  })
  return (
    <div
      className={`${
        !isActive && 'invisible'
      } fixed z-10 inset-0 overflow-y-auto`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition
          appear={true}
          show={isActive}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 transition-all"
          aria-hidden="true"
          onClick={onClose as any}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </Transition>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        />
        <Transition
          appear={true}
          show={isActive}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full min-w-full sm:min-w-0"
          role="dialog"
          aria-modal="true"
        >
          <div className="border-b border-gray-200 flex justify-between items-center pl-8 pr-6 py-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <button
              className="focus:outline-none"
              onClick={onClose as any}
            >
              <CgClose size="1.75rem" />
            </button>
          </div>
          <div className="p-4 lg:p-8">{children}</div>
        </Transition>
      </div>
    </div>
  )
}
