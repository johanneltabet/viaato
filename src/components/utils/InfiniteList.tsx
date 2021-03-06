import React, { Children, ReactNode } from 'react'
import flattenNodes from 'react-keyed-flatten-children'

interface Props {
  children: ReactNode
}

export default function InfiniteList({ children }: Props) {
  return (
    <ul>
      {Children.map(flattenNodes(children), (child) => (
        <li>{child}</li>
      ))}
    </ul>
  )
}
