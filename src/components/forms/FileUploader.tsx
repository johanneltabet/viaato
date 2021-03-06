import React, { ReactNode, useEffect, useRef } from 'react'
import { v4 as generateRandomFileName } from 'uuid'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

interface Task {
  snapshot: {
    state: string
    metadata: {
      name: string
    }
  }
  cancel: () => void
}

interface Props {
  storageRef: Object | any
  id?: string
  maxSize?: number
  accept?: string
  disabled?: boolean
  name?: string
  required?: boolean
  value?: string
  multiple?: boolean
  metadata?: object
  children?: ReactNode
  onUploadStart?: (file: Object, task: Object) => void
  onProgress?: (progress: number, task: Object) => void
  onUploadSuccess?: (filenames: string[], task: Object) => void
  onUploadError?: (error: Object, task: Object) => void
}

function extractExtension(filename: string): string {
  let ext = /(?:\.([^.]+))?$/.exec(filename)
  if (ext != null && ext[0] != null) {
    return ext[0]
  } else {
    return ''
  }
}

export default function FileUploader({
  storageRef,
  maxSize = 2e6,
  id,
  accept = 'image/png, image/jpeg',
  disabled,
  name,
  required,
  value,
  multiple,
  metadata,
  children,
  onUploadStart,
  onProgress,
  onUploadSuccess,
  onUploadError,
}: Props) {
  const inputFile = useRef<HTMLInputElement>(null)
  const uploadTasks: Array<Object> = []
  const uploadedFiles: Array<string> = []

  useEffect(() => {
    return () => {
      while (uploadTasks.length > 0) {
        const task = uploadTasks.pop() as Task
        if (task.snapshot.state === 'running') {
          task.cancel()
        }
      }
    }
  }, [])
  const handleClick = () => {
    if (inputFile && inputFile.current) {
      inputFile.current.click()
    }
  }
  const removeTask = (task: Task) => {
    for (let i = 0; i < uploadTasks.length; i++) {
      if (uploadTasks[i] === task) {
        uploadTasks.splice(i, 1)
        uploadedFiles.push(task.snapshot.metadata.name)
        return
      }
    }
  }
  const handleFileSelection = (e: HTMLInputEvent) => {
    const files: any = e.target.files
    for (let i = 0; i < files.length; i++) {
      startUpload(files[i])
    }
  }
  const startUpload = (file: File) => {
    if (file.size > maxSize)
      return alert('One or several file were too big (limit 1mo)')
    let filenameToUse = generateRandomFileName()
    if (!extractExtension(filenameToUse)) {
      filenameToUse += extractExtension(file.name)
    }
    const task = storageRef.child(filenameToUse).put(file, metadata)
    onUploadStart && onUploadStart(file, task)
    task.on(
      'state_changed',
      (snapshot: { bytesTransferred: number; totalBytes: number }) =>
        onProgress &&
        onProgress(
          Math.round(
            (100 * snapshot.bytesTransferred) / snapshot.totalBytes,
          ),
          task,
        ),
      (error: object) => onUploadError && onUploadError(error, task),
      () => {
        removeTask(task)
        return (
          !uploadTasks.length &&
          onUploadSuccess &&
          onUploadSuccess(uploadedFiles, task)
        )
      },
    )
    uploadTasks.push(task)
  }

  return (
    <>
      <input
        type="file"
        ref={inputFile}
        className={`${children && 'hidden'}`}
        id={id}
        name={name}
        required={required}
        value={value}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        onChange={handleFileSelection as any}
      />
      {children && <div onClick={handleClick}>{children}</div>}
    </>
  )
}
