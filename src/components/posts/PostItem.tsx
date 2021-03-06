import React, { Suspense, lazy, useState } from 'react'
import { FaComment } from 'react-icons/fa'

import { UserTypes } from '~/hooks/userProvider'
import timeSince from '~/utils/timeSince'

import Button from '~/components/utils/Button'
import Loader from '~/components/utils/Loader'
import LikeButton from '~/components/posts/LikeButton'
import Comments from '~/components/posts/Comments'
import UserAvatar from '~/components/user/UserAvatar'

const Slider = lazy(async () => {
  const component = await import('~/components/utils/Slider')
  return component
})

export interface PostTypes {
  id: string
  userName: string
  userImage: string
  createdOn: number
  content: string
  likes: number
  comments: number
  images: string[]
}

export default function PostItem({
  id,
  userName,
  userImage,
  createdOn,
  content,
  likes,
  comments,
  images = [],
}: PostTypes) {
  const [isCommentOpen, setIsCommentOpen] = useState(false)

  return (
    <div className="bg-white w-full border rounded-lg overflow-hidden">
      <div className="px-6 py-6  border-b">
        <p
          className={`text-2xl font-bold ${images.length && 'mb-6'}`}
        >
          {content}
        </p>
        {images.length === 1 && <img src={images[0]} />}
        {images.length > 1 && (
          <Suspense fallback={<Loader />}>
            <Slider>
              {images.map((image) => (
                <img src={image} alt="" key={image} />
              ))}
            </Slider>
          </Suspense>
        )}
      </div>
      <div className="flex items-center mt-2 justify-between px-6 pt-3 pb-5">
        <div className="flex items-center">
          <a href="#" className="block relative">
            <UserAvatar
              user={{ name: userName, image: userImage } as UserTypes}
            />
          </a>
          <div className="flex flex-col ml-2 justify-between">
            <span className="font-semibold text-indigo-500 text-sm">
              {userName}
            </span>
            <span className="text-xs text-gray-500">
              {timeSince(createdOn)} ago
            </span>
          </div>
        </div>
        <ul className="flex items-center">
          <li>
            <LikeButton count={likes} postId={id} />
          </li>
          <li className="ml-2">
            <Button
              color="light-gray"
              label={`${comments}`}
              onClick={() => setIsCommentOpen(!isCommentOpen)}
              small={true}
            >
              <FaComment />
            </Button>
          </li>
        </ul>
      </div>
      {isCommentOpen && (
        <div className="bg-gray-100 px-6 pt-6 pb-6">
          <Comments count={comments} postId={id} />
        </div>
      )}
    </div>
  )
}
