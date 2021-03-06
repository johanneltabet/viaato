import React, { useRef, useContext, FormEvent } from 'react'

import { postsCollection, storage } from '~/firebase'
import useSetState from '~/hooks/useSetState'
import { UserContext } from '~/App'

import { BsImages } from 'react-icons/bs'
import { AiOutlineGif } from 'react-icons/ai'

import Form from '~/components/forms/Form'
import Button from '~/components/utils/Button'
import Loader from '~/components/utils/Loader'
import FileUploader from '~/components/forms/FileUploader'

interface Props {
  onSuccess: () => void
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

interface State {
  isLoading: boolean
  errorMessage: string
  filenames: []
  downloadURLs: []
  isUploading: boolean
}

const FIELDS = [
  {
    id: 'content',
    type: 'textarea',
    required: true,
    label: '',
    placeholder: "What's up?",
    maxLength: 140,
  },
]

export default function CreatePost({ onSuccess }: Props) {
  const [state, setState] = useSetState({
    isLoading: false,
    errorMessage: '',
    filenames: [],
    downloadURLs: [],
    isUploading: false,
  }) as [State, (state: object) => void]

  const user = useContext(UserContext)

  const inputFile = useRef<HTMLInputElement>(null)
  const handleUploadButtonClick = () => {
    if (inputFile && inputFile.current) {
      inputFile.current.click()
    }
  }

  const handleUploadStart = () => {
    setState({ isUploading: true })
  }

  const handleUploadError = (error: { message: string }) => {
    setState({ isUploading: false, errorMessage: error.message })
  }

  const handleUploadSuccess = async (filenames: string[]) => {
    const downloadURLs = []
    for (const filename of filenames) {
      const url = await storage
        .ref('images')
        .child(filename)
        .getDownloadURL()
      downloadURLs.push(url)
    }
    setState({
      filenames,
      downloadURLs,
      isUploading: false,
    })
  }

  const onSubmit = async (
    e: FormEvent,
    model: { content: string },
  ) => {
    setState({ isLoading: true })
    try {
      await postsCollection.add({
        createdOn: new Date().getTime(),
        content: model.content,
        images: state.downloadURLs,
        userId: user.id,
        userName: user.name,
        ...(user.image && { userImage: user.image }),
        comments: 0,
        likes: 0,
      })
      onSuccess()
    } catch ({ message: errorMessage }) {
      setState({ errorMessage })
    }
    setState({ isLoading: false })
  }

  return (
    <>
      <Form
        fields={FIELDS}
        onSubmit={onSubmit as any}
        isLoading={state.isLoading}
        errorMessage={state.errorMessage}
        submitButtonClass="mt-2"
      >
        <ul className="flex items-center justify-end">
          {state.filenames.length > 0 && (
            <li className="text-gray-500 text-small">
              <ul className="flex flex-wrap text-xs">
                {state.downloadURLs.map((url, index) => (
                  <li key={index} className="mr-2">
                    <a
                      className="block mr-2"
                      target="_BLANK"
                      href={url}
                    >
                      <img src={url} alt="" className="w-10 h-10" />
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {state.isUploading && (
            <li className="mr-2">
              <Loader />
            </li>
          )}
          <li>
            <FileUploader
              storageRef={storage.ref('images')}
              multiple={true}
              onUploadStart={handleUploadStart}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError as any}
            >
              <Button
                color="light-gray"
                label=""
                small={true}
                onClick={handleUploadButtonClick}
              >
                <BsImages />
              </Button>
            </FileUploader>
          </li>
          <li className="ml-2">
            <Button color="light-gray" label="" small={true}>
              <AiOutlineGif />
            </Button>
          </li>
        </ul>
      </Form>
    </>
  )
}
