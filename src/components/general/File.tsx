import { FileArrowUpIcon } from '@phosphor-icons/react'
import type { ChangeEventHandler, FunctionComponent } from 'react'

interface Props {
  accept: string
  changeFiles: ChangeEventHandler<HTMLInputElement>
  files: number | string | null
  multiple: boolean
  name: string
}

function fileStatus(files: number | string | null) {
  if (files === null) {
    return 'No files'
  }
  if (typeof files === 'number') {
    return `${files} files`
  }
  return files
}

const File: FunctionComponent<Props> = ({
  name,
  accept,
  multiple,
  files,
  changeFiles
}) => (
  <label
    className='flex items-center justify-evenly rounded-2xl bg-gray-100 p-2 pr-4 pl-4 text-5xl active:bg-gray-100'
    htmlFor={name}
  >
    <input
      accept={accept}
      className='hidden'
      id={name}
      multiple={multiple}
      name={name}
      onChange={changeFiles}
      type='file'
    />
    <FileArrowUpIcon
      className={`icon ${files ? 'uploaded' : 'upload'}`}
      weight='bold'
    />
    <span
      className={`text-gray-${files ? 8 : 6}00 min-w-2/3 text-center text-2xl underline decoration-1 underline-offset-10`}
    >
      {fileStatus(files)}
    </span>
  </label>
)

export default File
