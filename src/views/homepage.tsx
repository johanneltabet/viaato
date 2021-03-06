import React from 'react'

import PostList from '~/components/posts/PostList'

export default function Homepage() {
  return (
    <div className="py-32 px-3 lg:px-8 w-full max-w-prose m-x-auto">
      <PostList />
    </div>
  )
}
