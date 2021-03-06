import React, { useEffect, useState } from 'react'

import { postsCollection } from '~/firebase'

import InfiniteList from '~/components/utils/InfiniteList'
import PostItem, { PostTypes } from '~/components/posts/PostItem'

export interface Snapshot {
  id: string
}

export default function PostList() {
  const [posts, setPosts] = useState<Snapshot[]>([])

  useEffect(() => {
    postsCollection
      .orderBy('createdOn', 'desc')
      .onSnapshot((snapshot) => {
        const posts: Snapshot[] = []
        snapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id })
        })
        setPosts(posts)
      })
  }, [])

  return (
    <InfiniteList>
      {posts.map((item) => (
        <div className="mb-6" key={item.id}>
          <PostItem {...(item as PostTypes)} />
        </div>
      ))}
    </InfiniteList>
  )
}
