import { type ChangeEventHandler, useState } from 'react'

const useFiles = () => {
  const [files, setFiles] = useState<number | string | null>(null)

  const changeFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target

    if (!input.files || input.files.length === 0) {
      setFiles(null)
      return
    }

    if (input.files.length === 1) {
      setFiles(input.files[0].name)
      return
    }

    setFiles(input.files.length)
  }

  return [files, changeFiles] as const
}

export default useFiles
