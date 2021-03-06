import React, { Children, ReactNode } from 'react'
import flattenNodes from 'react-keyed-flatten-children'

import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Pagination])

interface Props {
  options?: object
  children: ReactNode
}

const DEFAULTS = {
  pagination: {
    clickable: true,
    bulletClass:
      'w-2 h-2 rounded bg-gray-300 inline-block cursor-pointer ml-2',
    bulletActiveClass: 'bg-indigo-600',
  },
}

export default function Slider({ options, children }: Props) {
  const props = { ...DEFAULTS, ...options }
  return (
    <Swiper {...props}>
      {Children.map(flattenNodes(children), (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}
