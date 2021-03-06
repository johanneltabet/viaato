import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  isInverted?: boolean
  hasText?: boolean
  children?: ReactNode
  iconSize?: {
    width: number
    height: number
  }
}

export default function Logo({
  isInverted = false,
  hasText = true,
  iconSize = {
    width: 32,
    height: 32,
  },
  children,
}: Props) {
  return (
    <Link className="flex items-center" to="/">
      <svg
        className="mx-auto"
        viewBox="0 0 36 36"
        width={iconSize.width}
        height={iconSize.height}
      >
        <path
          d="M18 .51A17.49 17.49 0 1 0 35.49 18 17.49 17.49 0 0 0 18 .51zM7.61 20a.32.32 0 0 1-.19-.07.3.3 0 0 1-.11-.23v-1.81a.32.32 0 0 1 .15-.26l7.08-4a.3.3 0 0 1 .29 0 .27.27 0 0 1 .16.25l.18 4.64a.32.32 0 0 1-.26.32L7.66 20zm15 8.79a.65.65 0 0 1-.68.33l-3.85-.75a.34.34 0 0 0-.16 0h-.08l-3.84.7h-.13a.61.61 0 0 1-.52-.29.64.64 0 0 1 0-.67l.05-.05 2.6-2.27c.06 0 .08-.09.1-.18l-.6-16.18a2.5 2.5 0 0 1 5 0l-.63 16.22a.2.2 0 0 0 .08.14L22.53 28v.05a.65.65 0 0 1 .11.69zm6.05-9.09a.3.3 0 0 1-.11.23.32.32 0 0 1-.19.07h-.05l-7.21-1.16a.32.32 0 0 1-.26-.32l.16-4.64a.28.28 0 0 1 .16-.25.3.3 0 0 1 .29 0l7.08 4a.32.32 0 0 1 .15.26z"
          fill="#4F46E5"
        />
      </svg>
      {hasText && (
        <span
          className={`${
            isInverted ? 'text-white' : 'text-gray-900'
          } font-bold px-2 text-2xl`}
        >
          viaato
        </span>
      )}
      {children}
    </Link>
  )
}
