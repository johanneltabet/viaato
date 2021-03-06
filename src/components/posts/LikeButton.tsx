import React, { useEffect, useState } from 'react'
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri'

import { auth, likesCollection, postsCollection } from '~/firebase'

import Button from '~/components/utils/Button'

interface Props {
  count: number
  postId: string
}

export default function LikeButton({ count, postId }: Props) {
  const [hasLiked, setHasLiked] = useState(false)
  const { currentUser } = auth as { currentUser: { uid: string } }
  const docId = `${currentUser.uid}_${postId}`

  const getLikeStatus = async () => {
    const doc = await likesCollection.doc(docId).get()
    if (doc.exists) setHasLiked(true)
  }

  useEffect(() => {
    getLikeStatus()
  }, [hasLiked])

  const unlikePost = async () => {
    await likesCollection.doc(docId).delete()
    postsCollection.doc(postId).update({
      likes: count - 1,
    })
    setHasLiked(false)
  }

  const likePost = async () => {
    await likesCollection.doc(docId).set({
      postId,
      userId: currentUser.uid,
    })
    postsCollection.doc(postId).update({
      likes: count + 1,
    })
    setHasLiked(true)
  }

  return (
    <Button
      color="light-gray"
      label={`${count}`}
      onClick={!hasLiked ? likePost : unlikePost}
      small={true}
      style={{ minWidth: '50px' }}
    >
      {!hasLiked ? (
        <RiHeart3Line />
      ) : (
        <RiHeart3Fill color="#F44336" />
      )}
    </Button>
  )
}
