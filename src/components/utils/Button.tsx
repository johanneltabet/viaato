import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Loader from '~/components/utils/Loader'

interface Color {
  indigo: string
  'light-gray': string
}

interface Props {
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
  isDisabled?: boolean
  label: string
  fullWidth?: boolean
  small?: boolean
  url?: string
  color?: 'indigo' | 'light-gray'
  style?: Object
  children?: ReactNode
  onClick?: (e: MouseEvent) => void
}

const COLORS: Color = {
  indigo: 'text-white bg-indigo-600 hover:bg-indigo-700',
  'light-gray': 'text-gray-500 bg-gray-100 hover:bg-gray-200',
}

export default function Button({
  type = 'button',
  isLoading,
  isDisabled,
  label = 'Proceed',
  fullWidth,
  small,
  url,
  color = 'indigo',
  style,
  children,
  onClick,
}: Props) {
  const className = `${fullWidth && 'w-full'} ${
    small
      ? 'text-sm py-1 px-3 rounded-md'
      : 'text-base py-3 px-4 rounded-lg'
  } ${
    COLORS[color]
  } h-10 flex items-center justify-center transition ease-in duration-200 text-center font-semibold focus:outline-none`
  return !url ? (
    <button
      disabled={isDisabled || isLoading}
      className={className}
      type={type}
      onClick={onClick as any}
      style={style}
    >
      {isLoading && <Loader isInverted={true} />}
      {!isLoading && children}
      {!isLoading && label && (
        <span className={`${children && 'ml-2'}`}>{label}</span>
      )}
    </button>
  ) : (
    <Link className={className} to={url} style={style}>
      {children}
      {label && (
        <span className={`${children && 'ml-2'}`}>{label}</span>
      )}
    </Link>
  )
}
