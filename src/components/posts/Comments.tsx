import React, {
  useEffect,
  useContext,
  useState,
  FormEvent,
} from 'react'

import { postsCollection, commentsCollection } from '~/firebase'

import { UserContext } from '~/App'

import Form from '~/components/forms/Form'

interface Props {
  postId: string
  count: number
}

interface Comment {
  id: string
  userName: string
  userId: string
  content: string
  postId: string
  createdOn: string
}

const FIELD = {
  id: 'comment',
  required: true,
  label: '',
  type: 'text',
  placeholder: 'Your comment',
  maxLength: 140,
}

export default function Comments({ postId, count }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const user = useContext(UserContext)

  const getComments = async () => {
    const comments: Comment[] = []
    setIsLoading(true)
    const raw = await commentsCollection
      .where('postId', '==', postId)
      .get()
    raw.forEach((comment: { id: string; data: () => any }) => {
      const data = comment.data()
      comments.push({ ...data, id: comment.id })
    })
    setComments(comments)
    setIsLoading(false)
  }

  const onSubmit = async (
    e: FormEvent,
    model: { comment: 'string' },
  ) => {
    setIsLoading(true)
    try {
      await commentsCollection.add({
        createdOn: new Date(),
        content: model.comment,
        postId: postId,
        userId: user.id,
        userName: user.name,
      })
      await postsCollection.doc(postId).update({
        comments: count + 1,
      })
      await getComments()
    } catch (err) {
      throw new Error(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
      <Form
        fields={[FIELD]}
        isLoading={isLoading}
        onSubmit={onSubmit as any}
        inline={true}
      />
      {!!comments.length && (
        <ul className="mt-4">
          {comments.map((comment, index) => (
            <li
              key={comment.id}
              className={`${index < comments.length - 1 && 'mb-2'}`}
            >
              <p className="text-xs text-indigo-400">
                {comment.userName}
              </p>
              <p className="text-xs text-gray-800">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
