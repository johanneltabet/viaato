import React from 'react'

interface Props {
  isInverted?: boolean
  color?: string
}

export default function Loader({
  isInverted,
  color = '#4F46E5',
}: Props) {
  return (
    <svg width="18px" height="18px" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={isInverted ? '#ffffff' : color}
        strokeWidth="11"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  )
}
